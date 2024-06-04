import React from 'react';
import { Modal } from 'react-bootstrap';

const UniversalModal = ({ title, show, handleClose, children, footer }) => {
    return (
        <Modal show={show} onHide={handleClose} centered="true" scrollable="true">
            <Modal.Header style={{ backgroundColor: '#F2F9F7', borderBottom: 'none', textAlign: 'center' }}>
                <Modal.Title style={{ width: '100%' }}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ borderBottom: 'none', borderTop: 'none' }}>{children}</Modal.Body>
            {footer && <Modal.Footer style={{ borderTop: 'none' }}>{footer}</Modal.Footer>}
        </Modal>
    );
};

export default UniversalModal;
