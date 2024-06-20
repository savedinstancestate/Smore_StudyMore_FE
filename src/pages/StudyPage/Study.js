import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Card, Container } from 'react-bootstrap';
import Dashboard from './Dashboard/Dashboard';
import Schedule from './Schedule/Schedule';
import ProblemSolving from './ProblemSolving/ProblemSolving';
import './Study.css';
import PersonalGoals from './PersonalGoals/PersonalGoals';
import Announcements from './Announcements/Announcements';
import Timer from './Timer';
import axios from 'axios';

const Study = ({ studyPK }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [studyName, setStudyName] = useState('');

    useEffect(() => {
        const fetchStudyInfo = async () => {
            try {
                const response = await axios.get(`/study/${studyPK}`);
                if (response.data) {
                    setStudyName(response.data.studyName); // 응답에서 스터디 이름 설정
                }
            } catch (error) {
                console.error('Failed to fetch study info:', error);
                setStudyName('스터디 정보를 불러오지 못했습니다.'); // 오류 처리
            }
        };

        fetchStudyInfo();
    }, [studyPK]);

    return (
        <div className="study-page">
            <div className="study-name-banner">
                <h2>{studyName || '스터디 이름을 불러오는 중...'}</h2>
            </div>
            <div className="study-body">
                <Container>
                    <Tabs defaultActiveKey="dashboard" id="study-tabs" className="study-tabs">
                        <Tab eventKey="dashboard" title="대시보드">
                            <Card className="tab-card">
                                <Card.Body>
                                    <Dashboard />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="schedule" title="스터디 일정">
                            <Card className="tab-card">
                                <Card.Body>
                                    <Schedule />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="problems" title="문제 풀이">
                            <Card className="tab-card">
                                <Card.Body>
                                    <ProblemSolving />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="personalGoals" title="개인 목표">
                            <Card className="tab-card">
                                <Card.Body>
                                    <PersonalGoals />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="announcements" title="공지사항">
                            <Card className="tab-card">
                                <Card.Body>
                                    <Announcements studyPK={studyPK} />
                                </Card.Body>
                            </Card>
                        </Tab>
                    </Tabs>
                </Container>
                <div className="timer-container">
                    <Timer />
                </div>
            </div>
        </div>
    );
};

export default Study;
