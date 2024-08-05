// models/Charity.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const Charity = sequelize.define('Charity', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img_name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  about: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  contact1: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  contact2: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  highlighted: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  listed: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  is_active: {
    type: DataTypes.TINYINT,
    defaultValue: 1
  },
  is_deleted: {
    type: DataTypes.TINYINT,
    defaultValue: 0
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  tableName: 'charities',
  timestamps: false
});

export default Charity;
