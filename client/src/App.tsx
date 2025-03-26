import React, {useEffect, useState} from 'react';
import QuizCatalog from "./components/QuizCatalog";
import QuizForm from './components/QuizForm';
import {Quiz} from "./types";
import './App.css';
import './styles/QuizCatalog.css';
import './styles/QuizForm.css';

// App modes
type AppMode = 'catalog' | 'create' | 'edit';

const App: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentMode, setCurrentMode] = useState<AppMode>('catalog');
    const [currentQuiz, setCurrentQuiz] = useState<Quiz | undefined>(undefined);

    useEffect(() => {
        const fetchQuizzes = async () => {
            try {
                const response = await fetch('https://questionnaire-app-back-a9da1902bdc4.herokuapp.com/quizzes'); // Change this URL to your deployed backend
                if (!response.ok) {
                    throw new Error('Failed to fetch quizzes');
                }
                const data: Quiz[] = await response.json();
                setQuizzes(data);
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuizzes();
    }, []);

    // Handler for creating a new quiz
    const handleCreateQuiz = (quizData: Omit<Quiz, 'id' | 'completionCount'>) => {
        const newQuiz: Quiz = {
            id: Date.now().toString(),
            ...quizData,
            completionCount: 0
        };

        setQuizzes([...quizzes, newQuiz]);
        setCurrentMode('catalog');
    };

    // Handler for updating an existing quiz
    const handleUpdateQuiz = (quizData: Omit<Quiz, 'id' | 'completionCount'>) => {
        if (!currentQuiz) return;

        const updatedQuizzes = quizzes.map(quiz => {
            if (quiz.id === currentQuiz.id) {
                return {
                    ...quiz,
                    name: quizData.name,
                    description: quizData.description,
                    questionCount: quizData.questionCount
                };
            }
            return quiz;
        });

        setQuizzes(updatedQuizzes);
        setCurrentMode('catalog');
        setCurrentQuiz(undefined);
    };

    // Handler for deleting a quiz
    const handleDeleteQuiz = (id: string) => {
        const confirmed = window.confirm('Are you sure you want to delete this quiz?');
        if (confirmed) {
            setQuizzes(quizzes.filter(quiz => quiz.id !== id));
        }
    };

    // Handler for editing a quiz
    const handleEditQuiz = (id: string) => {
        const quizToEdit = quizzes.find(quiz => quiz.id === id);
        if (quizToEdit) {
            setCurrentQuiz(quizToEdit);
            setCurrentMode('edit');
        }
    };

    // Handler for running a quiz
    const handleRunQuiz = (id: string) => {
        console.log(`Running quiz with ID: ${id}`);
        alert(`Quiz ${id} started! (This would navigate to the quiz taking page in a real app)`);
    };

    // Render based on current mode
    const renderContent = () => {
        switch (currentMode) {
            case 'create':
                return (
                    <QuizForm
                        onSubmit={handleCreateQuiz}
                        onCancel={() => setCurrentMode('catalog')}
                    />
                );

            case 'edit':
                return (
                    <QuizForm
                        quiz={currentQuiz}
                        onSubmit={handleUpdateQuiz}
                        onCancel={() => {
                            setCurrentMode('catalog');
                            setCurrentQuiz(undefined);
                        }}
                    />
                );

            case 'catalog':
            default:
                return (
                    <>
                        <div className="catalog-header">
                            <h1 className="catalog-title">Quiz Catalog</h1>
                            <button
                                className="create-quiz-button"
                                onClick={() => setCurrentMode('create')}
                            >
                                Create New Quiz
                            </button>
                        </div>

                        <QuizCatalog
                            quizzes={quizzes}
                            onEdit={handleEditQuiz}
                            onRun={handleRunQuiz}
                            onDelete={handleDeleteQuiz}/>
                    </>
                );
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="app-container">
            {renderContent()}
        </div>
    );
};

export default App;

