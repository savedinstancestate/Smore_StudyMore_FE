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
import logoImage from "./smore-logo-ver1.png";
import notificationIcon from "./notification.png";

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
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

const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 25px;
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
  text-align: right;
  width: 100%;
  margin-bottom: 0px;

  a {
    margin: 0 10px;
    text-decoration: none;
    color: #333;
    font-weight: bold;
    font-size: 15px;
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
  background-color: #f3f9f7;
`;

const PageTitle = styled.h1`
  font-size: 30px;
  color: black;
  font-weight: 700;
`;

const LoginButton = styled.button`
  padding: 8px 18px;
  background-color: #009063;
  color: white;
  font-size: 15px;
  font-weight: 600 !important;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-left: 10px;
`;

const NotificationButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
`;

const NotificationIcon = styled.img`
  width: 22px;
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 1px;
  right: 6px;
  background-color: #009063;
  border-radius: 50%;
  width: 10px;
  height: 10px;
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
      setNotificationPosition({ top: rect.bottom, left: rect.left - 235 });
    }
  };

  // 초기 로컬 스토리지에서 값 가져오기
  useEffect(() => {
    const storedNotifications = localStorage.getItem("hasUnreadNotifications");
    if (storedNotifications === null) {
      // 로컬 스토리지에 값이 없으면 기본값을 false로 설정
      setHasUnreadNotifications(false);
    } else {
      // 로컬 스토리지에 값이 있으면 그 값을 사용
      setHasUnreadNotifications(JSON.parse(storedNotifications));
    }

    updateNotificationPosition();
    window.addEventListener("resize", updateNotificationPosition);
    return () => {
      window.removeEventListener("resize", updateNotificationPosition);
    };
  }, []);

  // 알림 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("hasUnreadNotifications", JSON.stringify(hasUnreadNotifications));
  }, [hasUnreadNotifications]);

  const toggleNotificationModal = () => {
    updateNotificationPosition();
    setIsNotificationOpen(prev => !prev);

    if (!isNotificationOpen) {
      setHasUnreadNotifications(false);
    }
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

  const handleNotificationUpdate = (hasNewNotification) => {
    setHasUnreadNotifications(hasNewNotification);
  };

  const renderPageTitle = useMemo(() => {
    if (location.pathname.startsWith("/study")) {
      return headerStudyName || "스터디 로딩 중...";
    }
    switch (location.pathname) {
      case "/":
        return "Study More";
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
          <HeaderContent>
            <Logo to="/">
              <LogoImage src={logoImage} alt="Logo" />
            </Logo>
            <NavContainer>
              <NavLinks>
                <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
                  홈
                </NavLink>
                {isLoggedIn ? (
                  <>
                    <NavLink to="/mystudy" className={({ isActive }) => (isActive ? 'active' : '')}>
                      내 스터디
                    </NavLink>
                    <NavLink to="/mypage" className={({ isActive }) => (isActive ? 'active' : '')}>
                      마이페이지
                    </NavLink>
                    <NotificationButton
                      ref={notificationButtonRef}
                      onClick={toggleNotificationModal}
                    >
                      <NotificationIcon
                        src={notificationIcon}
                        alt="Notifications"
                      />
                      {hasUnreadNotifications && (
                        <NotificationBadge />
                      )}
                    </NotificationButton>
                    <CreateStudyModal />
                  </>
                ) : (
                  <LoginButton onClick={handleOpenModal}>로그인</LoginButton>
                )}
              </NavLinks>
            </NavContainer>
          </HeaderContent>
        </HeaderContainer>
        <TitleContainer>
          <PageTitle>{renderPageTitle}</PageTitle>
        </TitleContainer>
      </HeaderWrapper>

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
