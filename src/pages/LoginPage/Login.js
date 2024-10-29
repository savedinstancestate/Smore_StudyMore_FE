import React from 'react';

const Login = () => {  
    const handleLogin = () => {
      window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
    };
  
    return (
        <div className="login-div" style={{ textAlign: 'center' }}>
            <img src="/img/smore-logo-ver2.png" width="200" alt="로고" style={{margin: '20px'}}/>
            <button onClick={handleLogin} style={{ background: 'white', border: 'none', marginBottom: '20px'}}>
            <img src="/img/kakao-login-large-wide.png" width="300" alt="카카오 로그인 버튼" />
            </button>
      </div>
    );
  };

  export default Login;