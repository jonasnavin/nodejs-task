const logActivity = require("../utils/fileLogger")

const activityLogger = (req, res, next) => {
    const logMessage = `Method: ${req.method}, URL: ${req.originalUrl}, Body: ${JSON.stringify(req.body)}`
    logActivity(logMessage)
    next()
}

module.exports = activityLogger