import React, { useState, useEffect } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import UniversalModal from '../../../components/Modal';
import API from '../../../api/AxiosInstance';
import { FaPlus } from 'react-icons/fa';

const CreateProblemBankModal = ({ show, handleClose, studyPk }) => {
    const [bankName, setBankName] = useState('');
    const [questions, setQuestions] = useState([]);
    const [bankPk, setBankPk] = useState(null);
    const [bankCreated, setBankCreated] = useState(false);

    useEffect(() => {
        if (show) {
            console.log('CreateProblemBankModal studyPk:', studyPk); // studyPk 확인
        }
    }, [show, studyPk]);

    const handleBankNameChange = (e) => {
        setBankName(e.target.value);
    };

    const addQuestion = async () => {
        if (bankName && !bankCreated) {
            try {
                const response = await API.post(`/study/${studyPk}/problem/bank`, { problemName: bankName });
                console.log('Problem Bank Created:', response.data);
                setBankPk(response.data); // String형의 18자리 숫자 설정
                setBankCreated(true);
                setQuestions([
                    ...questions,
                    { question: '', options: ['', '', '', '', ''], answer: '1', explanation: '' },
                ]);
            } catch (error) {
                console.error('Error creating problem bank:', error);
                if (error.response && error.response.status === 400) {
                    alert(error.response.data.message);
                }
            }
        } else if (bankCreated && isCurrentQuestionValid()) {
            setQuestions([...questions, { question: '', options: ['', '', '', '', ''], answer: '1', explanation: '' }]);
        }
    };

    const handleQuestionChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].question = e.target.value;
        setQuestions(newQuestions);
    };

    const handleOptionChange = (qIndex, oIndex, e) => {
        const newQuestions = [...questions];
        newQuestions[qIndex].options[oIndex] = e.target.value;
        setQuestions(newQuestions);
    };

    const handleAnswerChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].answer = e.target.value;
        setQuestions(newQuestions);
    };

    const handleExplanationChange = (index, e) => {
        const newQuestions = [...questions];
        newQuestions[index].explanation = e.target.value;
        setQuestions(newQuestions);
    };

    const handleSaveProblems = async () => {
        for (let i = 0; i < questions.length; i++) {
            const question = questions[i];
            const problemOptionRequestDTOList = question.options.map((option, index) => ({
                content: option,
                num: index + 1,
            }));

            const requestData = {
                studyProblemBankPk: bankPk,
                content: question.question,
                explanation: question.explanation,
                answer: parseInt(question.answer),
                problemOptionRequestDTOList,
            };

            try {
                await API.post(`/study/${studyPk}/problem`, requestData);
                console.log('Problem Saved:', requestData);
            } catch (error) {
                console.error('Error saving problem:', error);
            }
        }
        alert('모든 문제가 성공적으로 저장되었습니다.');
        handleClose();
        setQuestions([]);
        setBankName('');
        setBankPk(null);
        setBankCreated(false);
    };

    const isCurrentQuestionValid = () => {
        const currentQuestion = questions[questions.length - 1];
        if (!currentQuestion) return true; // No question yet
        return (
            currentQuestion.question.trim() &&
            currentQuestion.options.every((option) => option.trim()) &&
            currentQuestion.answer.trim() &&
            currentQuestion.explanation.trim()
        );
    };

    const isFormValid = () => {
        return (
            bankCreated &&
            questions.every(
                (question) =>
                    question.question.trim() &&
                    question.options.every((option) => option.trim()) &&
                    question.answer.trim() &&
                    question.explanation.trim()
            )
        );
    };

    const renderQuestionForm = () => (
        <>
            {questions.map((question, index) => (
                <div key={index}>
                    <Form.Group>
                        <Form.Label>Question {index + 1}</Form.Label>
                        <Form.Control
                            type="text"
                            value={question.question}
                            onChange={(e) => handleQuestionChange(index, e)}
                            placeholder="Enter question"
                        />
                        {question.options.map((option, oIndex) => (
                            <InputGroup className="mb-3" key={oIndex}>
                                <InputGroup.Text>{oIndex + 1}</InputGroup.Text>
                                <Form.Control
                                    type="text"
                                    value={option}
                                    onChange={(e) => handleOptionChange(index, oIndex, e)}
                                    placeholder="Enter option"
                                />
                            </InputGroup>
                        ))}
                        <InputGroup className="mb-3">
                            <InputGroup.Text>Answer Number</InputGroup.Text>
                            <Form.Select value={question.answer} onChange={(e) => handleAnswerChange(index, e)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Select>
                        </InputGroup>
                        <Form.Group>
                            <Form.Label>Explanation</Form.Label>
                            <Form.Control
                                type="text"
                                value={question.explanation}
                                onChange={(e) => handleExplanationChange(index, e)}
                                placeholder="Enter explanation"
                            />
                        </Form.Group>
                    </Form.Group>
                </div>
            ))}
            <Button
                variant="outline-primary"
                onClick={addQuestion}
                className="mt-2"
                style={{ width: '100%' }}
                disabled={!bankName || !isCurrentQuestionValid()}
            >
                Add Question
            </Button>
        </>
    );

    return (
        <UniversalModal
            title={bankName ? `${bankName}` : 'Create Problem Bank'}
            show={show}
            handleClose={() => {
                handleClose();
                setQuestions([]);
                setBankName('');
                setBankPk(null);
                setBankCreated(false);
            }}
            backdrop="static"
        >
            <Form>
                {!bankCreated && (
                    <Form.Group>
                        <Form.Label>Bank Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={bankName}
                            onChange={handleBankNameChange}
                            placeholder="Enter bank name"
                        />
                    </Form.Group>
                )}
                {renderQuestionForm()}
                <Button
                    onClick={() => {
                        handleClose();
                        setQuestions([]);
                        setBankName('');
                        setBankPk(null);
                        setBankCreated(false);
                    }}
                    className="mt-2"
                >
                    Cancel
                </Button>
                <Button onClick={handleSaveProblems} className="mt-2 ml-2" disabled={!isFormValid()}>
                    Complete
                </Button>
            </Form>
        </UniversalModal>
    );
};

const CreateProblemBankButton = ({ studyPk }) => {
    const [showModal, setShowModal] = useState(false);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <Button
                onClick={handleOpenModal}
                variant="success"
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
            <CreateProblemBankModal show={showModal} handleClose={handleCloseModal} studyPk={studyPk} />
        </>
    );
};

export default CreateProblemBankButton;
