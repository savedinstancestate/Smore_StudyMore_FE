import React, { useEffect, useRef } from "react";
import Cookies from "js-cookie";
import EventSourcePolyfill from 'eventsource-polyfill';

const NotificationComponent = ({ show, handleClose }) => {
  const notificationRef = useRef(null); // 알림 출력을 위한 ref

  useEffect(() => {
    const accessToken = Cookies.get("accessToken"); // 쿠키에서 액세스 토큰 가져오기
    if (!accessToken) {
      console.log(
        "액세스 토큰을 사용할 수 없습니다. SSE 연결을 설정할 수 없습니다."
      );
      return;
    }

    const eventSource = new EventSourcePolyfill(
      `${process.env.REACT_APP_AUTH_URL}/subscribe/notification?Bearer=${accessToken}`
    );

    eventSource.onopen = () => {
      console.log("SSE 연결이 열렸습니다.");
    };

    eventSource.onmessage = (event) => {
      console.log("Received event:", event.data); // 서버에서 받은 데이터를 로그에 출력
      try {
        const newNotification = JSON.parse(event.data);
        displayNotification(newNotification.content);
      } catch (error) {
        console.error("Failed to parse event data:", error);
        console.error("Event data:", event.data); // 원시 데이터를 출력하여 확인
        displayNotification(event.data); // 원시 데이터를 알림으로 출력
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource failed:", err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const displayNotification = (content) => {
    const notificationDiv = document.createElement('div');
    notificationDiv.textContent = content;
    if (notificationRef.current) {
      notificationRef.current.appendChild(notificationDiv);
    }
  };

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
      <div ref={notificationRef}></div> {/* 알림 출력 부분 */}
      <button onClick={handleClose}>닫기</button>
    </div>
  );
};

export default NotificationComponent;
