import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EventSourcePolyfill from 'eventsource-polyfill';

const NotificationComponent = ({ show, position, onNewNotification }) => {
  const [notifications, setNotifications] = useState([]); // 알림을 저장할 상태
  const [eventSource, setEventSource] = useState(null);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log(
        "액세스 토큰을 사용할 수 없습니다. SSE 연결을 설정할 수 없습니다."
      );
      return;
    }

    // 기존 EventSource가 있으면 닫기
    if (eventSource) {
      eventSource.close();
    }

    // 새로운 EventSource 설정
    const newEventSource = new EventSourcePolyfill(
        `${process.env.REACT_APP_AUTH_URL}/subscribe/notification?Bearer=${accessToken}`
      );

      newEventSource.onopen = () => {
        console.log("SSE 연결 성공");
      };

      newEventSource.addEventListener("sse", (event) => { // 'sse' 이벤트 처리
        console.log("Received sse event:", event.data);
        try {
          const parsedData = JSON.parse(event.data);
          setNotifications(prev => [...prev, parsedData.Content]); // 새로운 알림 추가
          onNewNotification();
        } catch (error) {
          console.error("Failed to parse event data:", error);
        }
      });

      newEventSource.onerror = (err) => {
        console.error("EventSource failed:", err);
        newEventSource.close();
        setTimeout(() => {
          console.log("재연결 시도 중...");
          const retryEventSource = new EventSourcePolyfill(
            `${process.env.REACT_APP_AUTH_URL}/subscribe/notification?Bearer=${accessToken}`
          );
          setEventSource(retryEventSource);
        }, 5000);
      };

    setEventSource(newEventSource);

    return () => {
      if (newEventSource) {
        newEventSource.close();
      }
    };
  }, [show, onNewNotification]);

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
    </div>
  );
};

export default NotificationComponent;
