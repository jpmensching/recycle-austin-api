"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const sequelize_1 = require("sequelize");
const models_1 = require("./models");
const sequelize = new sequelize_1.Sequelize('sqlite::memory:');
async function start() {
    await initDb();
    const app = express_1.default();
    app.use(body_parser_1.default.json());
    app.get('/', (req, res) => {
        res.send('Welcome to Recycle Austin!');
    });
    app.post('/login', async (req, res) => {
        const user = await models_1.User.findOne({
            where: {
                username: req.body.username
            }
        });
        if (!user) {
            res.status(400).json({
                error: 'User not found!'
            });
            return;
        }
        const token = (new Date()).getMilliseconds();
        await user.update({
            token
        });
        res.json(user);
    });
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
