// models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  is_deleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  user_type: {
    type: DataTypes.CHAR,
    allowNull: false
  }
}, {
  tableName: 'users',
  timestamps: false
});

export default User;
