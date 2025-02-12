const mongoose = require("mongoose")
const User = require("../models/users.model")
const client = require("../configs/typesense.config")
const Profile = require("../models/profiles.model")
const Enquiry = require("../models/enquiries.model")
const { MONGODB_URL } = require("../configs/env.config")

const syncUsers = async () => {
    try {
        const users = await User.find()
        if (users.length === 0) return console.log("No users to sync")

        const formattedUsers = users.map(user => ({
            id: user._id.toString(),
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            profile_id: user.profile_id?.toString() || "",
            createdDate: Math.floor(new Date(user.createdDate).getTime() / 1000),
        }))

        await client.collections("users").documents().import(formattedUsers, { action: "upsert" })
        console.log("Users synced successfully")
    } catch (error) {
        console.error("Error syncing users:", error)
    }
}

const syncProfiles = async () => {
    try {
        const profiles = await Profile.find()
        if (profiles.length === 0) return console.log("No profiles to sync")

        const formattedProfiles = profiles.map(profile => ({
            id: profile._id.toString(),
            user_id: profile.user_id.toString(),
            profile_info: profile.profile_info,
            createdDate: Math.floor(new Date(profile.createdDate).getTime() / 1000),
        }))

        await client.collections("profiles").documents().import(formattedProfiles, { action: "upsert" })
        console.log("Profiles synced successfully")
    } catch (error) {
        console.error("Error syncing profiles:", error)
    }
}

const syncEnquiries = async () => {
    try {
        const enquiries = await Enquiry.find()
        if (enquiries.length === 0) return console.log("No enquiries to sync")

        const formattedEnquiries = enquiries.map(enquiry => ({
            id: enquiry._id.toString(),
            createdBy: enquiry.createdBy.toString(),
            teams: enquiry.teams || [],
            createdDate: Math.floor(new Date(enquiry.createdDate).getTime() / 1000),
            expired: enquiry.expired
        }))
        await client.collections("enquiries").documents().import(formattedEnquiries, { action: "upsert" })
        console.log("Enquiries synced successfully")
    } catch (error) {
        console.error("Error syncing enquiries:", error)
    }
}

const syncAllData = async () => {

    await mongoose.connect(MONGODB_URL)

    await syncUsers()
    await syncProfiles()
    await syncEnquiries()

    mongoose.connection.close()
}

syncAllData()