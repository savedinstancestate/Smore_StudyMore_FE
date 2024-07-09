import React, { useState, useEffect } from 'react';

const NotificationComponent = ({ show, handleClose }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const eventSource = new EventSource('https://smore.today/subscribe/notification');

        // onmessage 이벤트 핸들러: 서버로부터 메시지(알림)를 받으면 실행
        eventSource.onmessage = event => {
          // 받은 데이터를 JSON 형식으로 파싱
            const newNotification = JSON.parse(event.data);
            // 기존 알림 목록에 새 알림을 추가
            setNotifications(prev => [...prev, newNotification]);
        };

        // onerror 이벤트 핸들러: EventSource 연결에 문제가 생기면 실행
        eventSource.onerror = err => {
            console.error('EventSource failed:', err);
             // 문제가 발생하면 EventSource 연결을 닫음
            eventSource.close();
        };

        // 컴포넌트가 언마운트될 때 EventSource 연결을 정리
        return () => {
            eventSource.close();
        };
    }, []);

    // show prop이 false면 아무 것도 렌더링하지 않고 null을 반환
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
