import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';
import API from '../../../api/AxiosInstance';
import moment from 'moment';

const EditScheduleModal = ({ show, handleClose, event, updateEvent, deleteEvent, studyPk }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (show && event) {
            setStartDate(moment(event.startDate).format('YYYY-MM-DD'));
            setEndDate(moment(event.endDate).format('YYYY-MM-DD'));
            setContent(event.content);
        }
    }, [show, event]);

    const handleUpdate = async () => {
        try {
            const updatedEvent = {
                calendarPk: event.calendarPk,
                content: content,
                startDate: startDate,
                endDate: endDate,
            };
            await API.put(`/study/${studyPk}/calendar`, updatedEvent);
            handleClose();
            updateEvent();
        } catch (error) {
            console.error('Failed to update event:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/study/${studyPk}/calendar/${event.calendarPk}`);
            handleClose();
            deleteEvent();
        } catch (error) {
            console.error('Failed to delete event:', error);
        }
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
                    <Button variant="success" onClick={handleUpdate}>
                        수정
                    </Button>
                </div>
            }
        >
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
        </UniversalModal>
    );
};

export default EditScheduleModal;
