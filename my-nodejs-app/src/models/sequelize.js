import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Use the DATABASE_URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
  ssl: true, // Required for NeonDB
  dialectOptions: {
    ssl: {
      require: true, // This helps with SSL issues on Neon
      rejectUnauthorized: false // Use with caution in production
    }
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export default sequelize;
