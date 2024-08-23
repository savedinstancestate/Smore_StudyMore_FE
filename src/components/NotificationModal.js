import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import EventSourcePolyfill from "eventsource-polyfill";

const NotificationComponent = ({ show, position, onNotificationReceived }) => {
  const [notifications, setNotifications] = useState([]); // 알림을 저장할 상태
  const esRef = useRef(null); // EventSource 인스턴스를 useRef로 관리

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");
    if (!accessToken) {
      console.log(
        "액세스 토큰을 사용할 수 없습니다. SSE 연결을 설정할 수 없습니다."
      );
      return;
    }

    const connectEventSource = () => {
      // 기존 EventSource 연결이 있으면 닫기
      if (esRef.current) {
        esRef.current.close();
      }
      
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
          const timestampThreshold = Date.now() - 5 * 60 * 1000;
          
          setNotifications((prev) => {
            const isDuplicate = prev.some(
              (notification) =>
              notification.notificationPk === parsedData.notificationPk ||
                (notification.content === parsedData.content &&
                 new Date(notification.time).getTime() > timestampThreshold)
            );

            // 중복되지 않은 알림만 추가
            const newNotifications = isDuplicate
              ? prev
              : [parsedData, ...prev];

            // 시간 순서대로 정렬
            return newNotifications.sort((a, b) => new Date(b.time) - new Date(a.time));
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

      esRef.current = es; // useRef로 EventSource 인스턴스를 저장
    };

    connectEventSource();

    return () => {
      if (esRef.current) {
        esRef.current.close();
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
      <h6 style={{fontWeight: '500'}}>알림</h6>
      <div>
        {notifications.length === 0 ? (
          <div style={{ padding: "10px", textAlign: "center", color: "#888" }}>
            알림이 없습니다.
          </div>
        ) : (
          notifications.map((notification, index) => (
            <li
              key={notification.notificationPk || index}
              style={{
                padding: "12px 4px",
                borderBottom:
                  index === notifications.length - 1 ? "none" : "1px solid #ddd",
                fontSize: "13px",
                listStyle: "none",
              }}
            >
              <div>{notification.content}</div>
              <div style={{ color: "#888", fontSize: "11px" }}>
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
