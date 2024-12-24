const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = 3000;
app.use(express.static(path.join(__dirname, '../client')));

app.get('/api/users', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching users');
    }
});

app.get('/api/user/:userId/comments', async (req, res) => {
    const { userId } = req.params;
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}/posts`);
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching comments');
    }
});

app.get('/api/comments', async (req, res) => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/comments?_limit=15');
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching comments');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
