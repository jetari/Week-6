import {config} from "dotenv";
import createError from "http-errors";
import express, {Request, Response, NextFunction} from "express";
import path from "path";
import cookieParser from "cookie-parser";
// import logger from "morgan";
import sequelize from "./config/database.config";

import indexRouter  from "./routes/index";
import doctorRouter  from "./routes/doctor";
import reportRouter from "./routes/report";

config();
import { DataTypes, Model } from "sequelize/types";


sequelize.sync({ alter: true }).then(() => {
  console.log("Database & tables created!");
}).catch((err) => {
  console.log("Error synching with database");
  throw err;
});



const app = express();

app.set('views', path.join(__dirname, '..', 'views'));

app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/doctor', doctorRouter);
app.use('/report', reportRouter);
// app.use("/doctor/register", RegisterRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err: any, req: Request, res: Response, next: NextFunction) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

export default app;
