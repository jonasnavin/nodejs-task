const client = require("../configs/typesense.config")

const searchUser = async (req, res) => {
    try {
        const { query } = req.query
        if (!query) return res.status(400).json({ error: "Query parameter is required" })

        const searchParameters = {
            q: query,
            query_by: "firstName,lastName,email",
        }

        const result = await client.collections("users").documents().search(searchParameters)
        if (result.hits.length !== 0) {
            res.json(result.hits.map(hit => hit.document))
        }
        else {
            res.json({ message: "No results" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const searchProfile = async (req, res) => {
    try {
        const { query } = req.query
        if (!query) return res.status(400).json({ error: "Query parameter is required" })

        const searchParameters = {
            q: query,
            query_by: "profile_info",
        }

        const result = await client.collections("profiles").documents().search(searchParameters)
        if (result.hits.length !== 0) {
            res.json(result.hits.map(hit => hit.document))
        }
        else {
            res.json({ message: "No results" })
        }
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const searchAll = async (req, res) => {
    try {
        const { query } = req.query
        if (!query) return res.status(400).json({ error: "Query parameter is required" })

        const collections = ["users", "profiles"]
        let results = {}

        for (let collection of collections) {
            const searchParameters = {
                q: query,
                query_by: collection === "users" ? "firstName,lastName,email" : "profile_info",
            }
            const result = await client.collections(collection).documents().search(searchParameters)
            results[collection] = result.hits.map(hit => hit.document)
        }

        res.json(results)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

module.exports = { searchUser, searchProfile, searchAll }