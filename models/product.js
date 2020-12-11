const fs = require('fs'); //allows us to save to a FILE instead of array here
const path = require('path');
const rootDir = require('../util/path');

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
        this.id = Math.random().toString();
        getProducts((products) => {
            products.push(this);
            fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }
    
    static findById(productId, callback) {
        getProducts(products => {
            let product = products.find(product => product.id == productId);
            callback(product);
        });
    }

    static fetchAll(callback) {
        getProducts(callback);
    }
};