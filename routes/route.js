const express = require('express');
const router = express.Router();

const preSignedUri = require('../src/transformer');

const validateRequest = function (req, res) {
    if (Object.keys(req.body).length === 0) {
        res.status(400).json({code: 'BAD_REQUEST', message: "data and template missing"});
        return
    }
    if (!req.body.data) {
        res.status(400).json({code: 'BAD_REQUEST', message: "data not sent"});
        return
    }
    if (!req.body.template) {
        res.status(400).json({code: 'BAD_REQUEST', message: "template not sent"});
        return
    }
};

router.post('/', function (req, res) {
    try {
        validateRequest(req, res);
        preSignedUri(req, res)
    } catch (err) {
        console.log(err);
        res.status(500).json({code: 'INTERNAL_SERVER_ERROR', message: "Internal Error"})
    }
});

module.exports = router;
