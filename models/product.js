const fs = require('fs'); //allows us to save to a FILE instead of array here
const path = require('path');
const rootDir = require('../util/path');

const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

const productsPath = path.join(rootDir, 'data', 'product.json');

const getProducts = (callback) => {
    fs.readFile(productsPath, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Product {
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        const db = getDb();
        return db.collection('products') //connects to existing 'products' collection, else creates a new collection 
            .insertOne(this)
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static findById(productId, callback) {
        const db = getDb();
        db.collection('products').find({
            _id: new mongodb.ObjectID(productId)
            })
            .next()
            .then(product => {
                callback(product);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll(callback) {
        const db = getDb();
        db.collection('products').find()
            .toArray()
            .then(products => {
                callback(products);
            })
            .catch(err => {
                console.log(err);
            });
    }
};