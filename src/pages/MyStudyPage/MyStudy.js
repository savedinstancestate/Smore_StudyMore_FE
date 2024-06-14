// MyStudy.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from '../../components/Modal'; 
import ApplicantList from "./ApplicantList";
import "./MyStudy.css";

function MyStudy() {
  const [participatingStudies, setParticipatingStudies] = useState([]);
  const [administeredStudies, setAdministeredStudies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudyPk, setCurrentStudyPk] = useState(null);

  useEffect(() => {
    const fetchParticipatingStudies = async () => {
      try {
        const response = await axios.get("/study");
        const data = response.data;

        if (Array.isArray(data.studyList)) {
          setParticipatingStudies(data.studyList);
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", data);
          setParticipatingStudies([]);
        }
      } catch (error) {
        console.error("참여하는 스터디 목록을 불러오는 데에 실패했습니다.", error);
      }
    };

    const fetchAdministeredStudies = async () => {
      try {
        const response = await axios.get("/study/admin");
        const data = response.data;

        if (Array.isArray(data.studyList)) {
          setAdministeredStudies(data.studyList);
        } else {
          console.error("응답 데이터가 배열이 아닙니다:", data);
          setAdministeredStudies([]);
        }
      } catch (error) {
        console.error("운영중인 스터디 목록을 불러오는 데에 실패했습니다.", error);
      }
    };

    fetchParticipatingStudies();
    fetchAdministeredStudies();
  }, []);

  function handleViewApplicants(studyPk) {
    setCurrentStudyPk(studyPk);
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setCurrentStudyPk(null);
  }

  return (
    <div>
      <div className="card-container">
        <p className="card-type">참여하는 스터디 🔥</p>
        {participatingStudies.length === 0 ? (
          <p>스터디 목록이 없습니다.</p>
        ) : (
          participatingStudies.map(study => (
            <div className="card-div" key={study.studyPk}>
              <div
                className="card-header"
                alt={study.studyName}
                style={{ backgroundImage: `url(${study.studyImg})` }}
              ></div>
              <div className="card-body">
                <p className="study-name">{study.studyName}</p>
                <p className="card-title">스터디 기간</p>
                <p className="card-text">
                  {study.studyStartDate} - {study.studyEndDate}
                </p>
                <p className="card-title">참가 인원</p>
                <p className="card-text">{study.studyPersonNum} / 6</p>
                <button className="study-entry-btn">입장하기</button>
                <button className="study-leave-btn">탈퇴하기</button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="card-container">
        <p className="card-type">운영중인 스터디 ✏️</p>
        {administeredStudies.length === 0 ? (
          <p>스터디 목록이 없습니다.</p>
        ) : (
          administeredStudies.map(study => (
            <div className="card-div" key={study.studyPk}>
              <div
                className="card-header"
                alt={study.studyName}
                style={{ backgroundImage: `url(${study.studyImg})` }}
              ></div>
              <div className="card-body">
                <p className="study-name">{study.studyName}</p>
                <p className="card-title">스터디 기간</p>
                <p className="card-text">
                  {study.studyStartDate} - {study.studyEndDate}
                </p>
                <p className="card-title">참가 인원</p>
                <p className="card-text">{study.studyPersonNum} / 6</p>
                <button className="study-entry-btn">입장하기</button>
                <button
                  className="study-request-btn"
                  onClick={() => handleViewApplicants(study.studyPk)}
                >
                  지원요청 확인
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <Modal show={isModalOpen} handleClose={handleCloseModal} title="지원요청 목록">
        {currentStudyPk && <ApplicantList studyPk={currentStudyPk} />}
      </Modal>
    </div>
  );
}

export default MyStudy;
