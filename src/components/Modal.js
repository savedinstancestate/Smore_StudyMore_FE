import React from 'react';
import { Modal } from 'react-bootstrap';

const UniversalModal = ({ title, show, handleClose, children, footer }) => {
    return (
        <Modal show={show} onHide={handleClose} style={{ zIndex:1000000000000 }}centered scrollable>
            <Modal.Header style={{ backgroundColor: '#fff', marginTop: '4px', padding: '12px', borderBottom: 'none', textAlign: 'center' }}>
                <Modal.Title style={{ width: '100%', color: '#ea8400', fontWeight: '700' }}>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ borderBottom: 'none', borderTop: 'none' }}>{children}</Modal.Body>
            {footer && <Modal.Footer style={{ borderTop: 'none' }}>{footer}</Modal.Footer>}
        </Modal>
    );
};

export default UniversalModal;
