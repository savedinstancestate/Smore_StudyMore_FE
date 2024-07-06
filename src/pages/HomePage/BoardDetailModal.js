import React, { useState, useEffect } from "react";
import API from '../../api/AxiosInstance';
import "../../styles/StudyCard.css";
import ApplyStudyModal from "./ApplyStudyModal";

function BoardDetailModal({ studyBoardPk, onClose }) {
  const [BoardDetails, setBoardDetails] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false); // 오버레이 표시 상태

  useEffect(() => {
    if (studyBoardPk) {
      const fetchBoardDetails = async () => {
        try {
          const response = await API.get(`/board/${studyBoardPk}`);
          setBoardDetails(response.data); // 직접 데이터를 설정
          console.log(response.data.studyPk);
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
  if (!BoardDetails) return null; // 스터디 세부 정보가 없을 경우 아무것도 렌더링하지 않음

  const toggleOverlay = (show) => {
    setShowOverlay(show);
};

  return (
    <div className="modal-container">
            {showOverlay && <div className="overlay"></div>}
      <div className="card-div-detail" style={{ position: 'relative', zIndex: showOverlay ? 1040 : 1 }}>
        <div
          className="card-header-detail"
          alt={BoardDetails.studyName}
          style={{ backgroundImage: `url(${BoardDetails.studyImg})` }}
        ></div>

        <p className="ad-title">{BoardDetails.adTitle}</p>
        <p className="modify-date-detail">{BoardDetails.modifyDate}</p>

        <div className="flex-box">
        <div className="flex-row">
        <p className="card-title-detail">스터디 기간</p>
        <p className="study-detail">{BoardDetails.studyStartDate} - {BoardDetails.studyEndDate}</p>
        </div>
        <div className="flex-row">
        <p className="card-title-detail">참가 인원</p>
        <p className="study-detail">{BoardDetails.studyPersonNum} / 6</p>
        </div>
        </div>
        <div className="content-wrapper-detail">
          <p>{BoardDetails.adContent}</p>
        </div>
        <div className="modal-container"></div>
        <ApplyStudyModal toggleOverlay={toggleOverlay} studyName={BoardDetails.studyName} studyPk={BoardDetails.studyPk} />
    </div>
    </div>
  );
}

export default BoardDetailModal;
