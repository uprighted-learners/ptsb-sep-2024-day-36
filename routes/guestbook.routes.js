const express = require('express');
const router = express.Router();

const guestbookController = require('../controllers/guestbook.controllers');

// GET - /api/guestbook - get all guestbook entries
router.get("/api/guestbook", guestbookController.getAllGuestbookEntries)

// GET - /api/guestbook/:_id - get a single guestbook entry
router.get("/api/guestbook/:_id", guestbookController.getAnEntryById)

// POST - /api/guestbook - create a new guestbook entry
router.post("/api/guestbook", guestbookController.createGuestbookEntry)

// PUT - /api/guestbook/:_id - update a guestbook entry
router.put("/api/guestbook/:_id", guestbookController.updateGuestbookEntryById)

// DELETE - /api/guestbook/:_id - delete a guestbook entry
router.delete("/api/guestbook/:_id", guestbookController.deleteGuestbookEntryById)

module.exports = router;