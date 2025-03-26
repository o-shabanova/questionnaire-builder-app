export interface Quiz {
    id: string;
    name: string;
    description: string;
    questionCount: number;
    completionCount: number;
}

export interface Question {
    id: string;
    text: string;
    type: 'multiple-choice' | 'single-choice' | 'text';
    options: string[];
    correctAnswer?: string | string[];
}


export interface QuizCardProps {
    quiz: Quiz;
    onEdit?: (id: string) => void;
    onRun?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export interface QuizCatalogProps {
    quizzes: Quiz[];
    onEdit?: (id: string) => void;
    onRun?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export interface QuizFormProps {
    quiz?: Quiz; // Optional quiz for editing mode
    onSubmit: (quiz: Omit<Quiz, 'id' | 'completionCount'>) => void;
    onCancel: () => void;
}


