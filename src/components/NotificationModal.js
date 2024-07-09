import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";
import EventSourcePolyfill from 'eventsource-polyfill';

const NotificationComponent = ({ show, handleClose }) => {
  const [notifications, setNotifications] = useState([]);
  const { isLoggedIn } = useAuth(); // AuthContext를 통해 로그인 상태 확인

  useEffect(() => {
    const accessToken = Cookies.get("accessToken"); // 쿠키에서 액세스 토큰 가져오기
    if (!accessToken) {
      console.log(
        "액세스 토큰을 사용할 수 없습니다. SSE 연결을 설정할 수 없습니다."
      );
      return;
    }

    const eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_AUTH_URL}/subscribe/notification`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      }
    );

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data);
      setNotifications((prev) => [...prev, newNotification]);
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [isLoggedIn]); // isLoggedIn 변경 시 useEffect 재실행

  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1002,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      }}
    >
      <h3>알림</h3>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification.content}</li>
        ))}
      </ul>
      <button onClick={handleClose}>닫기</button>
    </div>
  );
};

export default NotificationComponent;
