import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyStudy.css";

function ApplicantListModal({ isOpen, onClose, studyPk }) {
    const [applicants, setApplicants] = useState([]);
  
    useEffect(() => {
      if (isOpen) {
        const fetchApplicants = async () => {
            try {
                const response = await axios.get(`/study/apply/${studyPk}`);
                const data = response.data;
              
                if (Array.isArray(data.enterStudyList)) {
                  setApplicants(data.enterStudyList);
                } else {
                  console.error("응답 데이터가 배열이 아닙니다:", data);
                  setApplicants([]);
                }
              } catch (error) {
                console.error('지원자 정보를 불러오는 데 실패했습니다', error);
                setApplicants([]);
              }
              
        };
  
        fetchApplicants();
      }
    }, [isOpen, studyPk]);
  
    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close-button" onClick={onClose}>&times;</span>
          <h2>지원자 목록</h2>
          {applicants.length === 0 ? (
          <p>지원 요청이 없습니다.</p>
        ) : (
            <ul>
              {applicants.map(applicant => (
                <li key={applicant.userId}>{applicant.nickname}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
  
  export default ApplicantListModal;