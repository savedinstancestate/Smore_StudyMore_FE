import React from 'react';
import './StudyInfo.css';

const StudyInfo = () => {
    const members = [
        { name: '김현빈', role: '회장', avatar: '/path/to/avatar1.png' },
        { name: '서다영', role: '회원', avatar: '/path/to/avatar2.png' },
        { name: '박진수', role: '회원', avatar: '/path/to/avatar3.png' },
        { name: '남수연', role: '회원', avatar: '/path/to/avatar4.png' },
    ];

    const studyDescription =
        '스터디 소개입니다. 스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.스터디 소개입니다.';

    return (
        <div className="study-info">
            <div className="info-header">우리 스터디는요 ✏️</div>
            <div className="members-header">멤버</div>
            <div className="members-container">
                {members.map((member) => (
                    <div key={member.name} className="member">
                        <img src={member.avatar} alt={`${member.name}의 사진`} className="member-avatar" />
                        <div className="member-info">
                            <div className="member-name">{member.name}</div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="study-description-header">소개</div>
            <p className="study-description">{studyDescription}</p>
        </div>
    );
};

export default StudyInfo;
