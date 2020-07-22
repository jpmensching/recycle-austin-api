import bodyParser from 'body-parser';
import express from 'express';
import { Sequelize } from 'sequelize';
import { User, initUsers } from './models';

const sequelize = new Sequelize('sqlite::memory:');

async function start() {
  await initDb();
  const app = express();

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Welcome to Recycle Austin!');
  });

  app.post('/login', async (req, res) => {
    const user = await User.findOne({
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
  initUsers(sequelize);
  await sequelize.sync();
  const jane = new User({
    username: 'Jane',
    password: 'password',
    token: null
  });
  await jane.save();
  console.log(await User.findAll());
}

start();