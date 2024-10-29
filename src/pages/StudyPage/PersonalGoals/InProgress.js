import React, { useState, useEffect } from 'react';
import API from '../../../api/AxiosInstance';
import './Goals.css';

const InProgress = ({ studyPk }) => {
    const [goals, setGoals] = useState([]);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/todo/status`, {
                    params: { status: '진행 중' },
                });
                setGoals(response.data);
            } catch (error) {
                console.error('목표 리스트를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchGoals();
    }, [studyPk]);

    return (
        <div className="personal-goals">
            <div className="goal-header">진행 중 ✈️</div>
            <div className="goal-container">
                {goals.map((goal) => (
                    <div key={goal.personalTodoPk} className="goal">
                        <img
                            src={goal.profileImg || '/path/to/default_avatar.png'}
                            alt={`${goal.nickName}의 사진`}
                            className="goal-avatar"
                        />
                        <div className="goal-name">{goal.nickName}</div>
                        <div className="goal-content">{goal.scheduleContent}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InProgress;
