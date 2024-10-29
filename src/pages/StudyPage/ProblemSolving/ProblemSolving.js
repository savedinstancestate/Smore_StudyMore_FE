import React from 'react';
import MyProblems from './MyProblems';

const ProblemSolving = ({ studyPk }) => {
    return (
        <div>
            <MyProblems studyPk={studyPk} />
        </div>
    );
};

export default ProblemSolving;
