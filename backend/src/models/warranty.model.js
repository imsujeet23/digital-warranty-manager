const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const Warranty = sequelize.define("Warranty", {
  productName: {
    type: DataTypes.STRING,
    allowNull: false,
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
