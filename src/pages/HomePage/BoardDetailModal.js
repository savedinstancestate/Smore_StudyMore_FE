import React, { useState, useEffect } from "react";
import axios from "axios";

function StudyDetailsModal({ studyBoardPk, onClose }) {
    const [studyDetails, setStudyDetails] = useState(null);

    useEffect(() => {
        if (studyBoardPk) {
            const fetchStudyDetails = async () => {
                try {
                    const response = await axios.get(`/board/${studyBoardPk}`);
                    setStudyDetails(response.data); // 직접 데이터를 설정
                } catch (error) {
                    console.error('요청 처리 중 오류가 발생했습니다.', error);
                    setStudyDetails(null);
                }
            };
            fetchStudyDetails();
        } else {
            console.log("studyBoardPk가 존재하지 않습니다.");
        }
    }, [studyBoardPk]);
    if (!studyDetails) return null; // 스터디 세부 정보가 없을 경우 아무것도 렌더링하지 않음

  return (
    <div className="modal-content">
    <h1>{studyDetails.adTitle}</h1>
    <p>{studyDetails.adContent}</p>
    <p>기간: {studyDetails.studyStartDate} - {studyDetails.studyEndDate}</p>
    <p>참가 인원: {studyDetails.studyPersonNum} / 6</p>
</div>
  );
}

export default StudyDetailsModal;
