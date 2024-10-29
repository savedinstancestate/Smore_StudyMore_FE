import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import API from '../../../api/AxiosInstance';
import UniversalModal from '../../../components/Modal';

const EditAnnouncementModal = ({ show, handleClose, announcement, studyPk, updateAnnouncements }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (announcement) {
            setTitle(announcement.noticeTitle);
            setContent(announcement.noticeContent);
        }
    }, [announcement]);

    const handleSave = async () => {
        try {
            const response = await API.put(`/study/${studyPk}/notice/${announcement.noticeBoardPk}`, {
                noticeBoardPk: announcement.noticeBoardPk,
                noticeTitle: title,
                noticeContent: content,
            });
            updateAnnouncements(response.data);
            handleClose();
        } catch (error) {
            console.error('Error updating announcement:', error);
        }
    };

    return (
        <UniversalModal
            title="공지사항 수정"
            show={show}
            handleClose={handleClose}
            backdrop="static"
            footer={
                <>
                    <Button variant="secondary" onClick={handleClose} style={{ backgroundColor: '#fff', color: '#929292', border: '1px solid #929292' }}>
                        취소
                    </Button>
                    <Button onClick={handleSave} style={{ backgroundColor: '#ea8400', border: '1px solid #ea8400' }}>
                        수정
                    </Button>
                </>
            }
        >
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>제목</Form.Label>
                    <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formContent">
                    <Form.Label>내용</Form.Label>
                    <Form.Control as="textarea" rows={3} value={content} onChange={(e) => setContent(e.target.value)} />
                </Form.Group>
            </Form>
        </UniversalModal>
    );
};

export default EditAnnouncementModal;
