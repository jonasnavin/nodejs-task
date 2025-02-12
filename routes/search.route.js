const express = require("express")
const { searchUser, searchProfile, searchAll, } = require("../controllers/search.controller")
const searchRouter = express.Router()

searchRouter.get("/users", searchUser)
searchRouter.get("/profiles", searchProfile)
searchRouter.get("/all", searchAll)

module.exports = searchRouter