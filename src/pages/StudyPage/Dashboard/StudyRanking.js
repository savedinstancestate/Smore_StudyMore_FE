import React, { useState, useEffect } from 'react';
import API from '../../../api/AxiosInstance';
import './StudyRanking.css';

const StudyRanking = ({ studyPk }) => {
    const [studyRankings, setStudyRankings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('StudyRanking received studyPk:', studyPk); // studyPk 값 확인

        const fetchStudyRankings = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/dashboard/ranking`);
                console.log('Fetched Study Rankings:', response.data);

                const data = response.data.filter((item) => item !== null); // null 값 필터링

                // 학습 시간을 시, 분, 초로 변환
                const formattedData = data.map((item) => {
                    const hours = Math.floor(item.learningTime / 3600);
                    const minutes = Math.floor((item.learningTime % 3600) / 60);
                    const seconds = item.learningTime % 60;
                    return {
                        ...item,
                        hours: `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(
                            seconds
                        ).padStart(2, '0')}`,
                    };
                });

                setStudyRankings(formattedData.slice(0, 4)); // 처음 4개의 요소만 남기도록 자릅니다.
                setError(null); // 정상적으로 데이터를 가져온 경우 error 상태 초기화
            } catch (error) {
                console.error('스터디 랭킹 정보를 불러오는 데 실패했습니다:', error);
                setError('스터디 랭킹 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchStudyRankings();
    }, [studyPk]);

    const renderMedal = (index) => {
        switch (index) {
            case 0:
                return '🥇';
            case 1:
                return '🥈';
            case 2:
                return '🥉';
            default:
                return `${index + 1}️⃣`; // 시작이 0이므로 출력 시 1을 더함
        }
    };

    return (
        <div className="study-ranking">
            <div className="ranking-header">스터디 공부왕 👑</div>
            {error && <div>{error}</div>}
            <ul>
                {studyRankings.map((rank, index) => (
                    <li key={rank.memberPk}>
                        <span className="rank">{renderMedal(index)}</span>
                        <span className="name">{rank.fullName}</span>
                        <span className="hours">{rank.hours}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default StudyRanking;
