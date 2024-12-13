const express = require('express');
const mongoose = require('mongoose');
const connect = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8080;

// middleware to parse JSON data from the body of the request
app.use(express.json());

app.get('/api/health', (req, res) => {
    res.send('I am alive!');
});

connect();

// Define a schema
const guestbookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

// Define a model
const Guestbook = mongoose.model('Guestbook', guestbookSchema);

// GET - /api/guestbook - get all guestbook entries
app.get("/api/guestbook", async (req, res) => {
    try {
        const entries = await Guestbook.find({});
        res.status(200).json(entries)
    } catch (error) {
        console.log(error);
    }
})

// GET - /api/guestbook/:_id - get a single guestbook entry
app.get("/api/guestbook/:_id", async (req, res) => {
    // get the id from the request params
    const { _id } = req.params;

    try {
        const entry = await Guestbook.findById(_id);
        res.status(200).json(entry);
    } catch (error) {
        console.log(error);
    }
})

// POST - /api/guestbook - create a new guestbook entry
app.post("/api/guestbook", async (req, res) => {
    // destructure the request body
    const { name, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ error: "Name and message are required" });
    }

    try {
        const newEntry = new Guestbook({ name, message });
        await newEntry.save();
        res.status(201).json(newEntry);
    } catch (error) {
        console.log(error);
    }
})

// PUT - /api/guestbook/:_id - update a guestbook entry
app.put("/api/guestbook/:_id", async (req, res) => {
    // get the id from the request params
    const { _id } = req.params;

    // destructure the request body
    const { name, message } = req.body;

    try {
        // create an object with the updated values
        const updatedEntry = {
            name,
            message
        }
        // update the entry
        await Guestbook.findByIdAndUpdate(_id, updatedEntry);

        // send the updated entry as a response
        res.status(200).json(updatedEntry);
    } catch (error) {
        console.log(error);
    }
})

// DELETE - /api/guestbook/:_id - delete a guestbook entry
app.delete("/api/guestbook/:_id", async (req, res) => {
    try {
        // get the id from the request params
        const { _id } = req.params;

        // delete the entry
        await Guestbook.findByIdAndDelete(_id);

        // send a response
        res.status(200).json({ message: "Entry deleted" });
    } catch (error) {
        console.log(error);
    }
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});