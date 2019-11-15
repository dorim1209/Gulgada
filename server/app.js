var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var joinRouter = require("./routes/join");
var sequelize = require("./models").sequelize;
var articleRouter = require("./routes/article");
var loginRouter = require("./routes/login");
var mypageRouter = require("./routes/mypage");
var uploadRouter = require("./routes/upload");
var timelogRouter = require("./routes/timelog");
var startTimelogRouter = require("./routes/startTimelog");
var totalTimelogRouter = require("./routes/totalTimelog");
var articleDetailRouter = require("./routes/articleDetail");
var applyRouter = require("./routes/apply");
var createcontractRouter = require("./routes/createcontract");
var myapplylistRouter = require("./routes/myapplylist");
var signContractRouter = require("./routes/signContract");
var queryContractRouter = require("./routes/queryContract");
var jobSeekerListRouter = require("./routes/jobSeekerList");

var app = express();
sequelize.sync();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "upload")));

app.use("/article", articleRouter);
app.use("/join", joinRouter);
app.use("/mypage", mypageRouter);
app.use("/login", loginRouter);
app.use("/upload", uploadRouter);
app.use("/timelog", timelogRouter);
app.use("/startTimelog", startTimelogRouter);
app.use("/totalTimelog", totalTimelogRouter);
app.use("/articleDetail", articleDetailRouter);
app.use("/apply", applyRouter);
app.use("/createcontract", createcontractRouter);
app.use("/myapplylist", myapplylistRouter);
app.use("/signContract", signContractRouter);
app.use("/queryContract", queryContractRouter);
app.use("/jobSeekerList", jobSeekerListRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
