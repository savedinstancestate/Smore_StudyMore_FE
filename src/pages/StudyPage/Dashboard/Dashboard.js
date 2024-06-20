import React from 'react';
import StudyInfo from './StudyInfo';
import StudyRanking from './StudyRanking';

const Dashboard = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', gap: '20px' }}>
            <StudyInfo />
            <StudyRanking />
        </div>
    );
};

export default Dashboard;
