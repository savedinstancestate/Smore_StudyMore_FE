import React, { useState, useEffect } from 'react';
import UniversalModal from '../../../components/Modal';
import { Button, Form } from 'react-bootstrap';
import API from '../../../api/AxiosInstance';

const EditGoalModal = ({ show, handleClose, goal, studyPk, updateGoal }) => {
    const [goalStatus, setGoalStatus] = useState('');
    const [goalContent, setGoalContent] = useState('');

    useEffect(() => {
        if (show) {
            setGoalStatus(goal.scheduleStatus);
            setGoalContent(goal.scheduleContent);
        }
    }, [show, goal]);

    const handleSave = async () => {
        try {
            const response = await API.put(`/study/${studyPk}/todo/${goal.personalTodoPk}`, {
                scheduleStatus: goalStatus,
                scheduleContent: goalContent,
            });
            updateGoal(response.data);
            handleClose();
        } catch (error) {
            console.error('목표를 수정하는 데 실패했습니다:', error);
        }
    };

    const formContent = (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>진행 상태:</Form.Label>
                    <div style={{ display: 'flex', justifyContent: 'spaceAround', gap: '20px' }}>
                        <Button
                            variant={goalStatus === '진행 전' ? 'success' : 'light'}
                            onClick={() => setGoalStatus('진행 전')}
                        >
                            진행 전
                        </Button>
                        <Button
                            variant={goalStatus === '진행 중' ? 'success' : 'light'}
                            onClick={() => setGoalStatus('진행 중')}
                        >
                            진행 중
                        </Button>
                        <Button
                            variant={goalStatus === '완료' ? 'success' : 'light'}
                            onClick={() => setGoalStatus('완료')}
                        >
                            완료
                        </Button>
                    </div>
                </Form.Group>
                <Form.Group controlId="goalContent" style={{ marginTop: '30px' }}>
                    <Form.Label>목표 내용:</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={goalContent}
                        onChange={(e) => setGoalContent(e.target.value)}
                        placeholder="목표를 입력하세요"
                    />
                </Form.Group>
            </Form>
        </>
    );

    const modalFooter = (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="secondary" onClick={handleClose}>
                취소
            </Button>
            <Button variant="success" onClick={handleSave}>
                완료
            </Button>
        </div>
    );

    return (
        <UniversalModal
            title="개인목표 수정하기"
            show={show}
            handleClose={handleClose}
            children={formContent}
            footer={modalFooter}
        />
    );
};

export default EditGoalModal;
