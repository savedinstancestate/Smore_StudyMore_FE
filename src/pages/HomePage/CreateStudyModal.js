import React, { useState } from 'react';
import API from '../../api/AxiosInstance';
import UniversalModal from '../../components/Modal';
import { Modal, Form, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';
import createImage from "./create.png";

const CreateStudyModal = () => {
    const [modalShow, setModalShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [thumbnail, setThumbnail] = useState(null);
    const initialFormData = { name: '', description: '', attendees: '' };
    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleStartDateChange = (date) => {
        const fixedDate = new Date(date.setHours(0, 0, 0, 0));
        setStartDate(fixedDate);
        setShowStartDatePicker(false);
    };

    const handleEndDateChange = (date) => {
        const fixedDate = new Date(date.setHours(0, 0, 0, 0));
        setEndDate(fixedDate);
        setShowEndDatePicker(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnail(e.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnail(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const studyCreateDTO = {
            studyName: formData.name,
            imageUri: selectedFile ? thumbnail : null,
            maxPeople: parseInt(formData.attendees),
            content: formData.description,
            startDate: moment(startDate).format('YYYY-MM-DD'),
            closeDate: moment(endDate).format('YYYY-MM-DD'),
        };

        const formDataToSend = new FormData();
        formDataToSend.append(
            'studyCreateDTO',
            new Blob([JSON.stringify(studyCreateDTO)], { type: 'application/json' })
        );
        if (selectedFile) {
            formDataToSend.append('image', selectedFile);
        }

        try {
            const response = await API.post('/study', formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            closeModal();
        } catch (error) {
            console.error(error);
        }
    };

    const closeModal = () => {
        setModalShow(false);
        resetInputs();
    };

    const resetInputs = () => {
        setFormData(initialFormData);
        setStartDate(new Date());
        setEndDate(new Date());
        setSelectedFile(null);
        setThumbnail(null);
    };

    const modalContent = (
        <Form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <Form.Group style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Form.Label style={{ marginRight: '10px', minWidth: '90px' }}>스터디 이름</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Form.Label style={{ marginRight: '10px', minWidth: '90px' }}>내용</Form.Label>
                <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Form.Label style={{ marginRight: '10px', minWidth: '90px' }}>인원</Form.Label>
                <Form.Select name="attendees" value={formData.attendees} onChange={handleChange} style={{ flex: '1' }}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </Form.Select>
            </Form.Group>
            <Form.Group style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Form.Label style={{ marginRight: '10px', minWidth: '90px' }}>기간</Form.Label>
                <div style={{ display: 'flex', alignItems: 'center', flex: '1' }}>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowStartDatePicker(!showStartDatePicker)}
                        style={{ flex: '1' }}
                    >
                        {moment(startDate).format('YYYY-MM-DD')}
                    </Button>
                    <span style={{ margin: '0 10px' }}>~</span>
                    <Button
                        variant="outline-secondary"
                        onClick={() => setShowEndDatePicker(!showEndDatePicker)}
                        style={{ flex: '1' }}
                    >
                        {moment(endDate).format('YYYY-MM-DD')}
                    </Button>
                    {showStartDatePicker && (
                        <Calendar
                            value={startDate}
                            onChange={handleStartDateChange}
                            className="date-picker"
                            formatDay={(locale, date) => moment(date).format('DD')}
                        />
                    )}
                    {showEndDatePicker && (
                        <Calendar
                            value={endDate}
                            onChange={handleEndDateChange}
                            className="date-picker"
                            formatDay={(locale, date) => moment(date).format('DD')}
                        />
                    )}
                </div>
            </Form.Group>
            <Form.Group style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <Form.Label style={{ marginRight: '10px', minWidth: '90px' }}>대표사진</Form.Label>
                <Form.Control
                    type="file"
                    id="custom-file"
                    label={selectedFile ? selectedFile.name : '파일을 선택해주세요'}
                    onChange={handleFileChange}
                    custom="true"
                    style={{ flex: '1' }}
                />
                {thumbnail && (
                    <img
                        src={thumbnail}
                        alt="Thumbnail"
                        style={{ width: '300px', height: 'auto', marginTop: '10px' }}
                    />
                )}
            </Form.Group>
        </Form>
    );

    const footer = (
        <Modal.Footer
            style={{ display: 'flex', justifyContent: 'space-between', borderTop: 'none', width: '100%', padding: 0 }}
        >
            <Button
                variant="secondary"
                onClick={closeModal}
                style={{ backgroundColor: '#F5EBE9', color: 'black', border: 'none' }}
            >
                취소
            </Button>
            <Button variant="success" type="submit" onClick={handleSubmit}>
                생성하기
            </Button>
        </Modal.Footer>
    );

    return (
        <>
            <Button variant="success"
            onClick={() => setModalShow(true)}
            style={{backgroundColor: '#009063',
            fontSize: '15px',
            fontWeight: '600',
            marginLeft: '10px',
            padding: '8px 14px',
            border: 'none',
            borderRadius:'6px'}}
            >
                <createImage src={createImage} style={{width: '22px', marginRight: '6px', marginTop: '-2px'}} />
                스터디 생성하기
            </Button>

            <UniversalModal
                title="스터디 생성하기"
                show={modalShow}
                handleClose={closeModal}
                children={modalContent}
                footer={footer}
            />
        </>
    );
};

export default CreateStudyModal;
