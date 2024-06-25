import React, { useState, useEffect } from "react";
import axios from "axios";

function BoardDetailModal({ studyBoardPk, onClose }) {
    const [BoardDetails, setBoardDetails] = useState(null);

    useEffect(() => {
        if (studyBoardPk) {
            const fetchBoardDetails = async () => {
                try {
                    const response = await axios.get(`/board/${studyBoardPk}`);
                    setBoardDetails(response.data); // 직접 데이터를 설정
                } catch (error) {
                    console.error('요청 처리 중 오류가 발생했습니다.', error);
                    setBoardDetails(null);
                }
            };
            fetchBoardDetails();
        } else {
            console.log("studyBoardPk가 존재하지 않습니다.");
        }
    }, [studyBoardPk]);
    if (!BoardDetails) return null; // 스터디 세부 정보가 없을 경우 아무것도 렌더링하지 않음

  return (
    <div className="modal-content">
    <h1>{BoardDetails.adTitle}</h1>
    <p>{BoardDetails.adContent}</p>
    <p>기간: {BoardDetails.studyStartDate} - {BoardDetails.BoardEndDate}</p>
    <p>참가 인원: {BoardDetails.BoardPersonNum} / 6</p>
</div>
  );
}

export default BoardDetailModal;
