const client = require("../configs/typesense.config");

const collections = [
    {
        name: "users",
        fields: [
            { name: "id", type: "string" },
            { name: "firstName", type: "string" },
            { name: "lastName", type: "string" },
            { name: "email", type: "string", facet: true },
            { name: "profile_id", type: "string", optional: true },
            { name: "createdDate", type: "int64", facet: true }
        ]
    },
    {
        name: "profiles",
        fields: [
            { name: "id", type: "string" },
            { name: "user_id", type: "string", facet: true },
            { name: "profile_info", type: "string" },
            { name: "createdDate", type: "int64", facet: true }
        ]
    },
    {
        name: "enquiries",
        fields: [
            { name: "id", type: "string" },
            { name: "createdBy", type: "string" },
            { name: "teams", type: "string[]" },
            { name: "createdDate", type: "int64", facet: true },
            { name: "expired", type: "bool", facet: true }
        ]
    }
];


const setupCollections = async () => {
    try {
        for (let collection of collections) {
            const existing = await client.collections(collection.name).retrieve().catch(() => null);
            if (!existing) {
                await client.collections().create(collection);
                // await client.collections(collection.name).delete();
                console.log(`Created collection: ${collection.name}`);
            } else {
                console.log(`Collection already exists: ${collection.name}`);
            }
        }
    } catch (error) {
        console.error("Error setting up Typesense collections:", error);
    }
};

setupCollections()
