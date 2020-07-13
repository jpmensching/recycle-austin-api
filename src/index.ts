import Express from 'express';
import { Sequelize, DataTypes } from 'sequelize';
import { User } from './models/user';

initDb();

const app = Express();

app.get('/', (req, res) => {
  res.send('Welcome to Recycle Austin!');
});

app.listen(3000);
console.log('App started on port 3000.');

async function initDb() {
  const sequelize = new Sequelize('sqlite::memory:');
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, { sequelize, modelName: 'user' });

  await sequelize.sync();
  const jane = await User.create({
    username: 'Jane',
    password: 'password'
  });
  console.log(jane.toJSON());
}