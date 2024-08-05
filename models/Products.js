// models/Product.js
import { DataTypes } from 'sequelize';
import sequelize from '../lib/db';

const Product = sequelize.define('Product', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img_name: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.TEXT
  },
  link: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  charity_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'charities', // name of the target table
      key: 'id'
    }
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
  tableName: 'products',
  timestamps: false
});

export default Product;
