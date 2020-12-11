// const path = require('path');
// const rootDir = require('../util/path');

const products = [];

exports.getAddProduct = (req, res, next) => {
    // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
    res.render('add-product',{
      pageTitle: "Products",
      path: "/admin/add-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  };

exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title });
    res.redirect('/');
};

exports.getShop = (req, res, next) => {
    // console.log('shop.js', adminData.products);
    // res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  
    // defined 'pug' as the default render engine, 
    // also no need to define path to 'shop' since we already previously defined views to be within the dir `view`
    res.render('shop',{
      pageTitle: "Shop",
      products: products,
      path: "/",
      hasProducts: products.length > 0,
      productCSS: true,
      activeShop: true 
    }); 
  }