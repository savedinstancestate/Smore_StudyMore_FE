import React from 'react';
import './StudyRanking.css';

const StudyRanking = () => {
    const studyRankings = [
        { name: '서다영', hours: '21:04:02' },
        { name: '서다영', hours: '18:30:15' },
        { name: '서다영', hours: '15:20:40' },
        { name: '서다0', hours: '14:50:25' },
    ];

    const renderMedal = (index) => {
        switch (index) {
            case 0:
                return '🥇';
            case 1:
                return '🥈';
            case 2:
                return '🥉';
            default:
                return '4️⃣'; // 시작이 0이므로 출력 시 1을 더함
        }
    };

    return (
        <div className="study-ranking">
            <div className="ranking-header">스터디 공부왕👑</div>
            <ul>
                {studyRankings.map((rank, index) => (
                    <li key={rank.name + index}>
                        <span className="rank">{renderMedal(index)}</span>
                        <span className="name">{rank.name}</span>
                        <span className="hours">{rank.hours}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudyRanking;
