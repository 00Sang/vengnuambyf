import express from 'express';
import morgan from 'morgan'; // Import Morgan
import router from './my-nodejs-app/src/routes/mainRouter.js';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './my-nodejs-app/src/models/sequelize.js'; // Ensure you have the correct path to your sequelize.js file

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Setup Morgan logging middleware
// Use 'combined' for detailed logs or 'dev' for concise colored logs
app.use(morgan('dev'));

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", router);

// Sync the database before starting the server
sequelize.sync({ force: false })
  .then(() => {
    console.log("Database synced successfully!");
  })
  .catch((err) => {
    console.error("Error syncing database:", err);
  });

// Simple middleware to log all requests (already covered by Morgan, but retained here if needed)
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
