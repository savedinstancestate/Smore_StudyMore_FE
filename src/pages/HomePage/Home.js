import React, { useState, useEffect } from 'react';
import axios from "axios";
import CreateStudyModal from "./CreateStudyModal";
import "../../styles/StudyCard.css";

function Board() {
  const [recruitingStudies, setRecruitingStudies] = useState([]);

  useEffect(() => {
    fetchRecruitingStudies();
  }, []);

  const fetchRecruitingStudies = async () => {
    try {
      const response = await axios.get('/board');

      if (response.status === 200) {
        const data = response.data;

        if (Array.isArray(data.boardList)) {
          console.log('스터디 목록 로드 성공:', data.boardList);
          setRecruitingStudies(data.boardList);
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", data);
          setRecruitingStudies([]);
        }
      } else {
        console.error('예상치 못한 응답 코드:', response.status);
        setRecruitingStudies([]);
      }
    } catch (error) {
      console.error("참여하는 스터디 목록을 불러오는 데에 실패했습니다.", error);
      setRecruitingStudies([]);
    }
  };


  return (
    <div className="div-modal">
    <CreateStudyModal className="create-study-button" />
    <div className="div-container">
      <div className="card-container">
        <p className="card-type">모집중인 스터디 📢</p>
        {recruitingStudies.length === 0 ? (
          <p>스터디 목록이 없습니다.</p>
        ) : (
          recruitingStudies.map(study => (
            <div className="card-div" key={study.studyPk}>
              <div
                className="card-header"
                alt={study.studyName}
                style={{ backgroundImage: `url(${study.studyImg})` }}
              ></div>
              <div className="card-body-home">
                <p className="study-name">{study.studyName}</p>
                <p className="study-content">{study.studycontent}</p>
                <p className="card-title">스터디 기간</p>
                <p className="card-text">{study.studyStartDate} - {study.studyEndDate}</p>
                <p className="card-title">참가 인원</p>
                <p className="card-text">{study.studyPersonNum} / 6</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Board;
