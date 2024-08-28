import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import API from '../../../api/AxiosInstance';
import UniversalModal from '../../../components/Modal'; // UniversalModal의 경로에 맞게 변경하세요

const QuizModal = ({ show, handleClose, studyPk, selectedBanks, maxQuestions }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [showExplanation, setShowExplanation] = useState(false);

    useEffect(() => {
        if (show) {
            const fetchQuestions = async () => {
                try {
                    console.log('Fetching questions with params:', {
                        studyProblemBankPk: selectedBanks.join(','),
                        max: maxQuestions,
                    });
                    const response = await API.get(`/study/${studyPk}/problem`, {
                        params: {
                            studyProblemBankPk: selectedBanks.join(','),
                            max: maxQuestions,
                        },
                    });
                    console.log('Questions fetched:', response.data);
                    setQuestions(response.data);
                } catch (error) {
                    console.error('문제 불러오기에 실패했습니다:', error);
                }
            };

            fetchQuestions();
        } else {
            // 모달이 닫힐 때 상태 초기화
            setQuestions([]);
            setCurrentQuestionIndex(0);
            setSelectedOption(null);
            setShowExplanation(false);
        }
    }, [show, studyPk, selectedBanks, maxQuestions]);

    const handleOptionSelect = (optionPk) => {
        setSelectedOption(optionPk);
        setShowExplanation(true);
    };

    const handleNextQuestion = () => {
        setSelectedOption(null);
        setShowExplanation(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    };

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <UniversalModal
            show={show}
            handleClose={handleClose}
            title="문제 풀기"
            backdrop="static"
            footer={
                showExplanation && currentQuestionIndex < questions.length - 1 ? (
                    <Button variant="success" onClick={handleNextQuestion} style={{backgroundColor: '#ea8400', border: 'none'}}>
                        다음
                    </Button>
                ) : (
                    <Button variant="success" onClick={handleClose} style={{backgroundColor: '#ea8400', border: 'none'}}>
                        끝내기
                    </Button>
                )
            }
        >
            {currentQuestion ? (
                <>
                    <div style={{ marginBottom: '15px', fontSize: '1.1rem' }}>
                        <strong>Q: {currentQuestion.problemContent}</strong>
                    </div>
                    {currentQuestion.options.map((option) => (
                        <Form.Check
                            type="radio"
                            name="quiz"
                            key={option.problemOptionPk}
                            id={option.problemOptionPk}
                            label={option.content}
                            checked={selectedOption === option.problemOptionPk}
                            onChange={() => handleOptionSelect(option.problemOptionPk)}
                            disabled={showExplanation}
                        />
                    ))}
                    {showExplanation && (
                        <div>
                            <div>{selectedOption === currentQuestion.answerPk ? '정답입니다!' : '오답입니다.'}</div>
                            <div>해설: {currentQuestion.problemExplanation}</div>
                        </div>
                    )}
                </>
            ) : (
                <div>문제를 불러오는 중입니다...</div>
            )}
        </UniversalModal>
    );
};

export default QuizModal;
