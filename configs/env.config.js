const dotenv = require("dotenv")

dotenv.config()

exports.MONGODB_URL = process.env.MONGODB_URL
exports.PORT = process.env.PORT
exports.TYPESENSE_HOST = process.env.TYPESENSE_HOST
exports.TYPESENSE_PORT = process.env.TYPESENSE_PORT
exports.TYPESENSE_PROTOCOL = process.env.TYPESENSE_PROTOCOL
exports.TYPESENSE_API_KEY = process.env.TYPESENSE_API_KEY
exports.MAIL_ADDRESS = process.env.MAIL_ADDRESS
exports.MAIL_PASSWORD = process.env.MAIL_PASSWORD