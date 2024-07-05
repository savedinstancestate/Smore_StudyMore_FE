import React, { useState, useEffect } from "react";
import API from "../../../api/AxiosInstance";

const EditMember = ({ studyPk }) => {
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchMembers = async () => {
          try {
            const response = await API.get(`/study/${studyPk}/dashboard/member`);
            setMembers(response.data); 
          } catch (error) {
            console.error('멤버 정보를 불러오는데 실패했습니다.', error);
          }
        };
    
        fetchMembers();
      }, [studyPk]);

      return (
        <div>
            <div className="list-container">
          <div className="title">멤버 관리</div>
          <ul>
            {members.map(member => (
              <li key={member.memberPk} className="member-item">
                <div
                  className="member-img"
                  alt={member.profileImg}
                  style={{ backgroundImage: `url(${member.profileImg})` }}
                ></div>
                <div className="member-info">
                  <p className="member-nickname">{member.nickName}</p>
                </div>
                <button
                    className="member-delete-btn"
                  >
                    삭제
                  </button>
                
              </li>
            ))}
          </ul>
          </div>
        </div>
      );

};

export default EditMember;