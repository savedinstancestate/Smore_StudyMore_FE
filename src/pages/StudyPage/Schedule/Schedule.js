import React, { useState } from 'react';
import Calendar from 'react-calendar';
import styled from 'styled-components';
import 'react-calendar/dist/Calendar.css';
import AddScheduleModal from './AddScheduleModal';
import { Button } from 'react-bootstrap';
import EditScheduleModal from './EditScheduleModal';
import moment from 'moment';

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
        height: 95px; /* 각 날짜 칸의 높이 조절 */
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

const Schedule = () => {
    const [date, setDate] = useState(new Date());
    const [events, setEvents] = useState([
        { id: 1, startDate: '2024-07-10', endDate: '2024-07-10', title: '프로젝트 마감' },
        { id: 2, startDate: '2024-07-10', endDate: '2024-07-10', title: '구름 수료식' },
    ]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleDateChange = (date) => {
        setDate(date);
    };

    const addEvent = (event) => {
        setEvents([...events, { ...event, id: events.length + 1 }]);
    };

    const updateEvent = (updatedEvent) => {
        setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    };

    const deleteEvent = (eventToDelete) => {
        setEvents(events.filter((event) => event.id !== eventToDelete.id));
    };

    const handleEventClick = (event) => {
        setSelectedEvent(event);
        setIsEditModalOpen(true);
    };

    const getDatesInRange = (startDate, endDate) => {
        const dates = [];
        let currentDate = new Date(startDate);
        const lastDate = new Date(endDate);
        while (currentDate <= lastDate) {
            dates.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    };

    const groupedEvents = events.reduce((acc, event) => {
        const dateRange = getDatesInRange(event.startDate, event.endDate);
        dateRange.forEach((date) => {
            const dateKey = date.toDateString();
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(event);
        });
        return acc;
    }, {});

    return (
        <Container>
            <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', width: '100%' }}>
                <div style={{ fontSize: '25px' }}>스터디 캘린더📆</div>
                <Button variant="outline-success" onClick={() => setIsModalOpen(true)}>
                    일정 추가하기
                </Button>
                <AddScheduleModal show={isModalOpen} handleClose={() => setIsModalOpen(false)} addEvent={addEvent} />
            </div>
            <CalendarWrapper>
                <Calendar
                    formatDay={(locale, date) => moment(date).format('DD')}
                    value={date}
                    onChange={handleDateChange}
                    tileContent={({ date, view }) => {
                        const dateKey = date.toDateString();
                        const dayEvents = groupedEvents[dateKey];
                        return dayEvents ? (
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
                                        {event.title}
                                    </div>
                                ))}
                            </div>
                        ) : null;
                    }}
                />
            </CalendarWrapper>
            <EditScheduleModal
                show={isEditModalOpen}
                handleClose={() => setIsEditModalOpen(false)}
                event={selectedEvent}
                updateEvent={updateEvent}
                deleteEvent={deleteEvent}
            />
        </Container>
    );
};

export default Schedule;
