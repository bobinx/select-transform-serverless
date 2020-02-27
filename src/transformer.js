const ST = require('stjs');
const AWS = require('aws-sdk');
const uuid = require('uuid');

const bucketKey = "seltrans";
const bucketName = bucketKey + "-bucket";

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const selectTransform = function (data, template) {
    return ST.select(data)
        .transformWith(template)
        .root();
};

const uploadToS3 = function (res, data) {

    let keyName = bucketKey + '-' + uuid.v4() + '.json';
    let objectParams = {
        Bucket: bucketName,
        Key: keyName,
        Body: JSON.stringify(data)
    };

    let uploadPromise = s3.putObject(objectParams).promise();

    uploadPromise.then(function (data) {
        console.log("Uploaded data to " + bucketName + "/" + keyName);
        console.log(data);
        res.status(200).json({url: s3.getSignedUrl('getObject', {Bucket: bucketName, Key: keyName})});
    }).catch(function (err) {
        throw(err);
    });
};

const transform = function (req, res) {
    let data = req.body.data;
    let template = req.body.template;
    console.log("Transforming..")
    let transformed = selectTransform(data, template);
    console.log("Uploading..")
    return uploadToS3(res, transformed);
};

module.exports = transform;