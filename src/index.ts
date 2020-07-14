import express from 'express';
import { Sequelize } from 'sequelize';
import { User, initUsers } from './models';

const sequelize = new Sequelize('sqlite::memory:');

async function start() {
  await initDb();
  const app = express();

  app.get('/', (req, res) => {
    res.send('Welcome to Recycle Austin!');
  });

  app.listen(3000);
  console.log('Starting on port 3000');
}

async function initDb() {
  initUsers(sequelize);
  await sequelize.sync();
  const jane = new User({
    username: 'Jane',
    password: 'password'
  });
  await jane.save();
  console.log(await User.findAll());
}

start();