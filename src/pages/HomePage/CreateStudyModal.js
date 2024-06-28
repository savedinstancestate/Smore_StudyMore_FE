import React, { useState } from 'react';
import API from '../../api/AxiosInstance';
import UniversalModal from '../../components/Modal';
import { Modal, Form, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment';

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
        setStartDate(date);
        setShowStartDatePicker(false); // 선택 후 캘린더 숨기기
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        setShowEndDatePicker(false); // 선택 후 캘린더 숨기기
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSelectedFile(file);
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnail(e.target.result); // 이미지의 Base64 URL을 썸네일 상태에 저장
            };
            reader.readAsDataURL(file);
        } else {
            setThumbnail(null); // 이미지 파일이 아닐 경우 썸네일 제거
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
            studyName: formData.name,
            // memberPk: 1, // 실제 멤버 ID
            imageUri: selectedFile ? thumbnail : null,
            maxPeople: parseInt(formData.attendees),
            content: formData.description,
            openDate: moment(startDate).format('YYYY-MM-DD'),
            closeDate: moment(endDate).format('YYYY-MM-DD'),
        };

        try {
            const response = await API.post('/study', payload);
            console.log(response.data);
            closeModal(); // 모달을 닫으면서 데이터를 콘솔에 로깅
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
        <Form onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>스터디 이름</Form.Label>
                <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>내용</Form.Label>
                <Form.Control type="text" name="description" value={formData.description} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>인원</Form.Label>
                <Form.Select name="attendees" value={formData.attendees} onChange={handleChange}>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                </Form.Select>
            </Form.Group>
            <Form.Group>
                <Form.Label>기간</Form.Label>
                <div>
                    <Button variant="outline-secondary" onClick={() => setShowStartDatePicker(!showStartDatePicker)}>
                        {startDate.toISOString().substring(0, 10)}
                    </Button>

                    <span className="date-separator">~</span>
                    <Button variant="outline-secondary" onClick={() => setShowEndDatePicker(!showEndDatePicker)}>
                        {endDate.toISOString().substring(0, 10)}
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
            <Form.Group>
                <Form.Label>대표사진</Form.Label>
                <Form.Control
                    type="file"
                    id="custom-file"
                    label={selectedFile ? selectedFile.name : '파일을 선택해주세요'}
                    onChange={handleFileChange}
                    custom
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
            <Button
                variant="primary"
                type="submit"
                style={{ backgroundColor: '#FEE8D8', color: 'black', border: 'none' }}
                onClick={handleSubmit}
            >
                생성하기
            </Button>
        </Modal.Footer>
    );

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}
            style={{backgroundColor: '#009063',
            border: '1px solid #009063',
            fontWeight: '400',
            display: 'flex',
            alignItems: 'center'}}>
                {/* <img src="img/pencil.png" alt="Button Image" style={{ width: '18px', marginRight: '4px',  }} /> */}
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
