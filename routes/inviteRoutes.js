const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const { inviteUser, rsvp } = require('../controllers/inviteController');

// Invite users to an event
router.post('/:id/invite', auth, inviteUser);

// RSVP to an event
router.post('/:id/rsvp', auth, rsvp);

module.exports = router;
