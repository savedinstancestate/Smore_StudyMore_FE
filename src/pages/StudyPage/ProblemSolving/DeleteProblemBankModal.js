import React from 'react';
import { Button } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';

const DeleteProblemBankModal = ({ show, handleClose, handleDelete }) => {
    return (
        <UniversalModal show={show} handleClose={handleClose} title="삭제 확인" backdrop="static">
            <p>정말로 이 문제은행을 삭제하시겠습니까?</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="secondary" onClick={handleClose}>
                    취소
                </Button>
                <Button variant="danger" onClick={handleDelete} className="mr-2">
                    확인
                </Button>
            </div>
        </UniversalModal>
    );
};

export default DeleteProblemBankModal;
