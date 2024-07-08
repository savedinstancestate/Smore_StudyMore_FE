import React, { useState, useEffect } from 'react';
import API from '../../../api/AxiosInstance';
import { Form, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import './Management.css';

const EditStudyInfo = ({ studyPk }) => {
    const [formData, setFormData] = useState({
        description: '',
        attendees: '',
        imageUri: '',
    });
    const [endDate, setEndDate] = useState(new Date());
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const fetchStudyData = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/management`);
                const data = response.data;
                setFormData({
                    description: data.content,
                    attendees: data.maxPeople.toString(),
                });
                setEndDate(new Date(data.closeDate));
            } catch (error) {
                setError('스터디 정보를 불러오는 데 실패했습니다.');
            }
        };

        fetchStudyData();
    }, [studyPk]);

    const handleChange = (e) => {
        const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            content: formData.description,
            maxPeople: parseInt(formData.attendees),
            closeDate: moment(endDate).format('YYYY-MM-DD'),
        };

        try {
            await API.put(`/study/${studyPk}/management`, payload);
            setSuccessMessage('정보가 수정되었습니다.');
        } catch (error) {
            console.error('Failed to update study info:', error);
            setError('정보 수정에 실패했습니다.');
        }
    };

    return (
        <div className="container">
            <div className="header-container">
            <div className="title">스터디 정보 수정 ℹ️</div> 
            {error && <div className="alert alert-danger">{error}</div>}
              {successMessage && <div className="alert alert-primary">{successMessage}</div>}
            <Button
            type="submit" className="button"
            style={{backgroundColor: '#fff',
            border: '1px solid #009063',
            color: '#009063',
            fontWeight: '500',
            width: '80px',
            float: 'right',
            marginRight: '6px',
            }}
            onClick={handleSubmit}
            >저장</Button>
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="form-group">
                    <Form.Label className="label">스터디 소개</Form.Label>
                    <Form.Control
                        type="input"
                        className="input-description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="스터디 소개를 입력하세요."
                    />
                </Form.Group>
                <Form.Group className="form-group-inline">
                    <Form.Label className="form-label-inline">최대 인원</Form.Label>
                    <Form.Select className="input" name="attendees" value={formData.attendees} onChange={handleChange}>
                        {[2, 3, 4, 5, 6].map(num => (
                            <option key={num} value={num}>{num}</option>
                        ))}
                    </Form.Select>
                </Form.Group>
                <Form.Group className="form-group-inline">
                    <Form.Label className="form-label-inline">종료 날짜</Form.Label>
                    <Button className="input" variant="outline-secondary" onClick={() => setShowEndDatePicker(!showEndDatePicker)}>
                        {moment(endDate).format('YYYY-MM-DD')}
                    </Button>
                    {showEndDatePicker && (
                        <Calendar
                            className="calendar"
                            value={endDate}
                            onChange={(date) => { setEndDate(date); setShowEndDatePicker(false); }}
                            formatDay={(locale, date) => moment(date).format('D')}
                        />
                    )}
                </Form.Group>
                <Form.Group className="form-group">
                </Form.Group>
                
            </Form>
        </div>
    );
    
};

export default EditStudyInfo;
