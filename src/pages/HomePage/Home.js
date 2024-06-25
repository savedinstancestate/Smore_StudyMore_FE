import React, { useState, useEffect } from 'react';
import axios from "axios";
import Modal from '../../components/Modal'; 
import BoardDetailModal from './BoardDetailModal';
import "../../styles/StudyCard.css";

function Board() {
  const [recruitingStudies, setRecruitingStudies] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStudy, setSelectedStudy] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudyBoardPk, setCurrentStudyBoardPk] = useState(null);

  useEffect(() => {
    fetchRecruitingStudies();
  }, []);

  const fetchRecruitingStudies = async () => {
    try {
      const response = await axios.get('/board');
      if (response.status === 200 && Array.isArray(response.data.boardList)) {
        setRecruitingStudies(response.data.boardList);
      } else {
        console.error("응답 데이터가 배열이 아닙니다:", response.data);
        setRecruitingStudies([]);
      }
    } catch (error) {
      console.error("참여하는 스터디 목록을 불러오는 데에 실패했습니다.", error);
      setRecruitingStudies([]);
    }
  };

  function handleCardClick(studyBoardPk) {
    setCurrentStudyBoardPk(studyBoardPk);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="div-container">
      <div className="card-container">
        <p className="card-type">모집중인 스터디 📢</p>
        {recruitingStudies.length === 0 ? (
          <p>스터디 목록이 없습니다.</p>
        ) : (
          recruitingStudies.map(study => (
            <div className="card-div" key={study.studyBoardPk} 
            onClick={() => handleCardClick(study.studyBoardPk)}>
              <div
                className="card-header"
                alt={study.studyName}
                style={{ backgroundImage: `url(${study.studyImg})` }}
              ></div>
              <div className="card-body-home">
                <p className="study-name">{study.adTitle}</p>
                <div className="study-content-wrapper">
                <p className="study-content">{study.adContent}</p>
                </div>
                <p className="card-title">스터디 기간</p>
                <p className="card-text">{study.studyStartDate} - {study.studyEndDate}</p>
                <p className="card-title">참가 인원</p>
                <p className="card-text">{study.studyPersonNum} / 6</p>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal show={isModalOpen} handleClose={handleCloseModal} title="모집중인 스터디">
        {currentStudyBoardPk && <BoardDetailModal studyBoardPk={currentStudyBoardPk} />}
      </Modal>

    </div>
  );
}

export default Board;
