"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const passport_http_bearer_1 = require("passport-http-bearer");
const sequelize_1 = require("sequelize");
const controllers_1 = require("./controllers");
const models_1 = require("./models");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
const passportStrategy = new passport_http_bearer_1.Strategy(async (token, done) => {
    const user = await models_1.User.findOne({
        where: {
            token
        }
    });
    if (!user) {
        return done(null, false);
    }
    return done(null, user);
});
passport_1.default.use(passportStrategy);
async function start() {
    await initDb();
    const app = express_1.default();
    app.use(body_parser_1.default.json());
    app.get('/', (req, res) => {
        res.send('Welcome to Recycle Austin!');
    });
    controllers_1.registerUserRoutes(app);
    controllers_1.registerAuthRoutes(app);
    app.listen(3000);
    console.log('Starting on port 3000');
}
async function initDb() {
    models_1.initUsers(sequelize);
    await sequelize.sync();
    const jane = new models_1.User({
        username: 'Jane',
        password: 'password',
        token: null
    });
    await jane.save();
    console.log(await models_1.User.findAll());
}
start();
