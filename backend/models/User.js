const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    uid: { type: String, required: true, unique: true }, // Firebase UID link
    firstName: String,
    lastName: String,
    email: String,
    phone: { type: String, required: true },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    registrationDate: Date
});

module.exports = mongoose.model('User', userSchema);
