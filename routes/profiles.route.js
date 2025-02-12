const express = require("express")
const { addProfile, getProfiles, updateProfile, removeProfile } = require("../controllers/profiles.controller")

const profilesRouter = express.Router()

profilesRouter.get('/', getProfiles)
profilesRouter.post('/add-profile', addProfile)
profilesRouter.put('/update/:profileId', updateProfile)
profilesRouter.delete('/remove/:profileId', removeProfile)

module.exports = profilesRouter