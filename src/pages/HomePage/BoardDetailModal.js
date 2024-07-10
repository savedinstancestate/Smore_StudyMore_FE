import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import API from '../../api/AxiosInstance';
import "../../styles/StudyCard.css";
import ApplyStudyModal from "./ApplyStudyModal";
import { useAuth } from '../../components/AuthContext';
import Modal from '../../components/Modal';
import Login from '../../pages/LoginPage/LoginModal';

function BoardDetailModal({ studyBoardPk }) {
  const { isLoggedIn } = useAuth();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [BoardDetails, setBoardDetails] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); 

  useEffect(() => {
    if (studyBoardPk) {
      const fetchBoardDetails = async () => {
        try {
          const response = await API.get(`/board/${studyBoardPk}`);
          setBoardDetails(response.data); 
        } catch (error) {
          console.error("요청 처리 중 오류가 발생했습니다.", error);
          setBoardDetails(null);
        }
      };
      fetchBoardDetails();
    } else {
      console.log("studyBoardPk가 존재하지 않습니다.");
    }
  }, [studyBoardPk]);

  if (!BoardDetails) return null;

  const toggleOverlay = (show) => {
    setShowOverlay(show);
  };

  const handleApplyClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalOpen(true);
    } else {
      toggleOverlay(true);
    }
  };

  return (
    <div className="modal-container">
      {showOverlay && <div className="overlay"></div>}
      <div className="card-div-detail" style={{ position: 'relative', zIndex: showOverlay ? 1040 : 1 }}>
        <div
          className="card-header-detail"
          alt={BoardDetails.studyName}
          style={{ backgroundImage: `url(${BoardDetails.imageUri})` }}
        ></div>

        <p className="ad-title">{BoardDetails.adTitle}</p>
        <p className="modify-date-detail">{BoardDetails.modifyDate}</p>

        <div className="flex-box">
          <div className="flex-row">
            <p className="card-title-detail">스터디 기간</p>
            <p className="study-detail">{BoardDetails.startDate} - {BoardDetails.closeDate}</p>
          </div>
          <div className="flex-row">
            <p className="card-title-detail">참가 인원</p>
            <p className="study-detail">{BoardDetails.curPeople} / {BoardDetails.maxPeople}</p>
          </div>
        </div>
        <div className="content-wrapper-detail">
          <p>{BoardDetails.adContent}</p>
        </div>
        {/* {isLoggedIn ? ( */}
          <div className="modal-container">
            <ApplyStudyModal toggleOverlay={toggleOverlay} studyName={BoardDetails.studyName} studyPk={BoardDetails.studyPk} />
          </div>
        {/*) : (*/}
          <div onClick={handleApplyClick} className="modal-container">
            <button className="apply-study-button">스터디 지원하기</button>
          </div>
        {/*)}*/}
      </div>
      <Modal show={isLoginModalOpen} handleClose={() => setIsLoginModalOpen(false)} title="로그인">
        <Login />
      </Modal>
    </div>
  );
}

export default BoardDetailModal;
