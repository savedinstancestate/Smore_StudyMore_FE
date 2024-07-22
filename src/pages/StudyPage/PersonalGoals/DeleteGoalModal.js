import React from 'react';
import { Button } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';

const DeleteGoalModal = ({ show, handleClose, handleDelete }) => {
    const modalContent = <p>정말로 이 목표를 삭제하시겠습니까?</p>;

    const modalFooter = (
        <>
            <Button variant="secondary" onClick={handleClose}>
                취소
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                확인
            </Button>
        </>
    );

    return (
        <UniversalModal
            title="목표 삭제"
            show={show}
            handleClose={handleClose}
            children={modalContent}
            footer={modalFooter}
        />
    );
};

export default DeleteGoalModal;
