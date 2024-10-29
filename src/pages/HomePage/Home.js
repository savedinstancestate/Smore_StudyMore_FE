import React, { useState, useEffect } from 'react';
import API from '../../api/AxiosInstance';
import Modal from '../../components/Modal'; 
import BoardDetailModal from './BoardDetailModal';
import "../../styles/StudyCard.css";

function Board() {
  const [recruitingStudies, setRecruitingStudies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudyBoardPk, setCurrentStudyBoardPk] = useState(null);
  const [currentStudyName, setCurrentStudyName] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 9;  

  useEffect(() => {
    fetchRecruitingStudies();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 50) {
loadMoreData();
    }
  };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
  };
}, [currentPage, recruitingStudies.length]); 

  const fetchRecruitingStudies = async () => {
    try {
      const response = await API.get('/board');
      if (response.status === 200) {
        setRecruitingStudies(response.data);
      } else {
        console.error("모집중인 스터디를 불러오는 데에 실패했습니다.: ", response.data);
        setRecruitingStudies([]);
      }
    } catch (error) {
      console.error("모집중인 스터디를 불러오는 데에 실패했습니다.: ", error);
      setRecruitingStudies([]);
    }
  };

  function handleCardClick(studyBoardPk, studyName) {
    setCurrentStudyBoardPk(studyBoardPk);
    setCurrentStudyName(studyName);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const loadMoreData = () => {
    if ((currentPage + 1) * itemsPerPage < recruitingStudies.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const visibleStudies = recruitingStudies.slice(0, (currentPage + 1) * itemsPerPage);

  return (
    <div className="div-container">
      <div className="card-container">
        <p className="card-type">모집중인 스터디 📢</p>
        {visibleStudies.length === 0 ? (
          <p className="no-data">스터디 목록이 없습니다.</p>
        ) : (
          visibleStudies.map(study => (
            <div className="card-div-home" key={study.studyBoardPk} 
            onClick={() => handleCardClick(study.studyBoardPk, study.studyName)}>
              <div
                className="card-header"
                style={{ backgroundImage: `url(${study.imageUri})` }}
              ></div>
              <div className="card-body-home">
                <p className="ad-name">{study.adTitle}</p>
                <div className="study-content-wrapper">
                <p className="study-content">{study.adContent}</p>
                </div>
                <div className="card-footer">
                <p className="card-title" style={{color: '#9b580b'}}>스터디 기간</p>
                <p className="card-text">{study.startDate} - {study.closeDate}</p>
                <p className="card-title" style={{color: '#9b580b'}}>참가 인원</p>
                <p className="card-text">{study.curPeople} / {study.maxPeople}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Modal show={isModalOpen} handleClose={handleCloseModal} title={currentStudyName} >
        {currentStudyBoardPk && <BoardDetailModal studyBoardPk={currentStudyBoardPk} />}
      </Modal>

    </div>
  );
}

export default Board;
