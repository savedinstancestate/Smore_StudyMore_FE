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
        console.log(response); // 로그 출력을 위해 전체 응답 로깅

        if (response.status === 200) {
          console.log("성공적으로 사용자 정보를 불러왔습니다.");
          setUserInfo({
            nickname: response.data.nickname,
            profileImage: response.data.profileImage
          });
        } else {
          console.error('예상치 못한 응답 코드:', response.status);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error('401 오류: 유효하지 않은 토큰입니다.', error.response.data.message);
        } else {
          console.error('사용자 정보를 불러오는 데 실패했습니다.', error);
        }
      }
    };
    fetchUserInfo();
  }, []);

  // 프로필 사진 파일 확장자 검증
  const handleImageChange = async (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];

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

  // 프로필 사진 변경
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

    if (response.status === 200) {
      console.log('프로필 이미지가 성공적으로 변경되었습니다:', response.data.profileImage);
      alert('프로필 이미지가 변경되었습니다.');
    } else {
      console.error('예상치 못한 응답 코드:', response.status);
      alert('프로필 이미지 변경에 실패했습니다.');
    }
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
  const trimmedNickname = userInfo.nickname.trim(); // 양쪽 공백을 제거하고 검사

   // 공백만 있는 경우
   if (!trimmedNickname) {
    alert('닉네임을 입력해주세요.');
    return;
  }

  // 공백을 포함하고 있는 경우
  if (/\s/.test(trimmedNickname)) {
    alert('닉네임을 입력해 주세요.');
    return;
  }

  // 한글 자음 또는 모음이 포함된 경우
  if (/[ㄱ-ㅎㅏ-ㅣ]/.test(trimmedNickname)) {
    alert('자음 혹은 모음을 단독으로 사용할 수 없습니다.');
    return;
  }

  try {
    const response = await axios.patch('/users/nickname', { nickname: userInfo.nickname });
    
    if (response.status === 200) {
      console.log('닉네임 변경 성공:', response.data.nickname); // 변경된 닉네임 로그 출력
      alert(`닉네임이 '${response.data.nickname}'(으)로 변경되었습니다.`);
      setUserInfo({...userInfo, nickname: trimmedNickname});
    } else {
      console.error('예상치 못한 응답 코드:', response.status);
      alert('닉네임 변경에 실패했습니다.');
    }
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
