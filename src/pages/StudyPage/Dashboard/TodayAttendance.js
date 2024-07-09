import React, { useState, useEffect } from 'react';
import { Alert, Card, Image } from 'react-bootstrap';
import API from '../../../api/AxiosInstance';

const TodayAttendance = ({ studyPk }) => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [membersData, setMembersData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTodayAttendance = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/dashboard/attendance/today`);
                setAttendanceData(response.data);
            } catch (error) {
                setError('출석 데이터를 불러오는 데 실패했습니다.');
                console.error(error);
            }
        };

        const fetchMembersData = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/dashboard/members`);
                setMembersData(response.data);
            } catch (error) {
                console.error('멤버 데이터를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchTodayAttendance();
        fetchMembersData();
    }, [studyPk]);

    const findMemberImage = (memberPk) => {
        const member = membersData.find((member) => member.memberPk === memberPk);
        return member?.profileImg || '/path/to/default/avatar.jpg'; // 기본 이미지 경로 제공
    };

    if (error) {
        return <Alert variant="danger">{error}</Alert>;
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
            {attendanceData.map((att) => (
                <Card key={att.memberPk} style={{ margin: '10px', width: '100px' }}>
                    <Card.Body>
                        <Card.Title style={{ fontSize: '20px' }}>{att.nickname}</Card.Title>
                        <Image src={findMemberImage(att.memberPk)} roundedCircle style={{ width: '50px' }} />
                        <Card.Text style={{ color: att.attendanceStatus === '출석' ? 'green' : 'red' }}>
                            {att.timeAgo}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </div>
    );
};

export default TodayAttendance;
