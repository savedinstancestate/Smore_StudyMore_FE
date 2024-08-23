import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import CreateProblemBankButton from './CreateProblemBankModal';
import EditProblemBankButton from './EditProblemBankModal';
import DeleteProblemBankModal from './DeleteProblemBankModal';
import API from '../../../api/AxiosInstance';
import StudyProblemList from './StudyProblemList';
import './MyProblems.css';

const MyProblems = ({ studyPk }) => {
    const [problemBanks, setProblemBanks] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProblemBankPk, setSelectedProblemBankPk] = useState(null);

    const fetchProblemBanks = async () => {
        try {
            console.log(`Fetching problem banks for studyPk: ${studyPk}`); // 디버깅 로그 추가
            const response = await API.get(`/study/${studyPk}/problem/bank/personal`);
            console.log('Fetched problem banks:', response.data); // 응답 데이터 확인
            setProblemBanks(response.data);
        } catch (error) {
            console.error('문제은행 리스트를 불러오는 데 실패했습니다:', error);
        }
    };

    useEffect(() => {
        fetchProblemBanks();
    }, [studyPk]);

    const handleDeleteConfirmation = (problemBankPk) => {
        setSelectedProblemBankPk(problemBankPk);
        setShowDeleteModal(true);
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/study/${studyPk}/problem/bank/${selectedProblemBankPk}`);
            setProblemBanks(problemBanks.filter((bank) => bank.problemBankPk !== selectedProblemBankPk));
            setShowDeleteModal(false);
            setSelectedProblemBankPk(null);
            fetchProblemBanks(); // 삭제 후 문제은행 목록 갱신
        } catch (error) {
            console.error('문제은행을 삭제하는 데 실패했습니다:', error);
        }
    };

    return (
        <div>
            <div className="problem-list">
                <div className="problem-list-header">
                    <div className="problem-list-title">내가 낸 문제</div>
                    <CreateProblemBankButton studyPk={studyPk} onUpdate={fetchProblemBanks} />
                </div>
                <div className="problem-list-container">
                    {Array.isArray(problemBanks) &&
                        problemBanks.map((bank) => (
                            <div key={bank.problemBankPk} className="problem">
                                <div className="problem-info">
                                    {bank.problemBankName} - 문제 수: {bank.count}
                                </div>
                                <div>
                                    <EditProblemBankButton
                                        sutdyPk={studyPk}
                                        problemBank={bank}
                                        onUpdate={fetchProblemBanks}
                                    />
                                    <Button
                                        variant="link"
                                        onClick={() => handleDeleteConfirmation(bank.problemBankPk)}
                                        style={{ textDecoration: 'none', padding: '0 5px', color: '#919191' }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div>
                            </div>
                        ))}
                </div>
                <DeleteProblemBankModal
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleDelete={handleDelete}
                />
            </div>
            <StudyProblemList studyPk={studyPk} onUpdate={fetchProblemBanks} />
        </div>
    );
};

export default MyProblems;
