const express = require("express");
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
// const createError = require('http-errors');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// TODO: uncomment after placing favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Use CORS and File Upload modules here
app.use(cors());
app.use(fileUpload());

// app.use(express.static(path.join(__dirname, 'public')));
app.use("/public", express.static(__dirname + "/public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

app.post("/upload", (req, res, next) => {
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, err => {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({
      file: `public/${req.body.filename}.jpg`
    });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
  // next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
