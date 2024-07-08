import React, { useState, useEffect } from 'react';
import { Card, Button, Alert } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';
import API from '../../../api/AxiosInstance';
import EditAnnouncementModal from './EditAnnouncementModal';
import AddAnnouncementModal from './AddAnnouncementModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import './Announcements.css';
import { FaPlus } from 'react-icons/fa';
import { format, parseISO } from 'date-fns';

const Announcements = ({ studyPk }) => {
    const [announcements, setAnnouncements] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/notice`);
                setAnnouncements(response.data);
                setError(null);
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setError('공지사항을 불러오는 데 실패했습니다.');
            }
        };

        fetchAnnouncements();
    }, [studyPk]);

    const openModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const openEditModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    const openDeleteModal = (announcement) => {
        setSelectedAnnouncement(announcement);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const openAddModal = () => {
        setShowAddModal(true);
    };

    const closeAddModal = () => {
        setShowAddModal(false);
    };

    const handleDelete = async () => {
        try {
            await API.delete(`/study/${studyPk}/notice/${selectedAnnouncement.noticeBoardPk}`);
            setAnnouncements((prev) => prev.filter((a) => a.noticeBoardPk !== selectedAnnouncement.noticeBoardPk));
            closeDeleteModal();
        } catch (error) {
            console.error('Error deleting announcement:', error);
            setError('공지사항을 삭제하는 데 실패했습니다.');
        }
    };

    const updateAnnouncements = (updatedAnnouncement) => {
        setAnnouncements((prev) =>
            prev.map((a) => (a.noticeBoardPk === updatedAnnouncement.noticeBoardPk ? updatedAnnouncement : a))
        );
    };

    const addAnnouncement = (newAnnouncement) => {
        setAnnouncements((prev) => [...prev, newAnnouncement]);
    };

    const modalContent = (
        <>
            <p>{selectedAnnouncement?.noticeContent}</p>
            <p className="text-muted">{format(parseISO(selectedAnnouncement?.time), 'yyyy-MM-dd HH:mm:ss')}</p>
        </>
    );

    const modalFooter = (
        <Button variant="secondary" onClick={closeModal}>
            닫기
        </Button>
    );

    const deleteModalContent = (
        <>
            <p>정말로 이 공지사항을 삭제하시겠습니까?</p>
        </>
    );

    const deleteModalFooter = (
        <>
            <Button variant="secondary" onClick={closeDeleteModal}>
                취소
            </Button>
            <Button variant="danger" onClick={handleDelete}>
                삭제
            </Button>
        </>
    );

    return (
        <div style={{ padding: '10px' }}>
            {error && <Alert variant="danger">{error}</Alert>}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h3>공지사항</h3>
                <Button
                    variant="success"
                    onClick={openAddModal}
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
            </div>
            <div className="announcement-container">
                {announcements.map((announcement) => (
                    <Card key={announcement.noticeBoardPk} className="mb-3">
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div onClick={() => openModal(announcement)} style={{ cursor: 'pointer' }}>
                                    <Card.Title>{announcement.noticeTitle}</Card.Title>
                                    <Card.Text
                                        style={{
                                            display: '-webkit-box',
                                            WebkitBoxOrient: 'vertical',
                                            WebkitLineClamp: 3,
                                            overflow: 'hidden',
                                        }}
                                    >
                                        {announcement.noticeContent}
                                    </Card.Text>
                                    <Card.Subtitle className="mb-2 text-muted">
                                        {format(parseISO(announcement.time), 'yyyy-MM-dd HH:mm:ss')}
                                    </Card.Subtitle>
                                </div>
                                <div className="d-flex align-items-start">
                                    <Button
                                        variant="link"
                                        onClick={() => openEditModal(announcement)}
                                        style={{
                                            textDecoration: 'none',
                                            padding: '0 5px',
                                            color: '#919191',
                                            marginRight: '10px',
                                        }}
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </Button>
                                    <Button
                                        variant="link"
                                        onClick={() => openDeleteModal(announcement)}
                                        style={{ textDecoration: 'none', padding: '0 5px', color: '#919191' }}
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </Button>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
                {selectedAnnouncement && (
                    <UniversalModal
                        title={selectedAnnouncement.noticeTitle}
                        show={showModal}
                        handleClose={closeModal}
                        children={modalContent}
                        footer={modalFooter}
                    />
                )}
                {selectedAnnouncement && (
                    <EditAnnouncementModal
                        show={showEditModal}
                        handleClose={closeEditModal}
                        announcement={selectedAnnouncement}
                        studyPk={studyPk}
                        updateAnnouncements={updateAnnouncements}
                    />
                )}
                {showDeleteModal && (
                    <UniversalModal
                        title="공지사항 삭제"
                        show={showDeleteModal}
                        handleClose={closeDeleteModal}
                        children={deleteModalContent}
                        footer={deleteModalFooter}
                    />
                )}
                <AddAnnouncementModal
                    show={showAddModal}
                    handleClose={closeAddModal}
                    studyPk={studyPk}
                    onAddAnnouncement={addAnnouncement}
                />
            </div>
        </div>
    );
};

export default Announcements;
