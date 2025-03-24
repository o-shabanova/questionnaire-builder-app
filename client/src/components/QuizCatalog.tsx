import React, { useState } from 'react';
import QuizCard from './QuizCard';
import {Quiz} from "../types";
import { mockQuizzes } from '../data/mockData';
// import QuizFilter from './QuizFilter';
import Pagination from './Pagination';
import '../styles/QuizCatalog.css';

const QuizCatalog: React.FC = () => {
    // State for quizzes with initial data from mockData.ts
    const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
    const [filteredQuizzes, setFilteredQuizzes] = useState<Quiz[]>(mockQuizzes);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9; // Show 9 items per page to ensure pagination is visible

    // Calculate total pages
    const totalPages = Math.ceil(filteredQuizzes.length / itemsPerPage);

    // Get current items
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentQuizzes = filteredQuizzes.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Handlers for quiz actions
    const handleEdit = (id: string) => {
        console.log('Edit quiz with ID:', id);
        // Navigate to edit page or open modal
    };

    const handleRun = (id: string) => {
        console.log('Run quiz with ID:', id);
        // Navigate to quiz running page
    };

    const handleDelete = (id: string) => {
        // Delete quiz from state
        const updatedQuizzes = quizzes.filter(quiz => quiz.id !== id);
        setQuizzes(updatedQuizzes);
        setFilteredQuizzes(filteredQuizzes.filter(quiz => quiz.id !== id));
    };

    // Filter quizzes based on search or category
    const filterQuizzes = (filterCriteria: string) => {
        if (!filterCriteria) {
            setFilteredQuizzes(quizzes);
            setCurrentPage(1);
            return;
        }

        const filtered = quizzes.filter(quiz =>
            quiz.name.toLowerCase().includes(filterCriteria.toLowerCase()) ||
            quiz.description.toLowerCase().includes(filterCriteria.toLowerCase())
        );

        setFilteredQuizzes(filtered);
        setCurrentPage(1);
    };

    return (
        <main>
            <h1 className="visually-hidden">Questionnaire Builder App</h1>

            <section className="quizzes-filter">
                <h2 className="visually-hidden">Quizzes filter</h2>
                {/*<QuizFilter handleFilterChange={filterQuizzes} />*/}
            </section>

            <section className="quizzes">
                <h2 className="visually-hidden">Quizzes List</h2>
                <ul className="quiz-list">
                    {currentQuizzes.map((quiz: Quiz) => (
                        <li key={quiz.id} data-test-id="quiz-card" className="quiz-card-item">
                            <QuizCard
                                quiz={quiz}
                                onEdit={handleEdit}
                                onRun={handleRun}
                                onDelete={handleDelete}
                            />
                        </li>
                    ))}
                </ul>

                {filteredQuizzes.length === 0 && (
                    <div className="no-quizzes-message">
                        No quizzes found. Try a different search or create a new quiz.
                    </div>
                )}

                {totalPages > 1 && (
                    <div className="pagination-container">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                )}
            </section>
        </main>
    );
};

export default QuizCatalog;