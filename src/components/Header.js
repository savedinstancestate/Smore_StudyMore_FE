import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import "../styles/StudyCard.css";
import Modal from './Modal'; 
import Login from '../pages/LoginPage/LoginModal';
import CreateStudyModal from "../pages/HomePage/CreateStudyModal";
import { useHeaderStudyName } from './StudyNameContext';
import logoImage from './smore-logo-ver1.png';

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
  padding: 10px 20px;
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

const NavContainer = {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-end",
  marginRight: "26px"
}

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
  text-align: right;
  width: 100%;
  margin-bottom: 8px;
  a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 14px;
    cursor: pointer;

    &:last-child {
      margin-right: 0; 
    }
  }
  .active {
    color: #009063;
  }

`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #F3F9F7;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  font-weight: 700;
`;

const createStudyModalStyle = {
  backgroundColor: "#009063 !important",
  color: "white !important",
  padding: "10px !important",
  borderRadius: "5px !important",
  cursor: "pointer !important",
  fontSize: "16px !important",
  fontWeight: "600 !important",
};

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const currentLocation = useLocation();
  const { headerStudyName } = useHeaderStudyName();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const renderPageTitle = () => {
    console.log('Current study name:', headerStudyName);
    if (currentLocation.pathname.startsWith('/study')) {
      return headerStudyName || '스터디 로딩 중...'; // 동적 경로에 따라 이름을 불러옴
    }
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
          <LogoImage src={logoImage} alt="Logo" />
        </Logo>
        <div style={NavContainer} >
        <NavLinks>
          <NavLink exact to="/" activeClassName="active">홈</NavLink>
          <NavLink to="/mystudy" activeClassName="active">내 스터디</NavLink>
          <NavLink to="/mypage" activeClassName="active">마이페이지</NavLink>
          <a onClick={handleOpenModal}>로그인</a>
        </NavLinks>
        <CreateStudyModal style={createStudyModalStyle} />
        </div>
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
