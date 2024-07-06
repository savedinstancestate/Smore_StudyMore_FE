import React, { useState } from 'react';
import UniversalModal from '../../../components/Modal';
import { Button, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';
import API from '../../../api/AxiosInstance';

const AddGoalModal = ({ studyPk, addGoal }) => {
    const [show, setShow] = useState(false);
    const [goalStatus, setGoalStatus] = useState('진행 전');
    const [goalContent, setGoalContent] = useState('');

    const handleSave = async () => {
        if (goalContent && goalStatus) {
            const newGoal = {
                scheduleStatus: goalStatus,
                scheduleContent: goalContent,
            };

            try {
                const response = await API.post(`/study/${studyPk}/todo`, newGoal);
                addGoal(response.data);
                handleClose();
            } catch (error) {
                console.error('목표를 추가하는 데 실패했습니다:', error);
            }
        }
    };

    const resetForm = () => {
        setGoalContent('');
        setGoalStatus('진행 전');
    };

    const handleClose = () => {
        setShow(false);
        resetForm();
    };

    const getStatusButtonVariant = (status) => {
        return goalStatus === status ? 'success' : 'light';
    };

    const formContent = (
        <>
            <Form>
                <Form.Group>
                    <Form.Label>진행 상태:</Form.Label>
                    <div style={{ display: 'flex', justifyContent: 'spaceAround', gap: '20px' }}>
                        <Button variant={getStatusButtonVariant('진행 전')} onClick={() => setGoalStatus('진행 전')}>
                            진행 전
                        </Button>
                        <Button variant={getStatusButtonVariant('진행 중')} onClick={() => setGoalStatus('진행 중')}>
                            진행 중
                        </Button>
                        <Button variant={getStatusButtonVariant('완료')} onClick={() => setGoalStatus('완료')}>
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
            <Button variant="success" onClick={handleSave} disabled={!goalContent || !goalStatus}>
                확인
            </Button>
        </div>
    );

    return (
        <>
            <Button
                variant="success"
                onClick={() => setShow(true)}
                style={{
                    borderRadius: '20%',
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <FaPlus style={{ color: 'white' }} />
            </Button>
            <UniversalModal
                title="개인목표 생성하기"
                show={show}
                handleClose={handleClose}
                children={formContent}
                footer={modalFooter}
            />
        </>
    );
};

export default AddGoalModal;
