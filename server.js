const express = require('express')
const userRouter = require('./routes/users.route')
const profilesRouter = require('./routes/profiles.route')
const enquiriesRouter = require('./routes/enquiries.route')
const { connectDB } = require('./db/connectDB')
const { PORT } = require('./configs/env.config')
const searchRouter = require('./routes/search.route')
const checkAndExpireEnquiries = require('./utils/checkAndExpireEnquiries')
const enquiryTeamsRouter = require('./routes/enquiryTeams.route')
const activityLogger = require('./middlewares/activityLogger')
const errorHandler = require('./middlewares/errorHandler')

const app = express()

app.use(express.json())
app.use(activityLogger)

app.use('/api/users', userRouter)
app.use('/api/profiles', profilesRouter)
app.use('/api/enquiries', enquiriesRouter)
app.use('/api/enquiry', enquiryTeamsRouter)
app.use('/api/search', searchRouter)

app.get('/', (req, res) => {
    res.send("Server running successfully")
})

connectDB()
checkAndExpireEnquiries()

app.use(errorHandler)

app.listen(PORT || 5000, () => {
    console.log(`App is running in the port ${PORT || 5000}`)
})