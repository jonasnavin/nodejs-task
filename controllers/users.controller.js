const User = require("../models/users.model")

const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, users })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in fetching the users" })
    }
}

const getUser = async (req, res) => {
    try {
        const id = req.params.userId
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, user: user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in fetching the user" })
    }
}

const addUser = async (req, res) => {
    try {
        const user = new User(req.body)
        await user.save()
        res.status(201).json({ success: true, message: "User created Successfully", user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in creating a user." })
    }
}

const updateUser = async (req, res) => {
    try {
        const id = req.params.userId
        const user = await User.findByIdAndUpdate(
            id,
            { ...req.body, updatedDate: Date.now() },
            { new: true, runValidators: true }
        )
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, user })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in updating the user." })
    }
}

const removeUser = async (req, res) => {
    try {
        const id = req.params.userId
        const user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        res.status(200).json({ success: true, message: "User removed successfully." })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in fetching the user" })
    }
}

module.exports = { getUsers, getUser, addUser, updateUser, removeUser }