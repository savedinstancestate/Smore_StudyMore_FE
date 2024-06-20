import React, { useState } from 'react';
import UniversalModal from '../../../components/Modal';
import { Button, Form } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

const AddGoalModal = () => {
    const [show, setShow] = useState(false);
    const [goalStatus, setGoalStatus] = useState('NotStarted');
    const [goalContent, setGoalContent] = useState('');

    const handleSave = () => {
        console.log({ status: goalStatus, content: goalContent }); // 데이터 처리 예: 서버에 저장
        handleClose(); // 모달 닫기
        resetForm(); // 폼 초기화
    };

    const resetForm = () => {
        setGoalContent('');
        setGoalStatus('NotStarted');
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
                        <Button
                            variant={getStatusButtonVariant('NotStarted')}
                            onClick={() => setGoalStatus('NotStarted')}
                        >
                            진행 전
                        </Button>
                        <Button
                            variant={getStatusButtonVariant('InProgress')}
                            onClick={() => setGoalStatus('InProgress')}
                        >
                            진행 중
                        </Button>
                        <Button
                            variant={getStatusButtonVariant('Completed')}
                            onClick={() => setGoalStatus('Completed')}
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
