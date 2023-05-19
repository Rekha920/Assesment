require('dotenv').config()
require('./src/hijacker.console')
const express = require('express');
const router = require('./src/routers/main.router');
const { default: mongoose } = require('mongoose');
const trimAllDataMD = require('./src/middleware/trim.middleware');
const port = process.env.PORT || 4000;
async function server() {
    try {
        const app = express();
        app.use(express.json({ limit: '10mb' })); // use to get contents from api (body, params, query etc...
        app.use(trimAllDataMD); // use to trim all body, query and params
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('MongoDB is connected.');
        app.use('/', router);
        app.listen(port, () => console.log(`Server connected with ${port}`));
    } catch (error) {
        console.error(error);
    }
}

server();