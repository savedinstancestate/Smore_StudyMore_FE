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
        console.log("Received sse event:", event.data);
        try {
          const parsedData = JSON.parse(event.data);
          const notificationTime = new Date(parsedData.time).getTime();
          const timestampThreshold = Date.now() - 5 * 60 * 1000;
          
          setNotifications((prev) => {
            const isDuplicate = prev.some(
              (notification) =>
                notification.content === parsedData.content &&
                new Date(notification.time).getTime() > timestampThreshold
            );
            if (!isDuplicate) {
              return [parsedData, ...prev];
            }
            return prev;
          });

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
              <div>{notification.content}</div>
              <div style={{ color: "#888", fontSize: "12px" }}>
                {new Date(notification.time).toLocaleString()}
              </div>
            </li>
          ))
        )}
      </div>
    </div>
  );
};

export default NotificationComponent;
