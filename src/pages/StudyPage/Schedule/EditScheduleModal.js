import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';
import API from '../../../api/AxiosInstance';
import moment from 'moment';

const EditScheduleModal = ({ show, handleClose, event, updateEvent, deleteEvent, studyPk }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEventDetails = async () => {
            if (event && event.calendarPk) {
                try {
                    const response = await API.get(`/study/${studyPk}/calendar/${event.calendarPk}`);
                    const eventData = response.data;
                    console.log('Fetched event data:', eventData);
                    setStartDate(moment(eventData.startDate).format('YYYY-MM-DD'));
                    setEndDate(moment(eventData.endDate).format('YYYY-MM-DD'));
                    setContent(eventData.content);
                } catch (error) {
                    console.error('일정 정보를 불러오는 데 실패했습니다:', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        if (show && event) {
            console.log('Event passed to modal:', event);
            setLoading(true);
            fetchEventDetails();
        }
    }, [show, event, studyPk]);

    useEffect(() => {
        if (!show) {
            setStartDate('');
            setEndDate('');
            setContent('');
            setLoading(true);
        }
    }, [show]);

    const handleUpdate = async () => {
        const updatedEvent = {
            calendarPk: event.calendarPk,
            content: content,
            startDate: startDate,
            endDate: endDate,
        };
        try {
            await API.put(`/study/${studyPk}/calendar/${event.calendarPk}`, updatedEvent);
            updateEvent(updatedEvent);
        } catch (error) {
            console.error('일정 수정에 실패했습니다:', error);
        }
        handleClose();
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/study/${studyPk}/calendar/${event.calendarPk}`);
            deleteEvent(event);
        } catch (error) {
            console.error('일정 삭제에 실패했습니다:', error);
        }
        handleClose();
    };

    return (
        <UniversalModal
            title="일정 수정"
            show={show}
            handleClose={handleClose}
            footer={
                <div>
                    <Button variant="danger" onClick={handleDelete} style={{ marginRight: '10px' }}>
                        삭제
                    </Button>
                    <Button variant="secondary" onClick={handleClose} style={{ marginRight: '10px' }}>
                        취소
                    </Button>
                    <Button variant="success" onClick={handleUpdate} disabled={loading}>
                        수정
                    </Button>
                </div>
            }
        >
            {loading ? (
                <div>로딩 중...</div>
            ) : (
                <Form>
                    <Form.Group style={{ marginBottom: '10px' }}>
                        <Form.Label>시작</Form.Label>
                        <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group style={{ marginBottom: '10px' }}>
                        <Form.Label>종료</Form.Label>
                        <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>내용</Form.Label>
                        <Form.Control type="text" value={content} onChange={(e) => setContent(e.target.value)} />
                    </Form.Group>
                </Form>
            )}
        </UniversalModal>
    );
};

export default EditScheduleModal;
