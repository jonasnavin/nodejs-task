const cron = require("node-cron")
const User = require("../models/users.model")
const Enquiry = require("../models/enquiries.model")
const sendExpiryEmail = require("../services/sendExpiryMail")

const checkAndExpireEnquiries = async () => {
    try {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const expiredEnquiries = await Enquiry.find({
            createdDate: { $lte: sevenDaysAgo },
            expired: false
        })

        if (expiredEnquiries.length === 0) {
            console.log("No enquiries to expire.")
            return
        }

        for (const enquiry of expiredEnquiries) {
            enquiry.expired = true
            await enquiry.save()

            const user = await User.findById(enquiry.createdBy)
            if (user) {
                await sendExpiryEmail(user.email, enquiry._id)
            }
        }

        console.log(`${expiredEnquiries.length} enquiries marked as expired.`)
    } catch (error) {
        console.error("Error in enquiry expiry job:", error)
    }
}

cron.schedule("30 18 * * *", () => {
    checkAndExpireEnquiries()
}, {
    timezone: "UTC"
})

module.exports = checkAndExpireEnquiries
