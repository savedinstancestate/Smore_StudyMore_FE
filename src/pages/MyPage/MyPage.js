import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../../api/AxiosInstance'; 
import './MyPage.css';

function MyPage() {
  const [userInfo, setUserInfo] = useState({ nickname: '', profileImage: '' });
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState(null);
  const queryClient = useQueryClient();

  const { data, isError, error: queryError } = useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const response = await API.get('/users/mypage');
      return response.data;
    }
  });

  useEffect(() => {
    if (data) {
      setUserInfo({
        nickname: data.nickname,
        profileImage: data.profileImage
      });
    }

    if (isError) {
      console.error('Error fetching user info:', queryError);
      setError(queryError?.response?.data?.message || '유저 정보 조회 실패');
    }
  }, [data, isError, queryError]);

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  const profileImageMutation = useMutation(
    async (file) => {
      const formData = new FormData();
      formData.append("profileImage", file);
      return await API.patch('/users/profileImage', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
    }
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const validExtensions = ['png', 'jpeg', 'jpg', 'svg'];
    if (validExtensions.includes(fileExtension)) {
      profileImageMutation.mutate(file, {
        onSuccess: (data) => {
          setUserInfo(current => ({ ...current, profileImage: data.profileImage }));
          setSuccessMessage('프로필 이미지가 변경되었습니다.');
          queryClient.invalidateQueries(['userInfo']);
        },
        onError: (error) => {
          console.error('이미지 업로드에 실패했습니다.', error);
          setError('프로필 이미지 변경에 실패했습니다.');
        }
      });
    } else {
      alert(`허용되는 파일 확장자는 ${validExtensions.join(", ")} 입니다.`);
    }
  };

  const nicknameMutation = useMutation(
    async (newNickname) => {
      return await API.patch('/users/nickname', { nickname: newNickname });
    }
  );

  const updateNickname = () => {
    const trimmedNickname = userInfo.nickname.trim();
    if (!trimmedNickname) { // 공백만 입력된 경우
      setError('닉네임을 입력해주세요.');
      return;
    }
    if (/\s/.test(trimmedNickname)) { // 공백을 포함하고 있는 경우
      setError('닉네임에 공백을 포함할 수 없습니다.');
      return;
    }
    if (/[ㄱ-ㅎㅏ-ㅣ]+/.test(trimmedNickname)) { // 한글 자음 또는 모음만 있는 경우
      setError('닉네임에 한글 자음 또는 모음만 사용할 수 없습니다.');
      return;
    }

    nicknameMutation.mutate(trimmedNickname, {
      onSuccess: (data) => {
        setUserInfo(current => ({ ...current, nickname: data.nickname }));
        setSuccessMessage(`닉네임이 '${data.nickname}'(으)로 변경되었습니다.`);
        queryClient.invalidateQueries(['userInfo']);
      },
      onError: (error) => {
        console.error('닉네임 변경 실패:', error);
        setError('닉네임 변경에 실패했습니다.');
      }
    });
  };

  return (
    <div className="div-container-mypage">
    <div className="profile-container">
      {error && <div className="alert alert-danger">{error}</div>}
      {successMessage && <div className="alert alert-primary">{successMessage}</div>}
      <p className="card-type-mypage">프로필 수정 ✍️</p>
      <div className="profile-image" onClick={triggerFileInput}>
        <img src={userInfo.profileImage || "img/default-profile.png"} className="edited-image" alt="프로필 이미지" />
        <img src="img/img-edit.png" className="image-edit-btn" alt="이미지 변경"  />
        <input type="file" id="fileInput" style={{ display: 'none' }} accept=".png, .jpeg, .jpg, .svg" onChange={handleImageChange} />
      </div>

      <div className="nickname-container">
        <span className="nickname-title">닉네임 
        <span className="nickname-info">한글, 영문, 숫자 2-10자 입력</span>
        </span>
        
        <div className="nickname-field">
          <input
            type="text"
            id="nickname"
            className="nickname-input"
            placeholder="수정할 닉네임 입력"
            maxLength="10"
            value={userInfo.nickname} 
            onChange={e => setUserInfo({...userInfo, nickname: e.target.value})}
          />
          <button className="nickname-edit-btn" onClick={updateNickname}>확인</button>
        </div>
      </div>
      <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </div>
    </div>
  );
}

export default MyPage;
