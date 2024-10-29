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
            addEvent();
        } catch (error) {
            console.error('Error adding event:', error);
        }
    };

    return (
        <UniversalModal
            title="일정 추가"
            show={show}
            handleClose={handleClose}
            backdrop="static"
            footer={
                <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: '#fff', color: '#929292', border: '1px solid #929292' }}>
                        취소
                    </Button>
                    <Button variant="success" onClick={handleSave} style={{ backgroundColor: '#ea8400', border: 'none' }}>
                        저장
                    </Button>
                </div>
            }
        >
            <Form>
                <Form.Group style={{ marginBottom: '12px' }}>
                    <Form.Label>시작</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder="시작일을 선택하세요"
                        style={{ fontSize: '15px' }}
                    />
                </Form.Group>
                <Form.Group style={{ marginBottom: '12px' }}>
                    <Form.Label>종료</Form.Label>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder="종료일을 선택하세요"
                        style={{ fontSize: '15px' }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label style={{ width:'100%', marginBottom: '4px' }}>내용</Form.Label>
                    <Form.Control
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="일정 내용을 입력하세요"
                        style={{ width:'100%', fontSize: '15px' }}
                    />
                </Form.Group>
            </Form>
        </UniversalModal>
    );
};

export default AddScheduleModal;
