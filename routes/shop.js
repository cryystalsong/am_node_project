const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  // console.log('shop.js', adminData.products);
  // res.sendFile(path.join(rootDir, 'views', 'shop.html'));

  // defined 'pug' as the default render engine, 
  // also no need to define path to 'shop' since we already previously defined views to be within the dir `view`
  res.render('shop',{
    pageTitle: "Shop",
    products: adminData.products,
    path: "/",
    hasProducts: adminData.products.length > 0,
    productCSS: true,
    activeShop: true 
  }); 
});

module.exports = router;
