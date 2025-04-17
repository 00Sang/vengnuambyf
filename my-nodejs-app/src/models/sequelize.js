import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,         
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432, 
  username: process.env.DB_USERNAME,     
  password: process.env.DB_PASSWORD,     
  database: process.env.DB_DATABASE,     
  logging: false,
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
