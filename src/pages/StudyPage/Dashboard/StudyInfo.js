import React, { useState, useEffect } from 'react';
import API from '../../../api/AxiosInstance';
import './StudyInfo.css';

const StudyInfo = ({ studyPk }) => {
    const [studyData, setStudyData] = useState(null);
    const [members, setMembers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchStudyData = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/dashboard`);
                console.log('Fetched Study Data:', response.data);

                const data = response.data;
                setStudyData(data);
                setError(null); // 정상적으로 데이터를 가져온 경우 error 상태 초기화
            } catch (error) {
                console.error('스터디 정보를 불러오는 데 실패했습니다:', error);
                setError('스터디 정보를 불러오는 데 실패했습니다.');
            }
        };

        const fetchMembersData = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/dashboard/members`);
                console.log('Fetched Members Data:', response.data);

                const data = response.data;
                if (Array.isArray(data)) {
                    setMembers(data);
                    setError(null); // 정상적으로 데이터를 가져온 경우 error 상태 초기화
                } else {
                    console.error('멤버 데이터가 배열이 아닙니다:', data);
                    setMembers([]);
                }
            } catch (error) {
                console.error('스터디 멤버 정보를 불러오는 데 실패했습니다:', error);
                setError('스터디 멤버 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchStudyData();
        fetchMembersData();
    }, [studyPk]);

    if (error) {
        return <div>{error}</div>;
    }

    if (!studyData) {
        return <div>Loading...</div>;
    }

    console.log('Rendering StudyInfo with:', studyData);
    console.log('Rendering Members with:', members);

    return (
        <div className="study-info">
            <div className="info-header">우리 스터디는요 ✏️</div>
            <div className="members-header">멤버</div>
            <div className="members-container">
                {Array.isArray(members) && members.length > 0 ? (
                    members.map((member) => (
                        <div key={member.memberPk} className="member">
                            <img
                                src={member.profileImg || '/img/default-profile.png'}
                                alt={`${member.nickName}의 사진`}
                                className="member-avatar"
                            />
                            <div className="member-info">
                                <div className="member-name">{member.nickName}</div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>멤버가 없습니다.</div>
                )}
            </div>
            <div className="study-description-header">소개</div>
            <p className="study-description">{studyData.content}</p>
            <div className="study-dates-header">일정</div>
            <div className="study-dates">
                {studyData.startDate} ~ {studyData.closeDate}
            </div>
        </div>
    );
};

export default StudyInfo;
