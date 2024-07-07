import React from 'react';
import StudyInfo from './StudyInfo';
import StudyRanking from './StudyRanking';
import AttendanceChart from './AttendanceChart';

const Dashboard = ({ studyPk }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '20px' }}>
                <StudyInfo studyPk={studyPk} />
                <StudyRanking studyPk={studyPk} />
            </div>
            <div>
                <AttendanceChart studyPk={studyPk} />
            </div>
        </div>
    );
};

export default Dashboard;
