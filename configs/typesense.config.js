const Typesense = require('typesense');
const {
    TYPESENSE_HOST,
    TYPESENSE_PORT,
    TYPESENSE_PROTOCOL,
    TYPESENSE_API_KEY
} = require('./env.config');

const client = new Typesense.Client({
    nodes: [
        {
            host: TYPESENSE_HOST || 'localhost',
            port: TYPESENSE_PORT || '8108',
            protocol: TYPESENSE_PROTOCOL || 'http',
        }
    ],
    apiKey: TYPESENSE_API_KEY,
    connectionTimeoutSeconds: 5
});

module.exports = client;
