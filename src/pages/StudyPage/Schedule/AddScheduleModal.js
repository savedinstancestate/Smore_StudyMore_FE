import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';
import API from '../../../api/AxiosInstance';
import moment from 'moment';

const AddScheduleModal = ({ show, handleClose, addEvent, studyPk }) => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (!show) {
            setStartDate('');
            setEndDate('');
            setContent('');
        }
    }, [show]);

    const handleSave = async () => {
        try {
            const postData = {
                content: content,
                startDate: moment(startDate).format('YYYY-MM-DD'),
                endDate: moment(endDate).format('YYYY-MM-DD'),
            };
            await API.post(`/study/${studyPk}/calendar`, postData);
            handleClose();
            addEvent(); // Trigger to refresh events
        } catch (error) {
            console.error('Error adding event:', error);
        }
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
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="일정 내용을 입력하세요"
                    />
                </Form.Group>
            </Form>
        </UniversalModal>
    );
};

export default AddScheduleModal;
