CREATE TABLE quizzes
(
    id              VARCHAR(255) NOT NULL,
    name            VARCHAR(255),
    description     VARCHAR(700),
    questionCount   INT,
    completionCount INT,
    PRIMARY KEY (id)
);

INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('1',
        'JavaScript Basics',
        'Test your knowledge of JavaScript fundamentals including variables, functions, and basic syntax.',
        17,
        156);
INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('2',
        'React Fundamentals',
        'Evaluate your understanding of React components, state management, and lifecycle methods.',
        17,
        98);
INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('3',
        'TypeScript Quiz',
        'Check your TypeScript skills including interfaces, types, generics, and type assertions.',
        17,
        72);
INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('4',
        'CSS Mastery',
        'Test your knowledge of advanced CSS concepts including Flexbox, Grid, and animations.',
        17,
        45);
INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('5',
        'HTML5 Features',
        'Explore your understanding of modern HTML5 features and semantic elements.',
        17,
        210);
INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('6',
        'Web Accessibility',
        'Check your knowledge of web accessibility guidelines and best practices.',
        17,
        36);
INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('7',
        'Frontend Performance',
        'Test your understanding of frontend performance optimization techniques.',
        17,
        48);
INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('8',
        'RESTful API Design',
        'Evaluate your knowledge of RESTful API principles and best practices.',
        17,
        63);

INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('9',
        'Node.js Essentials',
        'Test your knowledge of Node.js including modules, file system, and server creation.',
        15,
        89);

INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('10',
        'GraphQL Fundamentals',
        'Evaluate your understanding of GraphQL queries, mutations, schemas, and resolvers.',
        12,
        42);

INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('11',
        'Docker & Containers',
        'Test your knowledge of Docker concepts, container management, and deployment strategies.',
        20,
        63);

INSERT INTO quizzes (id, name, description, questionCount, completionCount)
VALUES ('12',
        'UI/UX Design Principles',
        'Assess your understanding of design principles, usability, accessibility, and user research methodologies.',
        18,
        124);