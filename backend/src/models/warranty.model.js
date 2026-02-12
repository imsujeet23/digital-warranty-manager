const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Warranty = sequelize.define("Warranty", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  serialNumber: {
    type: DataTypes.STRING,
    // Keep nullable for existing records during schema evolution.
    // New records are still validated in the controller.
    allowNull: true,
  },
  purchaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  warrantyMonths: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  expiryDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

User.hasMany(Warranty, { foreignKey: "userId" });
Warranty.belongsTo(User, { foreignKey: "userId" });

module.exports = Warranty;
