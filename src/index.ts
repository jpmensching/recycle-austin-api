import bodyParser from 'body-parser';
import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-http-bearer';
import { Sequelize } from 'sequelize';
import { authRouter } from './auth';
import { userRouter } from './user';
import { User, initUsers } from './models';

const sequelize = new Sequelize('sqlite::memory:');
const passportStrategy = new Strategy(async (token, done) => {
  const user = await User.findOne({
    where: {
      token
    }
  });
  if (!user) {
    return done(null, false);
  }
  return done(null, user);
});

passport.use(passportStrategy);

async function start() {
  await initDb();
  const app = express();

  app.use(bodyParser.json());

  app.get('/', (req, res) => {
    res.send('Welcome to Recycle Austin!');
  });

  app.use(userRouter);
  app.use(authRouter);

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