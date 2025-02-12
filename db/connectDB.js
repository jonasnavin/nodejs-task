const mongoose = require("mongoose")
const { MONGODB_URL } = require("../configs/env.config")
const watchCollection = require("../services/typesenseWatcher")

exports.connectDB = async () => {
    try {
        const conn = await mongoose.connect(MONGODB_URL)
        console.log("MongoDB Connected:", conn.connection.host)
        watchCollection()
    } catch (error) {
        console.error('MongoDB connection error:', error)
        process.exit(1)
    }
}