const express = require("express")
const { addUser, getUsers, removeUser, getUser, updateUser } = require("../controllers/users.controller")

const userRouter = express.Router()

userRouter.get('/', getUsers)
userRouter.get('/:userId', getUser)
userRouter.post('/add-user', addUser)
userRouter.put('/update/:userId', updateUser)
userRouter.delete('/remove/:userId', removeUser)

module.exports = userRouter