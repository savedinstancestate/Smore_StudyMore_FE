import React, { useState, useEffect } from 'react';
import API from '../../../api/AxiosInstance';
import Modal from '../../../components/Modal';
import './Management.css';

const EditMember = ({ studyPk }) => {
    const [members, setMembers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMemberPk, setSelectedMemberPk] = useState(null);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/management/members`);
                setMembers(response.data);
            } catch (error) {
                console.error('멤버 정보를 불러오는데 실패했습니다.', error);
                setError('멤버 정보를 불러오는데 실패했습니다.');
            }
        };

        fetchMembers();
    }, [studyPk]);

    const handleExpelClick = (memberPk) => {
        setSelectedMemberPk(memberPk);
        setIsModalOpen(true);
    };

    const expelMember = async () => {
        try {
            const response = await API.delete(`/study/${studyPk}/management/expel`, {
                data: { memberPk: selectedMemberPk },
            });

            if (response.status === 204) {
                setMembers(members.filter((member) => member.memberPk !== selectedMemberPk));
                setSuccessMessage('멤버 퇴출이 성공적으로 처리되었습니다.');
                setIsModalOpen(false);
            } else {
                console.error('상태 코드 에러:', error);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('멤버 퇴출에 실패했습니다.', error);
            setError('멤버 퇴출에 실패했습니다.');
            setIsModalOpen(false);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setError(null); // 모달 닫을 때 에러 메시지 초기화
        setSuccessMessage(''); // 성공 메시지도 초기화
    };

    return (
        <div className="container">
            <div className="list-container">
                <div className="title">멤버 관리 👫</div>
                {error && <div className="alert alert-danger">{error}</div>}
                {successMessage && <div className="alert alert-primary">{successMessage}</div>}
                <ul>
                    {members.map((member) => (
                        <li key={member.memberPk} className="member-item">
                            <img
                                className="member-img"
                                src={member.imageURL || 'img/default-profile.png'}
                                alt={`${member.imageURL}의 사진`} />
                            <div className="member-info-manage">
                                <p className="member-nickname">{member.nickname}</p>
                            </div>
                            <button className="member-delete-btn" onClick={() => handleExpelClick(member.memberPk)}>
                                퇴출
                            </button>
                        </li>
                    ))}
                </ul>

                <Modal show={isModalOpen} handleClose={closeModal} title="멤버 퇴출">
                    <div>
                        <p className="edit-member-modal">정말로 멤버를 퇴출하시겠습니까?</p>
                        <div className="modal-buttons">
                            <button onClick={expelMember} className="member-expel-btn-confirm">
                                확인
                            </button>
                            <button onClick={closeModal} className="member-expel-btn-cancel">
                                취소
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default EditMember;
