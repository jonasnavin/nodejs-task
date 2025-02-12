const Enquiry = require("../models/enquiries.model")

const getEnquiryTeams = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.enquiryId)

        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' })
        }

        const team = enquiry.teams

        res.status(200).json({ success: true, message: 'User added to team', team })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding user', error })
    }
}

const addEnquiryTeams = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.enquiryId)

        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' })
        }

        enquiry.teams.push(req.body)
        await enquiry.save()

        res.status(201).json({ success: true, message: 'User added to team', enquiry })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error adding user', error })
    }
}

const updateEnquiryTeamsStatus = async (req, res) => {
    try {
        const { status } = req.body

        const enquiry = await Enquiry.findById(req.params.enquiryId)
        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' })
        }

        const teamMember = enquiry.teams.find(member => member.user.toString() === req.params.userId)
        if (!teamMember) {
            return res.status(404).json({ success: false, message: 'User not found in team' })
        }

        teamMember.status = status
        enquiry.updatedDate = Date.now()
        await enquiry.save()

        res.json({ success: true, message: 'User status updated', enquiry })
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating user status', error })
    }
}

const removeEnquiryTeamsUser = async (req, res) => {
    try {
        const enquiry = await Enquiry.findById(req.params.enquiryId);

        if (!enquiry) {
            return res.status(404).json({ success: false, message: 'Enquiry not found' })
        }

        enquiry.teams = enquiry.teams.filter(member => member.user.toString() !== req.params.userId);
        await enquiry.save();

        res.json({ success: true, message: 'User removed from team', enquiry });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error removing user', error });
    }
}

module.exports = {
    getEnquiryTeams,
    addEnquiryTeams,
    updateEnquiryTeamsStatus,
    removeEnquiryTeamsUser
}