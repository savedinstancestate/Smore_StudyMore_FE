import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyStudy.css';

function MyStudy() {
    const [studyList, setStudyList] = useState([]);

    useEffect(() => {
        const fetchStudyData = async () => {
            try {
                const response = await axios.get('/study'); 
                setStudyList(response.data); // 응답 데이터로 상태 업데이트
            } catch (error) {
                console.error('스터디 목록을 불러오는 데에 실패했습니다.', error);
            }
        };
        fetchStudyData();
    }, []);

    return (
        <div className="card-container">
            {studyList.map((card, index) => ( // 여기 무슨 값을 넣어 줘야 하지
                <div className="card-div" key={index}>
                    <div className="card-header" style={{ backgroundImage: `url(${card.imageUrl})` }}></div>
                    <div className="card-body">
                        <p className="study-name">{card.name}</p>
                        <p className="card-title">스터디 기간</p>
                        <p className="card-text">{card.dateRange}</p>
                        <p className="card-title">참가 인원</p>
                        <p className="card-text">{card.progress}</p>
                        <button className="study-entry-btn">입장하기</button>
                        <button className="study-leave-btn">탈퇴하기</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MyStudy;