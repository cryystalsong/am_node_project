const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHBs = require('express-handlebars');
const mongoConnect = require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views/ejs-views');

/* HANDLEBARS 
express handle bars is not built in, so must explicitly register it w/ node */
// app.engine(
//     'hbs', //'hbs' is arbitrarily given here, also becomes the file type .hbs 
//     expressHBs({ 
//         layoutsDir: 'views/hbs-views/layouts', 
//         defaultLayout: 'main-layout',
//         extname: 'hbs'
//     })
// ); 
// app.set('view engine', 'hbs');
// app.set('views', 'views/hbs-views');

// PUG
// app.set('view engine', 'pug');
// app.set('views', 'views/pug-views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorsController = require('./controllers/errors');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

mongoConnect((client)=>{
    app.listen(4000);
});
