import API from '../../api/AxiosInstance';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

apiClient.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config; // 에러가 발생한 원래 요청 보관
        const navigate = useNavigate();

        if (error.response.status === 401 && !originalRequest._retry) { 
            originalRequest._retry = true; // 요청이 재시도되지 않았을 경우, 재시도 플래그

            try {
                const refreshToken = Cookies.get('refreshToken');
                const response = await API.post('/login/re-token', null, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`,
                    },
                });

                const { accessToken } = response.data;
                Cookies.set('accessToken', accessToken);
                apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;

                return apiClient(originalRequest); // 기존 요청 재시도
                
            } catch (refreshError) {
                console.log('토큰 재발급 실패:', refreshError);
                Cookies.remove('accessToken');
                Cookies.remove('refreshToken');
                navigate('/login');
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
