const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET user by UID
router.get('/:uid', async (req, res) => {
    try {
        const user = await User.findOne({ uid: req.params.uid });
        if (!user) return res.status(404).json({ message: 'User not found' });
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST create/update user
router.post('/', async (req, res) => {
    const { uid } = req.body;
    try {
        const user = await User.findOneAndUpdate(
            { uid: uid },
            req.body,
            { new: true, upsert: true } // Create if not exists, return new
        );
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
