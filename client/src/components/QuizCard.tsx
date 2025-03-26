import {QuizCardProps} from "../types";
import React from "react";

const QuizCard: React.FC<QuizCardProps> = ({ quiz, onEdit, onRun, onDelete }) => {
    return (
        <div className="quiz-card">
            <div className="quiz-card-header">
                <h3 className="quiz-name">{quiz.name}</h3>
                <div className="quiz-actions">
                    {onEdit && (
                        <button className="action-button" onClick={() => onEdit(quiz.id)} title="Edit Quiz">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                            </svg>
                        </button>
                    )}
                    {onRun && (
                        <button className="action-button" onClick={() => onRun(quiz.id)} title="Run Quiz">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                        </button>
                    )}
                    {onDelete && (
                        <button className="action-button" onClick={() => onDelete(quiz.id)} title="Delete Quiz">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 6h18"></path>
                                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                        </button>
                    )}
                </div>
            </div>
            <p className="quiz-description">{quiz.description}</p>
            <div className="quiz-stats">
                <span className="quiz-questions">Questions: {quiz.questionCount}</span>
                <span className="quiz-completions">Completions: {quiz.completionCount}</span>
            </div>
        </div>
    );
};

export default QuizCard;