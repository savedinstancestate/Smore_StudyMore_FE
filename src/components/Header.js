import React, { useRef, useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";
import "../styles/StudyCard.css";
import Modal from "./Modal";
import Login from "../pages/LoginPage/LoginModal";
import CreateStudyModal from "../pages/HomePage/CreateStudyModal";
import { useHeaderStudyName } from "./StudyNameContext";
import { useAuth } from "./AuthContext";
import NotificationComponent from "./NotificationModal";
import logoImage from "./smore-logo.png";
import notificationIcon from "./notification.png";

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 250px; /* Width of the sidebar */
  height: 100vh; /* Full height */
  background-color: #fff;
  box-shadow: 2px 0 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
`;

const HeaderContainer = styled.header`
  padding: 20px;
  margin-left: 6px;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Logo = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  margin-bottom: 18px;
`;

const LogoImage = styled.img`
  height: 50px;
  margin-right: 10px;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  width: 100%;

  a {
    margin: 10px 0;
    text-decoration: none;
    color: #333;
    font-weight: 600;
    font-size: 15px;
    cursor: pointer;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .active {
    color: #ea8400;
  }
`;

const TitleContainer = styled.div`
  position: relative;
  margin-left: 240px;
  width: calc(100% - 240px);
  padding: 40px 0px 20px 40px;
  display: flex;
  align-items: center;
`;

const PageTitle = styled.h1`
  font-size: 22px;
  color: #ea8400;
  font-weight: 700;
`;

const ButtonContainer = styled.div`
  position: absolute;
  right: 20px;
  display: flex;
  align-items: center;
  margin-top: -8px;
`;

const LoginButton = styled.button`
  padding: 10px;
  background-color: #fff;
  color: #ea8400;
  font-size: 15px;
  font-weight: 500 !important;
  border: 1px solid #ea8400;
  border-radius: 8px;
  cursor: pointer;
  margin: 10px 0px;
  width: 100%;
`;

const NotificationButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 4px;
  padding: 7px;
  cursor: pointer;
  position: relative;
  margin-top: 0px;
`;

const NotificationIcon = styled.img`
  width: 24px;
  margin-top: -3px;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 5;
  right: 9;
  background-color: #ea8400;
  border-radius: 50%;
  width: 9px;
  height: 9px;
`;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const location = useLocation();
  const { headerStudyName } = useHeaderStudyName();
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [hasUnreadNotifications, setHasUnreadNotifications] = useState(false);
  const [notificationPosition, setNotificationPosition] = useState({
    top: 0,
    left: 0,
  });
  const notificationButtonRef = useRef(null);

  const updateNotificationPosition = () => {
    if (notificationButtonRef.current) {
      const rect = notificationButtonRef.current.getBoundingClientRect();
      setNotificationPosition({ top: rect.bottom, left: rect.left - 225 });
    }
  };

  useEffect(() => {
    const storedNotifications = localStorage.getItem("hasUnreadNotifications");
    setHasUnreadNotifications(
      storedNotifications ? JSON.parse(storedNotifications) : false
    );
    updateNotificationPosition();
    window.addEventListener("resize", updateNotificationPosition);
    return () => {
      window.removeEventListener("resize", updateNotificationPosition);
    };
  }, []);

  // 알림 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem(
      "hasUnreadNotifications",
      JSON.stringify(hasUnreadNotifications)
    );
  }, [hasUnreadNotifications]);

  const toggleNotificationModal = () => {
    updateNotificationPosition();
    setIsNotificationOpen((prev) => {
      if (!prev) {
        setHasUnreadNotifications(false); // 알림 모달을 열 때 unread 상태를 false로 설정
      }
      return !prev;
    });
  };

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = Cookies.get("accessToken");
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, [location, setIsLoggedIn]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const resetNotificationState = () => {
    setHasUnreadNotifications(false);
    localStorage.setItem("hasUnreadNotifications", JSON.stringify(false));
  };

  const handleNotificationUpdate = (hasNewNotification) => {
    setHasUnreadNotifications(hasNewNotification);
    if (!hasNewNotification) {
      resetNotificationState(); // 알림이 없어진 경우 상태와 로컬 스토리지 초기화
    }
  };

  const handleProtectedLinkClick = (event) => {
    if (!isLoggedIn) {
      event.preventDefault();
      handleOpenModal();
    }
  };

  const renderPageTitle = useMemo(() => {
    if (location.pathname.startsWith("/study")) {
      return headerStudyName || "스터디 로딩 중...";
    }
    switch (location.pathname) {
      case "/":
        return "홈";
      case "/mystudy":
        return "내 스터디";
      case "/mypage":
        return "마이페이지";
      case "/login":
        return "로그인";
      default:
        return "";
    }
  }, [location.pathname, headerStudyName]);

  return (
    <>
      <HeaderWrapper>
        <HeaderContainer>
          <Logo to="/">
            <LogoImage src={logoImage} alt="Logo" />
          </Logo>
          <NavLinks>
          {!isLoggedIn && (
            <LoginButton onClick={handleOpenModal}>로그인</LoginButton>
            )}
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              홈
            </NavLink>
            <NavLink
              to="/mystudy"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleProtectedLinkClick}
            >
              내 스터디
            </NavLink>
            <NavLink
              to="/mypage"
              className={({ isActive }) => (isActive ? "active" : "")}
              onClick={handleProtectedLinkClick}
            >
              마이페이지
            </NavLink>
          </NavLinks>
        </HeaderContainer>
      </HeaderWrapper>

      <TitleContainer>
        <PageTitle>{renderPageTitle}</PageTitle>
        <ButtonContainer>
          {isLoggedIn && (
            <>
              <NotificationButton
                ref={notificationButtonRef}
                onClick={toggleNotificationModal}
              >
                <NotificationIcon src={notificationIcon} alt="Notifications" />
                {hasUnreadNotifications && <NotificationBadge />}
              </NotificationButton>
            </>
          )}
          <CreateStudyModal />
        </ButtonContainer>
      </TitleContainer>

      <Modal show={isModalOpen} handleClose={handleCloseModal} title="로그인">
        <Login />
      </Modal>

      <NotificationComponent
        show={isNotificationOpen}
        position={notificationPosition}
        onNotificationReceived={handleNotificationUpdate}
      />
    </>
  );
};

export default Header;
