import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EventSourcePolyfill from 'eventsource-polyfill';

const NotificationComponent = ({ show, position }) => {
  const [notifications, setNotifications] = useState([]); // 알림을 저장할 상태

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log(
        "액세스 토큰을 사용할 수 없습니다. SSE 연결을 설정할 수 없습니다."
      );
      return;
    }

    let eventSource;

    const connectEventSource = () => {
      eventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_AUTH_URL}/subscribe/notification?Bearer=${accessToken}`
      );

      eventSource.onopen = () => {
        console.log("SSE 연결 성공");
      };

       eventSource.addEventListener("sse", (event) => { // 'sse' 이벤트 처리
        console.log("Received sse event:", event.data);
        try {
          const parsedData = JSON.parse(event.data);
          setNotifications(prev => [...prev, parsedData.Content]); // 새로운 알림 추가
        } catch (error) {
          console.error("Failed to parse event data:", error);
        }
      });

      eventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        eventSource.close();
        // SSE 연결 실패 시 일정 시간 후 재연결 시도
        setTimeout(() => {
          console.log("재연결 시도 중...");
          connectEventSource();
        }, 5000);
      };
    };

    connectEventSource();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []);

  if (!show) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: `${position.top}px`,
        left: `${position.left}px`,
        zIndex: 1002,
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        maxHeight: "300px",
        overflowY: "auto",
        width: "300px",
      }}
    >
      <h5>알림</h5>
      <div>
        {notifications.length === 0 ? (
          <div style={{ padding: '10px', textAlign: 'center', color: '#888' }}>
            알림이 없습니다.
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div key={index} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
              {notification}
            </div>
          ))
        )}
      </div>
      {/* <button onClick={handleClose} style={{color: "#009063", background: "white", border: "1px solid #009063", borderRadius: "4px"}}>닫기</button> */}
    </div>
  );
};

export default NotificationComponent;
