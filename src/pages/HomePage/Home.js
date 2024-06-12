import React, { useState } from 'react';
import Modal from '../../components/Modal'; // 모달 컴포넌트를 임포트합니다.
import Login from '../LoginPage/Login'; // Login 컴포넌트를 임포트합니다.

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 관리합니다.

  const handleOpenModal = () => {
    setIsModalOpen(true); // 모달을 열기
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // 모달을 닫기
  };

  return (
    <div>
      <button onClick={handleOpenModal}>로그인 모달 열기</button>
      <Modal show={isModalOpen} onHide={handleCloseModal} title="로그인">
        <Login />
      </Modal>
    </div>
  );
};

export default App;
