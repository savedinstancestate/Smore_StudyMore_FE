import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';
import axios from 'axios';

const Announcements = ({ studyPK }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await axios.get(`/study/${studyPK}/notice`);
                console.log(response.data);
                if (response.status === 200) {
                    setAnnouncements(
                        response.data.map((item) => ({
                            id: item.noticeBoardPk,
                            title: item.noticeTitle,
                            content: item.noticeContent,
                            date: item.time,
                        }))
                    );
                } else if (response.status === 404) {
                    setError(response.data.message);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setError('공지사항을 불러오는 데 실패했습니다.');
            }
        };

        fetchAnnouncements();
    }, []);

    const openModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const modalContent = (
        <>
            <p>{selectedAnnouncement?.content}</p>
            <p className="text-muted">{selectedAnnouncement?.date}</p>
        </>
    );

    const modalFooter = (
        <Button variant="secondary" onClick={closeModal}>
            닫기
        </Button>
    );

    return (
        <div style={{ padding: '20px' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            {announcements.map((announcement) => (
                <Card key={announcement.id} className="mb-3" onClick={() => openModal(announcement)}>
                    <Card.Body>
                        <Card.Title>{announcement.title}</Card.Title>
                        <Card.Text
                            style={{
                                display: '-webkit-box',
                                WebkitBoxOrient: 'vertical',
                                WebkitLineClamp: 3,
                                overflow: 'hidden',
                            }}
                        >
                            {announcement.content}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">{announcement.date}</Card.Subtitle>
                    </Card.Body>
                </Card>
            ))}
            {selectedAnnouncement && (
                <UniversalModal
                    title={selectedAnnouncement.title}
                    show={showModal}
                    handleClose={closeModal}
                    children={modalContent}
                    footer={modalFooter}
                />
            )}
        </div>
    );
};

export default Announcements;
