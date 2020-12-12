const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const fs = require('fs'); //allows us to save to a FILE instead of array here
const path = require('path');
const rootDir = require('../util/path');

const credentialsPath = path.join(rootDir, 'credentials.json'); 

const mongoConnect = (callback) => {
    fs.readFile(credentialsPath, (err, fileContent) => {
        if (err) {
            console.log(err);
        } else {
            credentialObject = JSON.parse(fileContent);
            MongoClient.connect(
                `mongodb+srv://${credentialObject.db_username}:${credentialObject.db_password}@${credentialObject.db_name}.j9pmr.mongodb.net/Cluster0?retryWrites=true&w=majority`
            ).then(client => {
                console.log("mongodb connection successful!")
                callback(client);
            }).catch(err => {
                console.log(err);
            });
        }
    });
}

module.exports = mongoConnect;