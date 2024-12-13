const express = require('express');
const connect = require('./config/database');

const guestbookRoutes = require('./routes/guestbook.routes');

const app = express();
const PORT = process.env.PORT || 8080;

// middleware to parse JSON data from the body of the request
app.use(express.json());

// health check route
app.get('/api/health', (req, res) => {
    res.send('I am alive!');
});

// connect to the database
connect();

// routes
app.use(guestbookRoutes);

// start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});