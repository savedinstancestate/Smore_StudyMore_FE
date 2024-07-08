import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import AddScheduleModal from './AddScheduleModal';
import EditScheduleModal from './EditScheduleModal';
import { Button } from 'react-bootstrap';
import moment from 'moment';
import API from '../../../api/AxiosInstance';
import { FaPlus } from 'react-icons/fa';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const CalendarWrapper = styled.div`
    width: 100%;
    .react-calendar {
        width: 100%;
        border: none;
        font-family: Arial, Helvetica, sans-serif;
    }
    .react-calendar__tile {
        height: 95px;
    }
    .react-calendar__tile--now {
        background: #ffeb3b33;
    }
    .react-calendar__tile--active {
        background: #3f51b5;
        color: white;
    }
    .react-calendar__month-view__days__day--weekend {
        color: #d10000;
    }
`;

const Schedule = ({ studyPk }) => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const fetchEvents = async () => {
        try {
            console.log(`Fetching events for studyPk: ${studyPk}`);
            const response = await API.get(`/study/${studyPk}/calendar/list`);
            console.log('Type of response data:', typeof response.data);
            console.log('API response:', response.data);

            const eventData = response.data;

            if (Array.isArray(eventData)) {
                const mappedData = eventData.map((event) => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
                setEvents(mappedData);
                console.log('Mapped events:', mappedData);
            } else {
                console.error('Data is not an array', eventData);
                setEvents([]);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setEvents([]); // 오류 발생 시 빈 배열로 설정
        }
    };

    useEffect(() => {
        fetchEvents();
    }, [studyPk]);

    const addEvent = async (eventDetails) => {
        try {
            const postData = {
                content: eventDetails.content,
                startDate: moment(eventDetails.startDate).format('YYYY-MM-DD'),
                endDate: moment(eventDetails.endDate).format('YYYY-MM-DD'),
            };
            console.log('Sending POST data:', postData);
            const response = await API.post(`/study/${studyPk}/calendar`, postData);
            if (response.status === 200) {
                fetchEvents(); // 일정 추가 후 바로 목록 갱신
            }
        } catch (error) {
            console.error('일정 추가에 실패했습니다:', error);
        }
    };

    const updateEvent = async (updatedEvent) => {
        try {
            const response = await API.put(`/study/${studyPk}/calendar/${updatedEvent.calendarPk}`, updatedEvent);
            if (response.status === 200) {
                fetchEvents(); // 일정 업데이트 후 목록 갱신
            }
        } catch (error) {
            console.error('일정 업데이트에 실패했습니다:', error);
        }
    };

    const deleteEvent = async (eventToDelete) => {
        try {
            const response = await API.delete(`/study/${studyPk}/calendar/${eventToDelete.calendarPk}`);
            if (response.status === 200) {
                fetchEvents(); // 일정 삭제 후 목록 갱신
            }
        } catch (error) {
            console.error('일정 삭제에 실패했습니다:', error);
        }
    };

    const handleDateChange = (date) => setDate(date);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const isSameDay = (date1, date2) => {
        const d1 = new Date(date1);
        const d2 = new Date(date2);
        return (
            d1.getDate() === d2.getDate() && d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear()
        );
    };

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <div style={{ fontSize: '25px' }}>스터디 캘린더📆</div>
                <Button
                    variant="success"
                    onClick={() => setIsModalOpen(true)}
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
                <AddScheduleModal
                    show={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                    addEvent={addEvent}
                    fetchEvents={fetchEvents}
                />
                <EditScheduleModal
                    show={isEditModalOpen}
                    handleClose={() => setIsEditModalOpen(false)}
                    event={selectedEvent}
                    updateEvent={updateEvent}
                    deleteEvent={deleteEvent}
                    studyPk={studyPk}
                />
            </div>
            <CalendarWrapper>
                <Calendar
                    formatDay={(locale, date) => moment(date).format('DD')}
                    value={date}
                    onChange={handleDateChange}
                    tileContent={({ date, view }) => {
                        const dayEvents = events.filter((event) => {
                            const eventStartDate = new Date(event.startDate);
                            const eventEndDate = new Date(event.endDate);
                            return isSameDay(date, eventStartDate) || (date >= eventStartDate && date <= eventEndDate);
                        });
                        return dayEvents.length ? (
                            <div>
                                {dayEvents.map((event, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            backgroundColor: '#ffeb3b',
                                            borderRadius: '5px',
                                            padding: '2px 5px',
                                            marginBottom: '2px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => handleEventClick(event)}
                                    >
                                        {event.content}
                                    </div>
                                ))}
                            </div>
                        ) : null;
                    }}
                />
            </CalendarWrapper>
        </Container>
    );
};

export default Schedule;
