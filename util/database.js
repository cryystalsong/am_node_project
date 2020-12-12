const fs = require('fs'); //allows us to save to a FILE instead of array here
const path = require('path');
const rootDir = require('../util/path');

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
