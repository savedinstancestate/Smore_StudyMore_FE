import React, { useState } from 'react';
import UniversalModal from '../../components/Modal';
import { Form, Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const ApplyStudyModal = ({ studyName, studyPk, show, handleClose, toggleOverlay }) => {
    const [introduction, setIntroduction] = useState('');
    const [modalShow, setModalShow] = useState(false); // 첫 번째 모달 어둡기 설정

    const handleIntroductionChange = (event) => {
        setIntroduction(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(`/study/${studyPk}/enter`, {
                // memberPk: 1,
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
        toggleOverlay(true);  // 첫 번째 모달을 어둡게 만듭니다.
    };

    const closeModal = () => {
        setModalShow(false);
        resetForm();
        toggleOverlay(false);  // 첫 번째 모달 어둠 해제
    };

    const resetForm = () => {
        setIntroduction('');
    };

    const modalContent = (
        <div style={{marginLeft: '22px', width: '90%'}}>
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label style={{fontWeight: '700', color: '#009063'}}>스터디명
                <span style={{color: 'black', marginLeft: '6px'}}>{studyName}</span></Form.Label>
            </Form.Group>
            <Form.Group>
                <Form.Label style={{fontWeight: '700', color: '#009063'}}>나를 소개하기</Form.Label>
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
                    justifyContent: 'flex-end',
                    borderTop: 'none',
                    width: '100%',
                    padding: 0,
                }}
            >
                <Button
                    variant="secondary"
                    onClick={closeModal}
                    style={{ backgroundColor: '#fff', color: '#009063', border: '1px solid #009063' }}
                >
                    취소
                </Button>
                <Button
                    variant="primary"
                    type="submit"
                    style={{ backgroundColor: '#009063', color: '#fff', border: 'none' }}
                >
                    신청하기
                </Button>
            </Modal.Footer>
        </Form>
        </div>
    );

    return (
        <>
            <Button
                variant="primary"
                onClick={openModal}
                style={{ backgroundColor: '#009063', color: 'black', border: 'none', width: '60%', padding: '14px', border: 'none', borderRadius: '8px', backgroundColor: '#009063', color: '#fff', fontWeight: '600', marginBottom: '30px' }}
            >
                스터디 지원하기
            </Button>

            <UniversalModal title="스터디 지원하기" show={modalShow} handleClose={closeModal} children={modalContent} />
        </>
    );
};

export default ApplyStudyModal;
