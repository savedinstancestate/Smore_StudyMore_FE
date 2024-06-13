import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';


if (process.env.NODE_ENV === 'development') {
    const { worker } = require('./mocks/browser');
    worker.start();
  }


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// 앱의 성능 측정을 시작합니다. 결과를 콘솔로 로깅하거나 분석 엔드포인트로 보낼 수 있습니다.
// 자세한 정보: https://bit.ly/CRA-vitals
reportWebVitals();
