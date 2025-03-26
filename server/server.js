const cors = require('cors');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const pool = require('./db')

const corsOptions = {
    origin: [
        'http://localhost:3001',
        'https://questionnaire-app-client-63ff70b3d682.herokuapp.com/'
    ],
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(204); // No Content
});

app.get('/quizzes', async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT id,
                   name,
                   description,
                   questioncount   as "questionCount",
                   completionCount as "completionCount"
            FROM quizzes`
        );
        res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});