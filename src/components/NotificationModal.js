import React, { useEffect, useState } from "react";

const NotificationComponent = ({ show, position, notifications }) => {

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
