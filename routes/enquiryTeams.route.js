const express = require("express")
const { getEnquiryTeams, addEnquiryTeams, updateEnquiryTeamsStatus, removeEnquiryTeamsUser } = require("../controllers/enquiryTeams.controller")
const enquiryTeamsRouter = express.Router()

enquiryTeamsRouter.get('/:enquiryId', getEnquiryTeams)
enquiryTeamsRouter.post('/:enquiryId/teams', addEnquiryTeams)
enquiryTeamsRouter.put('/:enquiryId/teams/:userId', updateEnquiryTeamsStatus)
enquiryTeamsRouter.delete('/:enquiryId/teams/:userId', removeEnquiryTeamsUser)

module.exports = enquiryTeamsRouter