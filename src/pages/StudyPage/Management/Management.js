import React from 'react';
import EditStudyInfo from './EditStudyInfo';

const Management = ({ studyPk }) => {  // props 이름을 studyPk로 수정
    console.log('studyPk:', studyPk);
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    gap: '10px',
                    flexWrap: 'wrap',
                    padding: '10px',
                }}
            >
                <EditStudyInfo studyPk={studyPk} />  {/* studyPk를 EditStudyInfo에 전달 */}
                
            </div>
        </div>
    );
};

export default Management;
