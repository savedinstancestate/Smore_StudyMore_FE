import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import API from '../../api/AxiosInstance';
import './Timer.css';
import { FaPlay, FaPause } from 'react-icons/fa';
import { SlArrowRight } from 'react-icons/sl';

const Timer = ({ studyPk }) => {
    const [isRunning, setIsRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const fetchRecordedTime = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/attendance/my-study-time`);
                if (response.status === 200) {
                    const recordedTime = response.data; // Long 값이 초 단위로 온다고 가정
                    setTimer(recordedTime);
                } else {
                    console.error('Failed to fetch recorded time');
                }
            } catch (error) {
                console.error('Error fetching recorded time:', error);
            }
        };

        fetchRecordedTime();
    }, [studyPk]);

    useEffect(() => {
        let interval = null;

        if (isRunning) {
            interval = setInterval(() => {
                setTimer((prevTime) => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const toggleTimer = async () => {
        if (!isRunning) {
            // 타이머 시작 시 서버에 요청 보내기
            try {
                const response = await API.post(`/study/${studyPk}/attendance/start`);
                if (response.status === 200) {
                    const data = response.data;
                    // 서버에서 받은 시간을 이용하여 타이머 설정 (필요 시)
                    console.log('Server time:', data);
                    setIsRunning(true);
                } else {
                    console.error('Failed to start timer');
                }
            } catch (error) {
                console.error('Error starting timer:', error);
            }
        } else {
            // 타이머 정지 시 서버에 요청 보내기
            try {
                const response = await API.post(`/study/${studyPk}/attendance/stop`);
                if (response.status === 200) {
                    const data = response.data;
                    console.log('Server stop response:', data); // 서버에서 받은 Long 값 처리
                    setIsRunning(false);
                } else {
                    console.error('Failed to stop timer');
                }
            } catch (error) {
                console.error('Error stopping timer:', error);
            }
        }
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const formatTime = () => {
        const seconds = timer % 60;
        const minutes = Math.floor(timer / 60) % 60;
        const hours = Math.floor(timer / 3600);
        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <>
            <Button
                className="FAB"
                variant="light"
                style={{
                    position: 'fixed',
                    top: '380px',
                    right: showPopup ? 'calc(270px + 20px)' : '25px', // Assumes the popup width is 200px, plus 10px space
                    boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.25)',
                    width: '40px',
                    height: '40px',
                }}
                onClick={togglePopup}
            >
                <SlArrowRight />
            </Button>
            {showPopup && (
                <div
                    className="popup"
                    style={{
                        position: 'fixed',
                        top: '280px',
                        right: '25px',
                        background: 'white',
                        padding: '20px',
                        borderRadius: '10px',
                        width: '250px',
                        height: '230px',
                        borderRadius: '20px',
                    }}
                >
                    <div className="timer-header">출석하기</div>
                    <div className="body-title">오늘 총 공부 시간</div>
                    <div className="body-timer">{formatTime()}</div>
                    <Button
                        onClick={toggleTimer}
                        variant="primary"
                        className="timer-button"
                        style={{ backgroundColor: '#ea8400', border: 'none' }}
                    >
                        {isRunning ? <FaPause /> : <FaPlay />}
                    </Button>
                </div>
            )}
        </>
    );
};

export default Timer;
