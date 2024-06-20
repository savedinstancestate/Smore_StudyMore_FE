import React from 'react';
import './Goals.css';

const Completed = () => {
    const goals = [
        { id: 1, avatar: '/path/to/avatar1.png', name: '이수지', content: '이번주까지 끝낼 수 있을까? 진짜?' },
        { id: 2, avatar: '/path/to/avatar1.png', name: '이수지', content: '이번주까지 끝낼 수 있을까? 진짜?' },
        { id: 3, avatar: '/path/to/avatar1.png', name: '이수지', content: '이번주까지 끝낼 수 있을까? 진짜?' },
        { id: 4, avatar: '/path/to/avatar1.png', name: '이수지', content: '이번주까지 끝낼 수 있을까? 진짜?' },
        { id: 5, avatar: '/path/to/avatar1.png', name: '이수지', content: '이번주까지 끝낼 수 있을까? 진짜?' },
        { id: 6, avatar: '/path/to/avatar1.png', name: '이수지', content: '이번주까지 끝낼 수 있을까? 진짜?' },
    ];

    return (
        <div className="personal-goals">
            <div className="goal-header">완료 🛬</div>
            <div className="goal-container">
                {goals.map((goal) => (
                    <div key={goal.id} className="goal">
                        <img src={goal.avatar} alt={`${goal.name}의 사진`} className="goal-avatar" />
                        <div className="goal-name">{goal.name}</div>
                        <div className="goal-content">{goal.content}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Completed;
