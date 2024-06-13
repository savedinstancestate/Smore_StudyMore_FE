import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import './MyPage.css';

function MyPage() {
  const [userInfo, setUserInfo] = useState({
    nickname: '',
    profileImage: ''
  });

  // 유저 정보 불러오기
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get('/users/mypage');
        console.log(response);
        setUserInfo({
          nickname: response.data.nickname,
          profileImage: response.data.profileImage
        });
      } catch (error) {
        console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
      }
    };
    fetchUserInfo();
  }, []); // 의존성 배열을 비워 컴포넌트가 마운트될 때만 함수 실행

  // 프로필 사진 변경
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

      // 파일 확장자 검증
      const fileExtension = file.name.split('.').pop().toLowerCase();
      const validExtensions = ['png', 'jpeg', 'jpg', 'svg'];
    if (!validExtensions.includes(fileExtension)) {
        alert(`허용되는 파일 확장자는 ${validExtensions.join(", ")} 입니다.`);
        return; // 허용되지 않는 파일이면 함수 종료
      }

      const imageUrl = URL.createObjectURL(file);
      const uploadSuccess = await uploadImage(file); // 파일 업로드 함수를 호출하고 성공 여부를 받음

      if (uploadSuccess) {
        setUserInfo({ 
          ...userInfo,
          profileImage: imageUrl
        });
      } else {
        URL.revokeObjectURL(imageUrl); // 업로드 실패 시 생성된 URL 해제
      }
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
        const response = await axios.patch('/users/profileImage', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log('이미지 변경 성공:', response.data);
        alert('프로필 이미지가 변경되었습니다.');
      } catch (error) {
        console.error('이미지 변경 실패:', error);
        alert('프로필 이미지 변경에 실패했습니다.');
      }
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
      };
      

  // 닉네임 변경
  const updateNickname = async () => {
    try {
      const response = await axios.patch('/users/nickname',
      { nickname: userInfo.nickname });
      console.log('닉네임 변경 성공:', response.data);
      alert('닉네임이 변경되었습니다.');
    } catch (error) {
      console.error('닉네임 변경 실패:', error);
      alert('닉네임 변경에 실패했습니다.');
    }
  };

  return (
    <div className="profile-container">
    <h3><b>👤 프로필 수정</b></h3>

    <div className="profile-image" onClick={triggerFileInput}>
        <img src={userInfo.profileImage || "img/default-profile.png"} className="edited-image" alt="프로필 이미지" />
        <img src="img/image-edit.png" className="image-edit-btn" alt="이미지 변경"  />
        <input type="file" id="fileInput" style={{ display: 'none' }} accept=".png, .jpeg, .jpg, .svg" onChange={handleImageChange} />
    </div>

    <div className="nickname-container">
        <span className="nickname-title">닉네임</span>
        <span className="nickname-info">한글, 영문, 숫자 2-10자 입력</span>
        <div className="nickname-field">
        <input
        type="text"
        id="nickname"
        placeholder="수정할 닉네임을 입력하세요."
        maxLength="10"
        value={userInfo.nickname} 
        onChange={e => setUserInfo({...userInfo, nickname: e.target.value})}/>
        <button className="nickname-edit-btn" onClick={updateNickname}>확인</button>
        </div>
    </div>
</div>
  );
}

export default MyPage;
