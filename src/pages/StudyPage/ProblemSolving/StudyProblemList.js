import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import QuizModal from './QuizModal';
import API from '../../../api/AxiosInstance';
import './StudyProblemList.css';

const StudyProblemList = ({ studyPk, studyName }) => {
    const [problemBanks, setProblemBanks] = useState([]);
    const [selectedBanks, setSelectedBanks] = useState([]);
    const [maxQuestions, setMaxQuestions] = useState(10);
    const [showQuizModal, setShowQuizModal] = useState(false);

    useEffect(() => {
        const fetchProblemBanks = async () => {
            try {
                const response = await API.get(`/study/${studyPk}/problem/bank`);
                setProblemBanks(response.data);
            } catch (error) {
                console.error('문제은행 리스트를 불러오는 데 실패했습니다:', error);
            }
        };

        fetchProblemBanks();
    }, [studyPk]);

    const handleBankSelect = (pk) => {
        setSelectedBanks((prevSelected) =>
            prevSelected.includes(pk) ? prevSelected.filter((id) => id !== pk) : [...prevSelected, pk]
        );
    };

    const handleMaxQuestionsChange = (e) => {
        setMaxQuestions(parseInt(e.target.value, 10));
    };

    const handleStartQuiz = () => {
        if (selectedBanks.length > 0) {
            setShowQuizModal(true);
        } else {
            alert('문제은행을 선택해주세요.');
        }
    };

    return (
        <div className="study-problems">
            <div className="study-problems-header">
                <div className="study-problems-title">{studyName}의 문제 📘</div>
            </div>
            <ul className="study-problems-list">
                {problemBanks.map((bank) => (
                    <li key={bank.pk} className="study-problem-item">
                        <Form.Check
                            type="checkbox"
                            id={`bank-check-${bank.pk}`}
                            className="checkbox"
                            label={bank.problemBankName}
                            checked={selectedBanks.includes(bank.pk)}
                            onChange={() => handleBankSelect(bank.pk)}
                        />
                        <label htmlFor={`bank-check-${bank.pk}`} className="problem-info">
                            <span className="problem-name">{bank.problemBankName}</span>
                            <span className="problem-writer">출제자: {bank.writer}</span>
                            <span className="problem-count">문제 수: {bank.count}</span>
                        </label>
                    </li>
                ))}
            </ul>
            <div className="problem-actions">
                <label>문제 수:</label>
                <Form.Control
                    as="select"
                    value={maxQuestions}
                    onChange={handleMaxQuestionsChange}
                    className="max-questions-dropdown"
                >
                    {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((num) => (
                        <option key={num} value={num}>
                            {num}
                        </option>
                    ))}
                </Form.Control>
                <Button onClick={handleStartQuiz} className="solve-problems-button" variant="success">
                    문제 풀기
                </Button>
            </div>
            <QuizModal
                show={showQuizModal}
                handleClose={() => setShowQuizModal(false)}
                studyPk={studyPk}
                selectedBanks={selectedBanks}
                maxQuestions={maxQuestions}
            />
        </div>
    );
};

export default StudyProblemList;
