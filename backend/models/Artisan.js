const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Artisan = sequelize.define('Artisan', {

  id_artisan: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nom: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  note: {
    type: DataTypes.DECIMAL(2, 1),
    validate: {
      min: 0,
      max: 5
    }
  },

  ville: {
    type: DataTypes.STRING(100),
    allowNull: false
  },

  apropos: {
    type: DataTypes.TEXT
  },

  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    validate: {
      isEmail: true
    }
  },

  site_web: {
    type: DataTypes.STRING(255),
    allowNull: true
  },

  top: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },

  id_specialite: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: 'artisan',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Artisan;