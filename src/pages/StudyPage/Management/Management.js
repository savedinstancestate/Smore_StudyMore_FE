import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditStudyInfo from './EditStudyInfo';
import Promotion from './Promotion';

const Management = () => {
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
                <EditStudyInfo />
            </div>

        </div>
    );
};

export default Management;