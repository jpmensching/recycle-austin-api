import { Sequelize } from 'sequelize';
import { User, initUsers } from '../app/user';

const sequelize = new Sequelize('sqlite::memory:');

export async function initDb() {
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