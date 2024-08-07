import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import EventSourcePolyfill from "eventsource-polyfill";

const NotificationComponent = ({ show, position, onNotificationReceived }) => {
  const [notifications, setNotifications] = useState([]); // 알림을 저장할 상태
  const [eventSource, setEventSource] = useState(null); // EventSource 인스턴스를 상태로 저장

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log(
        "액세스 토큰을 사용할 수 없습니다. SSE 연결을 설정할 수 없습니다."
      );
      return;
    }

    const connectEventSource = () => {
      const es = new EventSourcePolyfill(
        `${process.env.REACT_APP_AUTH_URL}/subscribe/notification?Bearer=${accessToken}`
      );

      es.onopen = () => {
        console.log("SSE 연결 성공");
      };

      es.addEventListener("sse", (event) => {
        // 'sse' 이벤트 처리
        console.log("Received sse event:", event.data);
        try {
          const parsedData = JSON.parse(event.data);
          setNotifications((prev) => [parsedData, ...prev,]); // 새로운 알림 추가
          if (onNotificationReceived) {
            onNotificationReceived(true);
          }
        } catch (error) {
          console.error("알림 데이터 파싱 오류:", error);
        }
      });

      es.onerror = (error) => {
        console.error("SSE 연결 오류:", error);
        es.close();
        // SSE 연결 실패 시 일정 시간 후 재연결 시도
        setTimeout(() => {
          console.log("재연결 시도 중...");
          connectEventSource();
        }, 5000);
      };

      setEventSource(es); // EventSource 인스턴스를 상태로 저장
    };

    connectEventSource();

    return () => {
      if (eventSource) {
        eventSource.close();
      }
    };
  }, []); // 의존성 배열을 빈 배열로 설정하여 컴포넌트 마운트 및 언마운트 시만 연결

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
        padding: "20px 20px 10px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        maxHeight: "300px",
        overflowY: "auto",
        width: "260px",
      }}
    >
      <h5 style={{fontWeight: '600'}}>알림</h5>
      <div>
        {notifications.length === 0 ? (
          <div style={{ padding: "10px", textAlign: "center", color: "#888" }}>
            알림이 없습니다.
          </div>
        ) : (
          notifications.map((notification, index) => (
            <li
              key={index}
              style={{
                padding: "20px 0px",
                borderTop: "1px solid #ddd",
                fontSize: "14px",
                listStyle: "none",
              }}
            >
              {notification.content}
            </li>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
