import { Sequelize } from 'sequelize';

const dbName = process.env.DB_NAME || 'postgres';
const dbUser = process.env.DB_USER || 'postgres';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPassword = process.env.DB_PASSWORD || 'postgres';

const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.DB_SSL === 'true',
  },
});

export default sequelizeConnection;
