import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MyStudy.css";

function ApplicantList({ studyPk }) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    if (studyPk) {
      const fetchApplicants = async () => {
        try {
          const response = await axios.get(`/study/apply/${studyPk}`);
          const data = response.data;
          console.log('API response:', data);

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
    } else {
      console.log('studyPk가 존재하지 않습니다.');
    }
  }, [studyPk]);

  return (
    <div>
      <div className="list-container">
        {applicants.length === 0 ? (
          <p>지원 요청이 없습니다.</p>
        ) : (
          <ul>
            {applicants.map(applicant => (
              <li key={applicant.userId} className="applicant-item">
                <div
                  className="applicant-img"
                  alt={applicant.profileURL}
                  style={{ backgroundImage: `url(${applicant.profileURL})` }}
                ></div>
                <div className="applicant-info">
                  <p className="applicant-nickname">{applicant.nickname}</p>
                  <p className="applicant-content">{applicant.content}</p>
                </div>
                <div className="applicant-actions">
                  <button className="applicant-apply-btn">수락</button>
                  <button className="applicant-refuse-btn">거절</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default ApplicantList;
