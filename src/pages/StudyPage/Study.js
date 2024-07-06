import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Tab, Tabs, Card, Container } from 'react-bootstrap';
import Dashboard from './Dashboard/Dashboard';
import Schedule from './Schedule/Schedule';
import ProblemSolving from './ProblemSolving/ProblemSolving';
import './Study.css';
import PersonalGoals from './PersonalGoals/PersonalGoals';
import Announcements from './Announcements/Announcements';
import Management from './Management/Management';
import Timer from './Timer';
import API from '../../api/AxiosInstance';
import { useHeaderStudyName } from '../../components/StudyNameContext';

const Study = () => {
    const { studyPk } = useParams();
    const [activeTab, setActiveTab] = useState('dashboard');
    const { setHeaderStudyName } = useHeaderStudyName();

    useEffect(() => {
        console.log('studyPk:', studyPk);
        const fetchStudyInfo = async () => {
            try {
                const response = await API.get(`/study/${studyPk}`);
                if (response.data) {
                    setHeaderStudyName(response.data.studyName);
                    console.log('Fetched study name:', response.data.studyName);
                }
            } catch (error) {
                console.error('Failed to fetch study info:', error);
                setHeaderStudyName('스터디 정보를 불러오지 못했습니다.');
            }
        };

        fetchStudyInfo();
    }, [studyPk, setHeaderStudyName]);

    return (
        <div className="study-page">
            <div className="study-body">
                <Container>
                    <Tabs defaultActiveKey="dashboard" id="study-tabs" className="study-tabs">
                        <Tab eventKey="dashboard" title="대시보드">
                            <Card className="tab-card">
                                <Card.Body>
                                    <Dashboard studyPK={studyPk} />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="schedule" title="스터디 일정">
                            <Card className="tab-card">
                                <Card.Body>
                                    <Schedule studyPK={studyPk} />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="problems" title="문제 풀이">
                            <Card className="tab-card">
                                <Card.Body>
                                    <ProblemSolving studyPK={studyPk} />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="personalGoals" title="개인 목표">
                            <Card className="tab-card">
                                <Card.Body>
                                    <PersonalGoals studyPK={studyPk} />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="announcements" title="공지사항">
                            <Card className="tab-card">
                                <Card.Body>
                                    <Announcements studyPK={studyPk} />
                                </Card.Body>
                            </Card>
                        </Tab>
                        <Tab eventKey="management" title="스터디 관리">
                            <Card className="tab-card">
                                <Card.Body>
                                    <Management studyPk={studyPk} />
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
