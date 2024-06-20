import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';

const AddScheduleModal = ({ show, handleClose, addEvent }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        if (!show) {
            setStartDate('');
            setEndDate('');
            setTitle('');
        }
    }, [show]);

    const handleSave = () => {
        addEvent({ startDate, endDate, title });
        handleClose();
    };

    return (
        <UniversalModal
            title="일정 추가"
            show={show}
            handleClose={handleClose}
            footer={
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="secondary" onClick={handleClose}>
                        취소
                    </Button>
                    <Button variant="success" onClick={handleSave}>
                        저장
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

export default AddScheduleModal;
