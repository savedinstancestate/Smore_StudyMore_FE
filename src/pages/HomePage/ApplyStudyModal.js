import React, { useState } from 'react';
import UniversalModal from '../../components/Modal';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ApplyStudyModal = ({ studyName, show, handleClose }) => {
    const [introduction, setIntroduction] = useState('');
    const [modalShow, setModalShow] = useState(false);

    const handleIntroductionChange = (event) => {
        setIntroduction(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/study/{studyPk}/enter', {
                memberPk: 1,
                content: introduction,
            });
            console.log('Server Response:', response.data);
            resetForm();
            closeModal();
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('신청 처리 중 오류가 발생했습니다.');
        }
    };

    const openModal = () => {
        setModalShow(true);
    };

    const closeModal = () => {
        setModalShow(false);
        resetForm();
    };

    const resetForm = () => {
        setIntroduction('');
    };

    const modalContent = (
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>신청 스터디: {studyName}</Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label>나를 소개하기</Form.Label>
                <Form.Control
                    as="textarea"
                    rows="3"
                    placeholder="자신을 짧게 소개해 주세요."
                    value={introduction}
                    onChange={handleIntroductionChange}
                />
            </Form.Group>
            <Modal.Footer
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderTop: 'none',
                    width: '100%',
                    padding: 0,
                }}
            >
                <Button
                    variant="secondary"
                    onClick={closeModal}
                    style={{ backgroundColor: '#F5EBE9', color: 'black', border: 'none' }}
                >
                    취소
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    style={{ backgroundColor: '#FEE8D8', color: 'black', border: 'none' }}
                >
                    신청하기
                </Button>
            </Modal.Footer>
        </Form>
    );

    return (
        <>
            <Button
                variant="primary"
                onClick={openModal}
                style={{ backgroundColor: '#FEE8D8', color: 'black', border: 'none' }}
            >
                신청하기
            </Button>

            <UniversalModal title="참여 신청서" show={modalShow} handleClose={closeModal} children={modalContent} />
        </>
    );
};

export default ApplyStudyModal;
