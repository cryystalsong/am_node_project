// const path = require('path');
// const rootDir = require('../util/path');

const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  res.render('add-product', {
    pageTitle: "Products",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  new Product(req.body.title).save();
  res.redirect('/');
};

exports.getShop = (req, res, next) => {
  // console.log('shop.js', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  Product.fetchAll((products)=> {
    res.render('shop', {
      pageTitle: "Shop",
      products: products,
      path: "/",
      hasProducts: products.length > 0,
      productCSS: true,
      activeShop: true
    });    
  });
}