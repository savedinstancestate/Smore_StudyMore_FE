import React from 'react';
import './GoalList.css';
import AddGoalModal from './AddGoalModal';

const GoalList = () => {
    const goals = [
        {
            id: 1,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 2,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 3,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 4,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 5,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 6,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 7,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 8,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 9,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 10,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 11,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
        {
            id: 12,
            avatar: '/path/to/avatar1.png',
            name: '이수지',
            content: '이번주까지 끝낼 수 있을까? 진짜?',
            status: '진행 전',
        },
    ];

    return (
        <div className="goal-list">
            <div className="goal-list-header">
                <div className="goal-list-title">개인 목표 💪🏻</div>
                <AddGoalModal />
            </div>
            <div className="goal-list-container">
                {goals.map((goal) => (
                    <div key={goal.id} className="goal">
                        <div className="goal-info">
                            <img src={goal.avatar} alt={`${goal.name}의 사진`} className="goal-avatar" />
                            <div className="goal-name">{goal.name}</div>
                            <div className="goal-content">{goal.content}</div>
                        </div>
                        <div className="goal-status">{goal.status}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GoalList;
