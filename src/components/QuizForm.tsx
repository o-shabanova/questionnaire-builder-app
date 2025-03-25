import React, { useState, useEffect } from 'react';
import {Quiz, Question, QuizFormProps} from "../types";

const QuizForm: React.FC<QuizFormProps> = ({ quiz, onSubmit, onCancel }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentQuestionText, setCurrentQuestionText] = useState('');
    const [currentQuestionType, setCurrentQuestionType] = useState<'multiple-choice' | 'single-choice' | 'text'>('single-choice');
    const [currentOptions, setCurrentOptions] = useState<string[]>(['']);
    const [currentOptionText, setCurrentOptionText] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Initialize form if editing an existing quiz
    useEffect(() => {
        if (quiz) {
            setName(quiz.name);
            setDescription(quiz.description);
            // In a real app, you would fetch questions for this quiz from your API
            // and then set them in the state
        }
    }, [quiz]);

    // Add a new option to the current question
    const addOption = () => {
        if (currentOptionText.trim() !== '') {
            setCurrentOptions([...currentOptions, currentOptionText]);
            setCurrentOptionText('');
        }
    };

    // Remove an option from the current question
    const removeOption = (index: number) => {
        const updatedOptions = [...currentOptions];
        updatedOptions.splice(index, 1);
        setCurrentOptions(updatedOptions);
    };

    // Add the current question to the questions list
    const addQuestion = () => {
        if (currentQuestionText.trim() === '') {
            setErrorMessage('Question text cannot be empty');
            return;
        }

        if (currentQuestionType !== 'text' && currentOptions.length < 2) {
            setErrorMessage('Add at least two options for multiple/single choice questions');
            return;
        }

        setErrorMessage('');

        const newQuestion: Question = {
            id: Date.now().toString(), // Simple ID generation
            text: currentQuestionText,
            type: currentQuestionType,
            options: currentQuestionType === 'text' ? [] : currentOptions,
        };

        setQuestions([...questions, newQuestion]);

        // Reset form fields for the next question
        setCurrentQuestionText('');
        setCurrentQuestionType('single-choice');
        setCurrentOptions(['']);
    };

    // Remove a question from the list
    const removeQuestion = (id: string) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    // Handle form submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (name.trim() === '') {
            setErrorMessage('Quiz name cannot be empty');
            return;
        }

        if (questions.length === 0) {
            setErrorMessage('Add at least one question to the quiz');
            return;
        }

        setErrorMessage('');

        onSubmit({
            name,
            description,
            questionCount: questions.length,
        });
    };

    return (
        <div className="quiz-form-container">
            <h2 className="form-title">{quiz ? 'Edit Quiz' : 'Create New Quiz'}</h2>

            {errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-section">
                    <h3>Quiz Details</h3>

                    <div className="form-group">
                        <label htmlFor="quizName">Quiz Name:</label>
                        <input
                            type="text"
                            id="quizName"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter quiz name"
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="quizDescription">Description:</label>
                        <textarea
                            id="quizDescription"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter quiz description"
                            rows={3}
                        />
                    </div>
                </div>
                <div className="form-section">
                    <h3>Quiz Questions ({questions.length})</h3>

                    {questions.length > 0 && (
                        <div className="questions-list">
                            {questions.map((q, index) => (
                                <div key={q.id} className="question-item">
                                    <div className="question-header">
                                        <span className="question-number">Q{index + 1}:</span>
                                        <span className="question-text">{q.text}</span>
                                        <span className="question-type">({q.type})</span>
                                        <button
                                            type="button"
                                            className="remove-button"
                                            onClick={() => removeQuestion(q.id)}
                                        >
                                            &times;
                                        </button>
                                    </div>

                                    {q.type !== 'text' && q.options.length > 0 && (
                                        <div className="question-options">
                                            <ul>
                                                {q.options.map((option, i) => (
                                                    <li key={i}>{option}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="add-question-form">
                        <div className="form-group">
                            <label htmlFor="questionText">Question Text:</label>
                            <input
                                type="text"
                                id="questionText"
                                value={currentQuestionText}
                                onChange={(e) => setCurrentQuestionText(e.target.value)}
                                placeholder="Enter question text"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="questionType">Question Type:</label>
                            <select
                                id="questionType"
                                value={currentQuestionType}
                                onChange={(e) => setCurrentQuestionType(e.target.value as any)}
                            >
                                <option value="single-choice">Single Choice</option>
                                <option value="multiple-choice">Multiple Choice</option>
                                <option value="text">Text Answer</option>
                            </select>
                        </div>

                        {currentQuestionType !== 'text' && (
                            <div className="options-section">
                                <h4>Options:</h4>

                                {currentOptions.length > 0 && (
                                    <ul className="options-list">
                                        {currentOptions.map((option, index) => (
                                            <li key={index} className="option-item">
                                                <span>{option}</span>
                                                <button
                                                    type="button"
                                                    className="remove-option-button"
                                                    onClick={() => removeOption(index)}
                                                >
                                                    &times;
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className="add-option-form">
                                    <input
                                        type="text"
                                        value={currentOptionText}
                                        onChange={(e) => setCurrentOptionText(e.target.value)}
                                        placeholder="Enter option text"
                                    />
                                    <button
                                        type="button"
                                        className="add-option-button"
                                        onClick={addOption}
                                    >
                                        Add Option
                                    </button>
                                </div>
                            </div>
                        )}

                        <button
                            type="button"
                            className="add-question-button"
                            onClick={addQuestion}
                        >
                            Add Question
                        </button>
                    </div>
                </div>

                <div className="form-actions">
                    <button type="button" className="cancel-button" onClick={onCancel}>
                        Cancel
                    </button>
                    <button type="submit" className="submit-button">
                        {quiz ? 'Update Quiz' : 'Create Quiz'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default QuizForm;