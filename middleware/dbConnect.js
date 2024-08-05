// middleware/connectDb.js
import sequelize from '../lib/db.js';

const connectDb = handler => async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection to MySQL has been established successfully.');
    return handler(req, res);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    return res.status(500).json({ message: 'Database connection error' });
  }
}

export default connectDb;
