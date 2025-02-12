const mongoose = require("mongoose")
const client = require("../configs/typesense.config")

const watchCollection = () => {
    const db = mongoose.connection
    console.log("Watching MongoDB collections for changes...")

    db.collection("users").watch().on("change", async (change) => {
        console.log("User Collection Change Detected:", change)
        await handleTypesenseUpdate(change, "users")
    })

    db.collection("profiles").watch().on("change", async (change) => {
        console.log("Profile Collection Change Detected:", change)
        await handleTypesenseUpdate(change, "profiles")
    })

    db.collection("enquiries").watch().on("change", async (change) => {
        console.log("Enquiry Collection Change Detected:", change)
        await handleTypesenseUpdate(change, "enquiries")
    })
}

const handleTypesenseUpdate = async (change, collectionName) => {
    try {
        if (change.operationType === "insert") {
            const newData = change.fullDocument
            newData.createdDate = Math.floor(new Date(newData.createdDate).getTime() / 1000)
            await client.collections(collectionName).documents().create(newData)
            console.log(`Inserted into Typesense: ${collectionName}`)
        }
        else if (change.operationType === "update") {
            const updatedData = await mongoose.connection
                .collection(collectionName)
                .findOne({ _id: change.documentKey._id })
            updatedData.createdDate = Math.floor(new Date(updatedData.createdDate).getTime() / 1000)
            await client.collections(collectionName).documents().upsert(updatedData)
            console.log(`Updated in Typesense: ${collectionName}`)
        }
        else if (change.operationType === "delete") {
            await client.collections(collectionName).documents(change.documentKey._id.toString()).delete()
            console.log(`Deleted from Typesense: ${collectionName}`)
        }
    } catch (error) {
        console.error("Error syncing with Typesense:", error)
    }
}


module.exports = watchCollection
