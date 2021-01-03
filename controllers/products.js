const Product = require("../models/product");

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: "Products",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    editMode: false
  });
};

exports.getEditProduct = (req, res, next) => {
  const productId = req.params.productId; 
  Product.findById(productId).then(product => {    
    res.render('admin/add-product', {
      pageTitle: "Products",
      path: "/admin/add-product",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      product: product,
      editMode: true
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findById(productId).then(product => { 
    product.title = req.body.title;
    product.imageUrl = req.body.imageUrl;
    product.price = req.body.price;
    product.depositRate = req.body.depositRate;
    product.description = req.body.description;
    product.postalCode = req.body.postalCode;
    return product.save();
    }).then(result=>{
      res.redirect('/admin/products');
    }).catch(err=>{
      console.log(err);
    });
  }

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const depositRate = req.body.depositRate;
  const description = req.body.description;
  const postalCode = req.body.postalCode;

  const product = new Product({
    title: title,
    imageUrl: imageUrl,
    price: price,
    depositRate: depositRate,
    description: description,
    postalCode: postalCode,
  });

  product.save(); //this save() method is now defined by mongoose, not us! mongoose will manage saving to db
  res.redirect('/');
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.params.productId;

  Product.findByIdAndDelete(productId).then(result=>{
      res.redirect('/admin/products');
    }).catch(err=>{
      console.log(err);
    });
  }

exports.getProducts = (req, res, next) => {
  Product.find().then(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};