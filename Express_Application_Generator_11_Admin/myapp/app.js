var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var mongoose = require('mongoose');
var fileUpload = require('express-fileupload');

// Create Index Router
var indexRouter = require('./routes/index');

// Create Admin Routers
var adminRouter = require('./routes/admin');

// Create Category Routers
var categoryRouter = require('./routes/category');

// Create Sub-Category Routers
var subCategoryRouter = require('./routes/subCategory');

// Create Product Routers
var productRouter = require('./routes/product');

// Create FAQ Routers
var faqRouter = require('./routes/faq');

// Create User Routers
// var userRouter = require('./routes/user');

// Create Country Routers
var countryRouter = require('./routes/country');

// Create State Routers
var stateRouter = require('./routes/state');

// Create City Router
var cityRouter = require('./routes/city');

// Create Area Router
var areaRouter = require('./routes/area');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(fileUpload());

//DB Connection Start
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ProjectDb', { useNewUrlParser: true })
  .then(() => console.log('CONNECTION SUCCESSFUL'))
  .catch((err) => console.log(err))
//DB Connection End


// Uses Index Router
app.use('/', indexRouter);

// Uses Admin Routers
app.use('/admin', adminRouter);

// Uses Category Routers
app.use('/category', categoryRouter);

// Uses Sub-Category Routers
app.use('/subCategory', subCategoryRouter);

// Uses Product Routers
app.use('/product', productRouter);

// Uses FAQ Routers
app.use('/faq', faqRouter);

// Uses User Routers
// app.use('/user', userRouter);

// Uses Country Routers
app.use('/country', countryRouter);

// Uses State Routers
app.use('/state', stateRouter);

// Uses City Routers
app.use('/city', cityRouter);

// Uses Area Routers
app.use('/area', areaRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
