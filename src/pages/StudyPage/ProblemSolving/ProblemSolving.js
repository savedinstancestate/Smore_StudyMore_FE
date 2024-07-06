import React from 'react';
import MyProblems from './MyProblems';
import StudyProblemList from './StudyProblemList';

const ProblemSolving = ({ studyPk }) => {
    return (
        <div>
            <MyProblems studyPk={studyPk} />
            <StudyProblemList studyPk={studyPk} />
        </div>
    );
};

export default ProblemSolving;
