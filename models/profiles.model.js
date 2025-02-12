const mongoose = require('mongoose');

const profilesSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    profile_info: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now }
});

const Profile = mongoose.model('Profile', profilesSchema);
module.exports = Profile;
