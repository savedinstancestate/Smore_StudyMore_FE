import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';

const EditScheduleModal = ({ show, handleClose, event, updateEvent, deleteEvent }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (event) {
            setStartDate(event.startDate);
            setEndDate(event.endDate);
            setTitle(event.title);
        }
    }, [event]);

    useEffect(() => {
        if (!show) {
            setStartDate('');
            setEndDate('');
            setTitle('');
        }
    }, [show]);

    const handleUpdate = () => {
        updateEvent({ ...event, startDate, endDate, title });
        handleClose();
    };

    const handleDelete = () => {
        deleteEvent(event);
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
                    <Button variant="success" onClick={handleUpdate}>
                        수정
                    </Button>
                </div>
            }
        >
            <Form>
                <Form.Group style={{ marginBottom: '10px' }}>
                    <Form.Label>시작</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="시작일을 선택하세요"
                    />
                </Form.Group>
                <Form.Group style={{ marginBottom: '10px' }}>
                    <Form.Label>종료</Form.Label>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="종료일을 선택하세요"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>내용</Form.Label>
                    <Form.Control
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="일정 내용을 입력하세요"
                    />
                </Form.Group>
            </Form>
        </UniversalModal>
    );
};

export default EditScheduleModal;
