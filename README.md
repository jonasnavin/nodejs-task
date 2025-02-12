# nodejs-task

## Task Setup

To start typesense use the cmd
```
docker run -p 8108:8108 -v //c/typesense-data:/data typesense/typesense:0.24.1 --data-dir=/data --api-key=type_sense_api_key_
```

To start the app
```
npm install
npm run dev
```

## To Test API in Postman

- Open `Postman` app
- `File` -> `Import` -> select the `postman-test-api.json` file

## .env file format

```
MONGODB_URL = mongodb://127.0.0.1:27017/nodejs-task
PORT = 5000

TYPESENSE_HOST = localhost
TYPESENSE_PORT = 8108
TYPESENSE_PROTOCOL = http
TYPESENSE_API_KEY = type_sense_api_key_

MAIL_ADDRESS = // Add gmail address
MAIL_PASSWORD = // Add gmail app password
```