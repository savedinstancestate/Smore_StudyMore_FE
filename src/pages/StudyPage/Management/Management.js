import React from 'react';
import EditStudyInfo from './EditStudyInfo';
import EditPromotion from './EditPromotion';
import EditMember from './EditMember';

const Management = ({ studyPk }) => {  
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
                <EditStudyInfo studyPk={studyPk} />
                <EditPromotion studyPk={studyPk} />
                <EditMember studyPk={studyPk} />
                
            </div>
        </div>
    );
};

export default Management;
