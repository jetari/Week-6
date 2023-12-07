"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
const http_errors_1 = __importDefault(require("http-errors"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// import logger from "morgan";
const database_config_1 = __importDefault(require("./config/database.config"));
const index_1 = __importDefault(require("./routes/index"));
const doctor_1 = __importDefault(require("./routes/doctor"));
const report_1 = __importDefault(require("./routes/report"));
(0, dotenv_1.config)();
database_config_1.default.sync({ alter: true }).then(() => {
    console.log("Database & tables created!");
}).catch((err) => {
    console.log("Error synching with database");
    throw err;
});
const app = (0, express_1.default)();
app.set('views', path_1.default.join(__dirname, '..', 'views'));
app.set('view engine', 'jade');
// app.use(logger('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use('/', index_1.default);
app.use('/doctor', doctor_1.default);
app.use('/report', report_1.default);
// app.use("/doctor/register", RegisterRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});
exports.default = app;
