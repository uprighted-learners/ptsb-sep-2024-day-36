const Guestbook = require('../models/guestbook.schema');

// GET - /api/guestbook - get all guestbook entries
const getAllGuestbookEntries = async (req, res) => {
    try {
        const entries = await Guestbook.find({});
        res.status(200).json(entries)
    } catch (error) {
        console.log(error);
    }
}

// GET - /api/guestbook/:_id - get a single guestbook entry
const getAnEntryById = async (req, res) => {
    // get the id from the request params
    const { _id } = req.params;

    try {
        const entry = await Guestbook.findById(_id);
        res.status(200).json(entry);
    } catch (error) {
        console.log(error);
    }
}


// POST - /api/guestbook - create a new guestbook entry
const createGuestbookEntry = async (req, res) => {
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
}


// PUT - /api/guestbook/:_id - update a guestbook entry
const updateGuestbookEntryById = async (req, res) => {
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
}

// DELETE - /api/guestbook/:_id - delete a guestbook entry
const deleteGuestbookEntryById = async (req, res) => {
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
}

module.exports = {
    getAllGuestbookEntries,
    getAnEntryById,
    createGuestbookEntry,
    updateGuestbookEntryById,
    deleteGuestbookEntryById
}
