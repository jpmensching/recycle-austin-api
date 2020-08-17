import { Sequelize } from 'sequelize';
import { Location, initLocations } from '../app/locations';
import { User, initUsers } from '../app/users';

const sequelize = new Sequelize('sqlite::memory:');

export async function initDb() {
  initLocations(sequelize);
  initUsers(sequelize);
  await sequelize.sync();
  await seedLocations();
  await seedUsers();
}

async function seedUsers() {
  const jane = new User({
    username: 'Jane',
    password: 'password',
    token: null
  });
  await jane.save();
}

async function seedLocations() {
  const austinResourceRecovery = new Location({
    name: 'Austin Resource Recovery'
  });
  await austinResourceRecovery.save();
}