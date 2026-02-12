const Warranty = require("../models/warranty.model");
const User = require("../models/user.model");

const getUserFromRequest = async (req) => {
  const email = req.headers["x-user-email"];

  if (!email || typeof email !== "string") {
    return null;
  }

  return User.findOne({ where: { email } });
};

exports.createWarranty = async (req, res) => {
  try {
    const { productName, serialNumber, purchaseDate, warrantyMonths } = req.body;

    if (!productName || !serialNumber || !purchaseDate || !warrantyMonths) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + Number(warrantyMonths));
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).json({ message: "Please login to add warranties" });
    }

    const warranty = await Warranty.create({
      productName,
      serialNumber,
      purchaseDate,
      warrantyMonths,
      expiryDate,
      userId: user.id,
    });

    res.status(201).json(warranty);
  } catch (err) {
    res.status(500).json({ message: "Warranty creation failed" });
  }
};

exports.getWarranties = async (req, res) => {
  try {
    const user = await getUserFromRequest(req);

    if (!user) {
      return res.status(401).json({ message: "Please login to view warranties" });
    }

    const warranties = await Warranty.findAll({
      where: { userId: user.id },
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(warranties);
  } catch (err) {
    return res.status(500).json({ message: "Failed to fetch warranties" });
  }
};
