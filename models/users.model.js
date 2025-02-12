const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    type: { type: String, enum: ['user', 'admin'], required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Profile' },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
