import React from 'react';

const Login = () => {  
    const handleLogin = () => {
      window.location.href = `${process.env.REACT_APP_AUTH_URL}/oauth2/authorization/kakao`;
    };
  
    return (
        <div className="login-div" style={{ textAlign: 'center' }}>
            <div>
              <img src="/img/smore-logo-2.png" width="140" alt="로고" style={{marginBottom: '30px'}}/>
              </div>
            <button onClick={handleLogin} style={{ background: 'white', border: 'none', marginBottom: '20px'}}>
            <img src="/img/kakao-login-large-wide.png" width="300" alt="카카오 로그인 버튼" />
            </button>
      </div>
    );
  };

  export default Login;