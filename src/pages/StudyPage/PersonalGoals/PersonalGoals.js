import React from 'react';
import NotStarted from './NotStarted';
import InProgress from './InProgress';
import Completed from './Completed';
import GoalList from './GoalList';

const PersonalGoals = () => {
    return (
        <div>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    gap: '10px',
                    flexWrap: 'wrap',
                }}
            >
                <NotStarted />
                <InProgress />
                <Completed />
            </div>
            <GoalList />
        </div>
    );
};

export default PersonalGoals;
