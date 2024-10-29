import React, { useState } from "react";
import UniversalModal from "../../components/Modal";
import { Form, Button, Modal } from "react-bootstrap";
import API from "../../api/AxiosInstance";

const ApplyStudyModal = ({ studyName, show, handleClose, studyPk }) => {
  const [introduction, setIntroduction] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showOverlay, setShowOverlay] = useState(false); 

  const handleIntroductionChange = (event) => {
    setIntroduction(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await API.post(`/board/${studyPk}/enter`, {
        content: introduction,
      });
      console.log("Server Response:", response.data);
      setSuccessMessage("스터디 지원이 완료되었습니다.");
      resetForm();
      setTimeout(() => {
        closeModal();
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error submitting application:", error);
      setErrorMessage("오류가 발생했습니다. 다시 시도해 주세요.");
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const toggleOverlay = (show) => {
    setShowOverlay(show);
  };

  const openModal = () => {
    setModalShow(true);
    toggleOverlay(true);
  };

  const closeModal = () => {
    setModalShow(false);
    toggleOverlay(false);
    resetForm();
  };

  const resetForm = () => {
    setIntroduction("");
  };

  

  const modalContent = (
    <Form onSubmit={handleSubmit}>
        {successMessage && <div className="alert alert-primary">{successMessage}</div>}
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <Form.Group>
        <Form.Label>
          <span
            style={{ color: "#ea8400", fontWeight: "700", marginRight: "3px" }}
          >
            스터디명
          </span>{" "}
          {studyName}
        </Form.Label>
      </Form.Group>
      <Form.Group>
        <Form.Label style={{ fontWeight: "700" }}>나를 소개하기</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          placeholder="자신을 짧게 소개해 주세요."
          value={introduction}
          onChange={handleIntroductionChange}
        />
      </Form.Group>
      <Modal.Footer
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "none",
          width: "100%",
          padding: 0,
        }}
      >
        <Button variant="secondary" onClick={closeModal} style={{backgroundColor: '#fff', color: '#929292', border: '1px solid #929292'}}>
          취소
        </Button>
        <Button variant="success" type="submit" style={{color: "#fff", backgroundColor: "#ea8400", border: "none" }}>
          지원하기
        </Button>
      </Modal.Footer>
    </Form>
  );

  return (
    <>
      <Button
        variant="success"
        onClick={openModal}
        style={{
          padding: "12px",
          fontWeight: "600",
          width: "90%",
          marginBottom: "20px",
          backgroundColor: "#ea8400",
          border: "none",
        }}
      >
        스터디 지원하기
      </Button>

      <UniversalModal
        title="스터디 지원하기"
        show={modalShow}
        handleClose={closeModal}
        children={modalContent}
        style={{
          zIndex: 1050, // 모달 창의 z-index를 더 높게 설정
        }}
      />
      {showOverlay && (
        <div
          className="overlay"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 1040, // 모달 창 아래에 위치하도록 설정
          }}
        ></div>
      )}
    </>
  );
};

export default ApplyStudyModal;
