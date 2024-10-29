import React, { useState, useEffect } from 'react';
import { format, addDays, startOfMonth, endOfMonth } from 'date-fns';
import { Button, Form } from 'react-bootstrap';
import './AttendanceChart.css';
import API from '../../../api/AxiosInstance';
import TodayAttendance from './TodayAttendance';

const AttendanceChart = ({ studyPk }) => {
    const [attendanceData, setAttendanceData] = useState({});
    const [members, setMembers] = useState([]);

    useEffect(() => {
        const fetchAttendanceData = async () => {
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1; // 현재 월 (1-12)

            try {
                const response = await API.get(`/study/${studyPk}/dashboard/attendance/monthly`, {
                    params: { year: year, month: month },
                });
                setAttendanceData(response.data);
            } catch (error) {
                console.error('출석 데이터를 불러오는 데 실패했습니다:', error);
            }
        };

        const fetchMembers = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/dashboard/members`);
                setMembers(response.data);
            } catch (error) {
                console.error('멤버 데이터를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchAttendanceData();
        fetchMembers();
    }, [studyPk]);

    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth(); // 현재 월 (0-11)
    const start = startOfMonth(new Date(year, month, 1)); // 현재 월 시작
    const end = endOfMonth(new Date(year, month, 1)); // 현재 월 종료
    const daysInMonth = [];
    for (let day = start; day <= end; day = addDays(day, 1)) {
        daysInMonth.push(format(day, 'yyyy-MM-dd'));
    }

    return (
        <div>
            <div className="attendance-chart">
                <div className="attendance-chart-header">출석 현황 🗓️</div>
                <div className="header-row">
                    <div className="cell month-cell">{format(start, 'M월')}</div>
                    {daysInMonth.map((date) => (
                        <div key={date} className="cell">
                            {format(new Date(date), 'd')}
                        </div>
                    ))}
                </div>
                {members.map((member) => (
                    <div key={member.memberPk} className="data-row">
                        <div className="cell name-cell">{member.nickName}</div>
                        {daysInMonth.map((date) => {
                            const day = new Date(date).getDate().toString();
                            const status =
                                (attendanceData[day] || [])
                                    .find((att) => att.memberPk === member.memberPk)
                                    ?.attendanceStatus.replace(/\s+/g, '') || '결석';
                            return <div key={date} className={`cell status-cell ${status}`} title={status} />;
                        })}
                    </div>
                ))}

                <TodayAttendance studyPk={studyPk} />
            </div>
        </div>
    );
};

export default AttendanceChart;
