import React, { useState } from 'react';
import Modal from '../../components/Modal'; 
import Login from '../LoginPage/Login'; 

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); 

  function handleOpenModal() {
    setIsModalOpen(true); 
  };

  function handleCloseModal() {
    setIsModalOpen(false); 
  };

  return (
    <div>
      <button onClick={handleOpenModal}>로그인 모달 열기</button>
      <Modal show={isModalOpen} handleClose={handleCloseModal} title="로그인">
        <Login />
      </Modal>
    </div>
  );
};

export default App;
