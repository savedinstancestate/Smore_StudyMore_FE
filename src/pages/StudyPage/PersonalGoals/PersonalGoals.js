import React from 'react';
import NotStarted from './NotStarted';
import InProgress from './InProgress';
import Completed from './Completed';
import GoalList from './GoalList';

const PersonalGoals = ({ studyPk }) => {
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
                <NotStarted studyPk={studyPk} />
                <InProgress studyPk={studyPk} />
                <Completed studyPk={studyPk} />
            </div>
            <GoalList studyPk={studyPk} />
        </div>
    );
};

export default PersonalGoals;
