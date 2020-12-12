const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const fs = require('fs'); //allows us to save to a FILE instead of array here
const path = require('path');
const rootDir = require('../util/path');

let _db; 

exports.getDbCredentials = (callback) => {
    const credentialsPath = path.join(rootDir, 'credentials.json'); 
    fs.readFile(credentialsPath, (err, fileContent) => {
        if (err) {
            console.log(err);
        } else {
            credentialObject = JSON.parse(fileContent);
            callback(`mongodb+srv://${credentialObject.db_username}:${credentialObject.db_password}@${credentialObject.db_name}.j9pmr.mongodb.net/Cluster0?retryWrites=true&w=majority`)           
        }
    });
}

const mongoConnect = (callback) => {
    this.getDbCredentials(connectionPath => {
        MongoClient.connect(connectionPath)
            .then(client => {
                console.log("mongodb connection successful!")
                _db = client.db();
                callback(); //no need to return client here anymore, since it's stored in _db, but still need to pass a callback to know that this is completed 
            }).catch(err => {
                console.log(err);
            });
    });
}

const getDb = () => {
    if (_db) {
        return _db; 
    }
    throw 'No database found'
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;