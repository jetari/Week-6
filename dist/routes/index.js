"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get("/doctor/login", function (req, res, next) {
    res.render("login", { title: "Login" });
});
router.get("/doctor/signup", function (req, res, next) {
    res.render("register", { title: "Register" });
});
exports.default = router;
