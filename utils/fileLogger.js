const fs = require("fs")
const path = require("path")

const logFilePath = path.join(__dirname, "../logs")

function logActivity(message) {
    const timestamp = new Date().toISOString()
    const logMessage = `[${timestamp}] ${message}\n`

    if (!fs.existsSync(logFilePath)) {
        fs.mkdirSync(logFilePath)
    }

    fs.appendFile(path.join(logFilePath, "logs.txt"), logMessage, (err) => {
        if (err) {
            console.error("Error writing to log file:", err)
        }
    })
}

module.exports = logActivity
