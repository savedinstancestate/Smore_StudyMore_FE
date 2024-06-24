import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Modal from '../../components/Modal';
import Login from './Login';

const PrivateRoute = ({ component: Component }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const accessToken = Cookies.get('accessToken');

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // accessToken이 존재할 경우 전달된 Component 렌더링
  return accessToken ? (
    <Component />
  ) : (
    <Modal show={isModalOpen} handleClose={handleCloseModal} title="로그인">
      <Login />
    </Modal>
  );
};

export default PrivateRoute;
