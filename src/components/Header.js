// Header.js
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from './Modal'; 
import Login from '../pages/LoginPage/Login';

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index:100;
`;

const HeaderContainer = styled.header`
  background-color: #fff;
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1000px;
`;

const Logo = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
`;

const LogoImage = styled.img`
  height: 40px;
  margin-right: 10px;
`;

const NavLinks = styled.nav`
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;
  &.active {
    color: #009063;
  }
}
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 30px 20px;
  background-color: #F3F9F7;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  font-weight: 700;
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentLocation = useLocation();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderPageTitle = () => {
    switch (currentLocation.pathname) {
      case '/':
        return 'Study More';
      case '/mystudy':
        return '내 스터디';
      case '/mypage':
        return '마이페이지';
      case '/login':
        return '로그인';
      default:
        return '';
    }
  };

  return (
    <>
    <HeaderWrapper>
    <HeaderContainer>
      <HeaderContent>
      <Logo to="/">
          <LogoImage src="img/smore-logo-ver1.png" alt="Logo" />
        </Logo>
        <NavLinks>
          <NavLink exact to="/" activeClassName="active">홈</NavLink>
          <NavLink to="/mystudy" activeClassName="active">내 스터디</NavLink>
          <NavLink to="/mypage" activeClassName="active">마이페이지</NavLink>
          <a onClick={handleOpenModal}>로그인</a>
        </NavLinks>
      </HeaderContent>
      
    </HeaderContainer>
    <TitleContainer><PageTitle>{renderPageTitle()}</PageTitle></TitleContainer>
    </HeaderWrapper>

    <Modal show={isModalOpen} handleClose={handleCloseModal} title="로그인">
    <Login />
  </Modal>
  </>
  );
};

export default Header;
