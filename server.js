const express = require('express');
const router = require('./routes/route');
const serverless = require('serverless-http');

const app = express();
// Object.defineProperty(exports, "__esModule", {value: true});

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/', router);

module.exports.handler = serverless(app);
// app.listen(3000, function () {
//     console.log('Server running')
// });
