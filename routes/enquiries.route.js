const express = require("express")
const { addEnquiry, getEnquiries, getEnquiry, updateEnquiry, removeEnquiry } = require("../controllers/enquiries.controller")

const enquiriesRouter = express.Router()

enquiriesRouter.get('/', getEnquiries)
enquiriesRouter.get('/:enquiryId', getEnquiry)
enquiriesRouter.post('/add-enquiry', addEnquiry)
enquiriesRouter.put('/update/:enquiryId', updateEnquiry)
enquiriesRouter.delete('/remove/:enquiryId', removeEnquiry)



module.exports = enquiriesRouter