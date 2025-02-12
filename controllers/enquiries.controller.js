const Enquiry = require("../models/enquiries.model")

const getEnquiries = async (req, res) => {
    try {
        const enquiries = await Enquiry.find()
        res.status(200).json({ success: true, enquiries })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error fetching equiries" })
    }
}

const getEnquiry = async (req, res) => {
    try {
        const id = req.params.enquiryId

        const enquiry = await Enquiry.findById(id)
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" })
        }
        res.status(200).json({ success: true, enquiry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error fetching equiries" })
    }
}

const addEnquiry = async (req, res) => {
    try {
        const enquiry = new Enquiry(req.body)
        await enquiry.save()
        res.status(201).json({ succcess: true, message: "Enquiry created Successfully", enquiry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error creating enquiry" })
    }
}

const updateEnquiry = async (req, res) => {
    try {
        const id = req.params.enquiryId
        const enquiry = await Enquiry.findByIdAndUpdate(
            id,
            { ...req.body, updatedDate: Date.now() },
            { new: true, runValidators: true }
        )
        if (!enquiry) {
            return res.status(404).json({ success: true, message: "Enquiry not found" })
        }
        res.status(200).json({ success: true, enquiry })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error updating enquiry" })
    }
}

const removeEnquiry = async (req, res) => {
    try {
        const id = req.params.enquiryId
        const enquiry = await Enquiry.findByIdAndDelete(id)
        if (!enquiry) {
            return res.status(404).json({ success: false, message: "Enquiry not found" })
        }
        res.status(200).json({ success: true, message: "Enquiry removed successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error removing enquiry" })
    }
}

module.exports = {
    getEnquiries,
    getEnquiry,
    addEnquiry,
    updateEnquiry,
    removeEnquiry
}