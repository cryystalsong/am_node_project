const fs = require('fs'); //allows us to save to a FILE instead of array here
const path = require('path');
const rootDir = require('../util/path');

const productsPath = path.join(rootDir, 'data', 'product.json');

const getProducts = (callback) => {
    fs.readFile(productsPath, (err, fileContent) => {
        if (err) {
            console.log(err);
            return callback([]);
        }
        callback(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProducts((products) => {
            products.push(this);
            fs.writeFile(productsPath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProducts(callback);
    }
}