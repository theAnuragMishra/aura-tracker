const express = require('express');
const Message = require('../models/message.model');

const router = express.Router();

router.get('/:room', async (req, res) => {
    try {
        const messages = await Message.find({ room: req.params.room });
        res.json(messages);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

module.exports = router;
