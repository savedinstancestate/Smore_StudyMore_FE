import React, { useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

function KakaoLoginRedirectHandler() {
    const { accessToken, refreshToken } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
      if (!accessToken || !refreshToken) {
        console.log("액세스 토큰 혹은 리프레시 토큰이 제공되지 않았습니다.");
        navigate('/login');  
        return;
    }
      console.log("accessToken: "+ accessToken);
      console.log("refreshToken: "+ refreshToken);
      Cookies.set('accessToken', accessToken);
      Cookies.set('refreshToken', refreshToken);

      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      
      navigate('/home');
  },[accessToken, refreshToken, navigate]);

  return <div>Loading...</div>;
  
};

export default KakaoLoginRedirectHandler;
