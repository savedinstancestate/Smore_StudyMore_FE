import React, { useState, useEffect } from "react";
import API from "../../api/AxiosInstance";
import "../../styles/StudyCard.css";

function ApplicantList({ studyPk }) {
  const [applicants, setApplicants] = useState([]);

  useEffect(() => {
    if (studyPk) {
      const fetchApplicants = async () => {
        try {
          const response = await API.get(`/mystudy/apply/${studyPk}`);
          const data = response.data;
          console.log("API response:", data);

          if (Array.isArray(data.enterStudyList)) {
            setApplicants(data.enterStudyList);
          } else {
            console.error("응답 데이터가 배열이 아닙니다:", data);
            setApplicants([]);
          }
        } catch (error) {
          console.error("지원자 정보를 불러오는 데 실패했습니다", error);
          setApplicants([]);
        }
      };

      fetchApplicants();
      const intervalId = setInterval(fetchApplicants, 5000); // 5초마다 서버에 데이터 요청
      return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 제거

    } else {
      console.log("studyPk가 존재하지 않습니다.");
    }
  }, [studyPk]);

  // 지원자 수락 처리
  const handleAccept = async (userId) => {
    try {
      const response = await API.post(`/mystudy/apply`, { userId, studyPk });
      if (response.status === 201) {
        console.log("Accept response:", response.data.message);
        // 수락된 지원자를 목록에서 제거
        setApplicants((prevApplicants) =>
          prevApplicants.filter((applicant) => applicant.userId !== userId)
        );
      } else {
        console.error("예상치 못한 응답 코드:", response.status);
      }
    } catch (error) {
      console.error("수락 처리 중 에러 발생:", error);
      alert("수락 처리에 실패하였습니다.");
    }
  };

  // 지원자 거절 처리
  const handleRefuse = async (userId) => {
    try {
      const response = await API.post(`/mystudy/refuse`, { userId, studyPk });
      if (response.status === 200) {
        console.log("Refuse response:", response.data.message);
        /// 거절된 지원자를 목록에서 제거
        setApplicants((prevApplicants) =>
          prevApplicants.filter((applicant) => applicant.userId !== userId)
        );
      } else {
        console.error("예상치 못한 응답 코드:", response.status);
      }
    } catch (error) {
      console.error("거절 처리 중 에러 발생:", error);
      alert("거절 처리에 실패하였습니다.");
    }
  };

  return (
    <div>
      <div className="list-container">
        {applicants.length === 0 ? (
          <p className="no-data-mystudy">지원 요청이 없습니다.</p>
        ) : (
          <ul>
            {applicants.map((applicant) => (
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
                  <button
                    className="applicant-apply-btn"
                    onClick={() => handleAccept(applicant.userId)}
                  >
                    수락
                  </button>
                  <button
                    className="applicant-refuse-btn"
                    onClick={() => handleRefuse(applicant.userId)}
                  >
                    거절
                  </button>
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
