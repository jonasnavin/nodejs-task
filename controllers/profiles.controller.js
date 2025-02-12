const Profile = require("../models/profiles.model")
const User = require("../models/users.model")

const getProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find()
        res.status(200).json({ success: true, profiles })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error in fetching the profiles" })
    }
}

const addProfile = async (req, res) => {
    try {
        const { user_id } = req.body
        const user = await User.findById(user_id)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }

        const existingProfile = await Profile.findOne({ user_id })
        if (existingProfile) {
            return res.status(400).json({ success: false, message: "Profile already exists for this user." })
        }

        const profile = new Profile(req.body)
        await profile.save()

        user.profile_id = profile
        await user.save()

        res.status(201).json({ succcess: true, message: "Profile created Successfully", profile })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error getting profile." })
    }
}

const updateProfile = async (req, res) => {
    try {
        const id = req.params.profileId
        const profile = await Profile.findByIdAndUpdate(
            id,
            { ...req.body, updatedDate: Date.now() },
            { new: true, runValidators: true }
        )
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" })
        }
        res.status(200).json({ success: true, profile })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error updating profile" })
    }
}

const removeProfile = async (req, res) => {
    try {
        const id = req.params.profileId

        const profile = await Profile.findByIdAndDelete(id)
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" })
        }

        const user = await User.findById(profile.user_id)
        if (!user) {
            return res.json(404).json({ success: false, message: "User not found" })
        }
        user.profile_id = null
        await user.save()

        res.status(200).json({ success: true, message: "Profile removed successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Error updating profile" })
    }
}

module.exports = { getProfiles, addProfile, updateProfile, removeProfile }