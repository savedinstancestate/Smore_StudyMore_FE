import React, { useState, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';
import API from '../../../api/AxiosInstance';

const AddAnnouncementModal = ({ show, handleClose, studyPk, onAddAnnouncement }) => {
    const [newAnnouncement, setNewAnnouncement] = useState({ title: '', content: '' });
    const [error, setError] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const { title, content } = newAnnouncement;
        setIsFormValid(title.trim() !== '' && content.trim() !== '');
    }, [newAnnouncement]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewAnnouncement((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddAnnouncement = async () => {
        try {
            const response = await API.post(`/study/${studyPk}/notice`, {
                noticeTitle: newAnnouncement.title,
                noticeContent: newAnnouncement.content,
            });

            if (response.status === 200) {
                onAddAnnouncement({
                    noticeBoardPk: response.data.noticeBoardPk,
                    noticeTitle: response.data.noticeTitle,
                    noticeContent: response.data.noticeContent,
                    time: new Date(response.data.time).toLocaleString(),
                });
                handleClose();
            }
        } catch (error) {
            console.error('공지사항 추가에 실패했습니다:', error);
            if (error.response && error.response.status === 400) {
                setError('제목은 공백 포함 1자 이상 30자 이하로 해주세요.');
            } else if (error.response && error.response.status === 401) {
                setError('공지사항은 스터디장만 생성, 수정, 삭제 할 수 있습니다.');
            } else {
                setError('공지사항 추가에 실패했습니다.');
            }
        }
    };

    const addModalContent = (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group controlId="announcementTitle">
                <Form.Label>공지 제목</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={newAnnouncement.title}
                    onChange={handleChange}
                    placeholder="공지 제목을 입력하세요"
                />
            </Form.Group>
            <Form.Group controlId="announcementContent">
                <Form.Label>공지 내용</Form.Label>
                <Form.Control
                    as="textarea"
                    name="content"
                    value={newAnnouncement.content}
                    onChange={handleChange}
                    rows={3}
                    placeholder="공지 내용을 입력하세요"
                />
            </Form.Group>
        </>
    );

    const addModalFooter = (
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button variant="secondary" onClick={handleClose}>
                취소
            </Button>
            <Button variant="success" onClick={handleAddAnnouncement} disabled={!isFormValid}>
                완료
            </Button>
        </div>
    );

    return (
        <UniversalModal
            title="공지사항 추가"
            show={show}
            handleClose={handleClose}
            children={addModalContent}
            footer={addModalFooter}
        />
    );
};

export default AddAnnouncementModal;
