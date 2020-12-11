const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
// const expressHBs = require('express-handlebars');

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

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404',{pageTitle: "Page Not Found", path: ""});
});

app.listen(4000);
