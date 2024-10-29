import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import API from '../../api/AxiosInstance';
import Modal from '../../components/Modal'; 
import ApplicantList from "./ApplicantListModal";
import "../../styles/StudyCard.css";

function MyStudy() {
  const [participatingStudies, setParticipatingStudies] = useState([]);
  const [administeredStudies, setAdministeredStudies] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudyPk, setCurrentStudyPk] = useState(null);
  const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
  const [studyToLeave, setStudyToLeave] = useState(null);
  const [userInput, setUserInput] = useState('');
  const navigate = useNavigate();

    // 참여하는 스터디 조회
    const fetchParticipatingStudies = async () => {
      try {
        const response = await API.get('/mystudy');
        
        if (response.status === 200) {
          const data = response.data;

          if (Array.isArray(data.studyList)) {
            console.log('스터디 목록 로드 성공:', data.studyList);
            setParticipatingStudies(data.studyList);
          } else {
            console.error("응답 데이터가 배열이 아닙니다:", data);
            setParticipatingStudies([]);
          }
        } else {
          console.error('예상치 못한 응답 코드:', response.status);
          setParticipatingStudies([]);
        }
      } catch (error) {
        console.error("참여하는 스터디 목록을 불러오는 데에 실패했습니다.", error);
        setParticipatingStudies([]);
      }
    };

    // 운영중인 스터디 조회
    const fetchAdministeredStudies = async () => {
      try {
        const response = await API.get("/mystudy/admin");

        if (response.status === 200) {
          const data = response.data;
          
          if (Array.isArray(data.studyList)) {
            console.log("운영 중인 스터디 목록 로드 성공:", data.studyList);
            setAdministeredStudies(data.studyList);
          } else {
            console.error("응답 데이터가 배열이 아닙니다:", data);
            setAdministeredStudies([]);
          }
        } else {
          console.error('예상치 못한 응답 코드:', response.status);
          setAdministeredStudies([]);
        }
      } catch (error) {
        console.error("운영 중인 스터디 목록을 불러오는 데에 실패했습니다.", error);
        setAdministeredStudies([]);
      }
    };

    useEffect(() => {
      fetchParticipatingStudies();
      fetchAdministeredStudies();
    }, []);

  // 스터디 페이지 입장하기
  function handleEnterStudy(studyPk) {
    navigate(`/study/${studyPk}`);
  }

  // 스터디 탈퇴하기
  function handleLeaveStudy(study) {
    setStudyToLeave(study);
    setIsWithdrawalModalOpen(true);
  }

  function confirmLeaveStudy() {
    if (userInput === studyToLeave.studyName) {
      API.delete(`/mystudy/${studyToLeave.studyPk}`)
        .then(response => {
          if (response.status === 204) {
            alert(`'${studyToLeave.studyName}'에서 성공적으로 탈퇴되었습니다.`);
            fetchParticipatingStudies();
          }
        })
        .catch(error => {
          alert("스터디 탈퇴에 실패하였습니다.");
          console.error("스터디 탈퇴 실패:", error);
        });
      handleCloseWithdrawalModal();
    } else {
      alert("스터디명이 일치하지 않습니다.");
    }
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setCurrentStudyPk(null);
  }

  function handleCloseWithdrawalModal() {
    setIsWithdrawalModalOpen(false);
    setStudyToLeave(null);
    setUserInput('');
  }

  function handleInputChange(e) {
    setUserInput(e.target.value);
  }

  function handleViewApplicants(studyPk) {
    setCurrentStudyPk(studyPk);
    setIsModalOpen(true);
  }

  return (
    <div className="div-container">
      <div className="card-container">
        <p className="card-type">참여하는 스터디 🔥</p>
        {participatingStudies.length === 0 ? (
          <p className="no-data">스터디 목록이 없습니다.</p>
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
                <p className="card-title" style={{color: '#9b580b'}}>스터디 기간</p>
                <p className="card-text">
                  {study.studyStartDate} - {study.studyEndDate}
                </p>
                <p className="card-title" style={{color: '#9b580b'}}>참가 인원</p>
                <p className="card-text">{study.studyPersonNum} / {study.maxPeople}</p>
                <button className="study-entry-btn" 
                onClick={() => handleEnterStudy(study.studyPk)}>입장하기</button>
                <button className="study-leave-btn" 
                onClick={() => handleLeaveStudy(study)}>탈퇴하기</button>

              </div>
            </div>
          ))
        )}
      </div>

      <div className="card-container">
        <p className="card-type">운영중인 스터디 ✏️</p>
        {administeredStudies.length === 0 ? (
          <p className="no-data">스터디 목록이 없습니다.</p>
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
                <p className="card-title" style={{color: '#9b580b'}}>스터디 기간</p>
                <p className="card-text">
                  {study.studyStartDate} - {study.studyEndDate}
                </p>
                <p className="card-title" style={{color: '#9b580b'}}>참가 인원</p>
                <p className="card-text">{study.studyPersonNum} / 6</p>
                <button className="study-entry-btn"
                onClick={() => handleEnterStudy(study.studyPk)}>입장하기</button>
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
        <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
      </div>
    
 {/*
      <div className="card-container">
      <p className="card-type">지원한 스터디 🧑‍💻</p>
      <div className="list-container">
              <div className="apply-item">
                <div
                  className="apply-img"
                >
                  <img src={sample1}></img>
                </div>
                <div className="apply-info">
                  <span className="apply-study-name">3D 게임개발 스터디</span>
                  <span className="apply-state">수락 대기 중</span>
                </div>
                <div className="apply-edit">
                  <button
                    className="apply-edit-btn"
                  >
                    수정
                  </button>
                  <button
                    className="apply-delete-btn"
                  >
                    취소
                  </button>
                </div>
              </div>
      </div>
      <div className="list-container">
              <div className="apply-item">
                <div
                  className="apply-img"
                >
                  <img src={sample2}></img>
                </div>
                <div className="apply-info">
                  <span className="apply-study-name">우아한 스터디</span>
                  <span className="apply-state-2">수락 대기 중</span>
                </div>
                <div className="apply-edit">
                  <button
                    className="apply-edit-btn"
                  >
                    수정
                  </button>
                  <button
                    className="apply-delete-btn"
                  >
                    취소
                  </button>
                </div>
              </div>
      </div>
</div>
          */}


      <Modal show={isModalOpen} handleClose={handleCloseModal} title="지원요청 목록">
        {currentStudyPk && <ApplicantList studyPk={currentStudyPk} />}
      </Modal>

      <Modal show={isWithdrawalModalOpen} handleClose={handleCloseWithdrawalModal} title="스터디 탈퇴">
        {studyToLeave && (
          <div className="study-leave-modal">
            <img src="img/warning.png" style={{width: '40px', marginTop: '-12px', marginBottom: '12px'}}></img>
            <p className="study-leave-title">스터디를 탈퇴하시겠습니까?</p>
            <div className="study-leave-contents">
            <p className="study-leave-content">스터디 탈퇴 시 모든 데이터는 삭제되며, 복구되지 않습니다.</p>
            <p className="study-leave-content">확인을 위해 <b>'{studyToLeave.studyName}'</b>을(를) 정확히 입력하세요.</p>
            </div>
            <input type="text" className="study-leave-filed" placeholder="스터디명 입력" value={userInput} onChange={handleInputChange} />
            <div className="buttons-container">
            <button className="study-leave-btn-confirm"
            onClick={confirmLeaveStudy}>확인</button>
            <button className="study-leave-btn-cancel"
            onClick={handleCloseWithdrawalModal}>취소</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MyStudy;
