const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const {getDbCredentials} = require('./util/database');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorsController = require('./controllers/errors');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

getDbCredentials(connectionPath => {
    mongoose.connect(connectionPath).then(result=>{
        app.listen(4000);
    });
});
