import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import AddGoalModal from './AddGoalModal';
import EditGoalModal from './EditGoalModal';
import DeleteGoalModal from './DeleteGoalModal';
import API from '../../../api/AxiosInstance';
import './GoalList.css';

const GoalList = ({ studyPk }) => {
    const [goals, setGoals] = useState([]);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedGoal, setSelectedGoal] = useState(null);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/todo/my`);
                setGoals(response.data);
            } catch (error) {
                console.error('목표 리스트를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchGoals();
    }, [studyPk]);

    const addGoal = (newGoal) => {
        setGoals((prevGoals) => [...prevGoals, newGoal]);
    };

    const handleEditGoal = (goal) => {
        setSelectedGoal(goal);
        setShowEditModal(true);
    };

    const handleDeleteGoalConfirmation = (goal) => {
        setSelectedGoal(goal);
        setShowDeleteModal(true);
    };

    const handleDeleteGoal = async () => {
        try {
            await API.delete(`/study/${studyPk}/todo/${selectedGoal.personalTodoPk}`);
            setGoals((prevGoals) => prevGoals.filter((goal) => goal.personalTodoPk !== selectedGoal.personalTodoPk));
            setShowDeleteModal(false);
            setSelectedGoal(null);
        } catch (error) {
            console.error('목표를 삭제하는 데 실패했습니다:', error);
        }
    };

    const updateGoal = (updatedGoal) => {
        setGoals((prevGoals) =>
            prevGoals.map((goal) => (goal.personalTodoPk === updatedGoal.personalTodoPk ? updatedGoal : goal))
        );
    };

    return (
        <div className="goal-list">
            <div className="goal-list-header">
                <div className="goal-list-title">개인 목표 💪🏻</div>
                <AddGoalModal studyPk={studyPk} addGoal={addGoal} />
            </div>
            <div className="goal-list-container">
                {goals.map((goal) => (
                    <div key={goal.personalTodoPk} className="goal">
                        <div className="goal-info">
                            <div className="goal-name">{goal.name}</div>
                            <div className="goal-content">{goal.scheduleContent}</div>
                        </div>
                        <div className="goal-status">{goal.scheduleStatus}</div>
                        <div className="goal-actions">
                            <Button
                                variant="link"
                                onClick={() => handleEditGoal(goal)}
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
                                onClick={() => handleDeleteGoalConfirmation(goal)}
                                style={{ textDecoration: 'none', padding: '0 5px', color: '#919191' }}
                            >
                                <FontAwesomeIcon icon={faTrash} />
                            </Button>
                        </div>
                    </div>
                ))}
            </div>
            {selectedGoal && (
                <EditGoalModal
                    show={showEditModal}
                    handleClose={() => setShowEditModal(false)}
                    goal={selectedGoal}
                    studyPk={studyPk}
                    updateGoal={updateGoal}
                />
            )}
            {selectedGoal && (
                <DeleteGoalModal
                    show={showDeleteModal}
                    handleClose={() => setShowDeleteModal(false)}
                    handleDelete={handleDeleteGoal}
                />
            )}
        </div>
    );
};

export default GoalList;
