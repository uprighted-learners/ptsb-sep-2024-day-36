const express = require('express');

const connect = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/api/health', (req, res) => {
    res.send('I am alive!');
});

connect();

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});