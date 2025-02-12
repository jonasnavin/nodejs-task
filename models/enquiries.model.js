const mongoose = require('mongoose');

const enquiriesSchema = new mongoose.Schema({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    teams: [{
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        role: { type: String, enum: ['member', 'leader'], default: 'member' },
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }
    }],
    createdDate: { type: Date, default: Date.now },
    updatedDate: { type: Date, default: Date.now },
    expired: { type: Boolean, default: false }
});

const Enquiry = mongoose.model('Enquiry', enquiriesSchema);
module.exports = Enquiry;