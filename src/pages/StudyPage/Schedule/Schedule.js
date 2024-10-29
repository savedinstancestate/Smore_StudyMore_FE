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

    useEffect(() => {
        fetchEvents();
    }, [studyPk]);

    const fetchEvents = async () => {
        try {
            const response = await API.get(`/study/${studyPk}/calendar/list`);
            if (Array.isArray(response.data)) {
                const mappedData = response.data.map((event) => ({
                    ...event,
                    startDate: new Date(event.startDate),
                    endDate: new Date(event.endDate),
                }));
                setEvents(mappedData);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setEvents([]);
        }
    };

    const handleDateChange = (date) => setDate(date);

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>스터디 캘린더 📆</div>
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
                        backgroundColor: '#fff',
                        border: '2px solid #ea8400'
                    }}
                >
                    <FaPlus style={{ color: '#ea8400' }} />
                </Button>
                <AddScheduleModal
                    show={isModalOpen}
                    handleClose={() => setIsModalOpen(false)}
                    addEvent={fetchEvents}
                    studyPk={studyPk}
                />
                {selectedEvent && (
                    <EditScheduleModal
                        show={isEditModalOpen}
                        handleClose={() => setIsEditModalOpen(false)}
                        event={selectedEvent}
                        updateEvent={fetchEvents}
                        deleteEvent={fetchEvents}
                        studyPk={studyPk}
                    />
                )}
            </div>
            <CalendarWrapper>
                <Calendar
                    formatDay={(locale, date) => moment(date).format('DD')}
                    value={date}
                    onChange={handleDateChange}
                    tileContent={({ date, view }) => {
                        const dayEvents = events.filter((event) => {
                            return (
                                moment(date).isSame(event.startDate, 'day') ||
                                (date >= event.startDate && date <= event.endDate)
                            );
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
