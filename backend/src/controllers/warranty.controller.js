const Warranty = require("../models/warranty.model");

exports.createWarranty = async (req, res) => {
  try {
    const { productName, purchaseDate, warrantyMonths } = req.body;

    if (!productName || !purchaseDate || !warrantyMonths) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const expiryDate = new Date(purchaseDate);
    expiryDate.setMonth(expiryDate.getMonth() + Number(warrantyMonths));

   const warranty = await Warranty.create({
    productName,
    purchaseDate,
    warrantyMonths,
    expiryDate,
    userId: 1, // temporary fixed user for Phase 3
});

    res.status(201).json(warranty);
  } catch (err) {
    res.status(500).json({ message: "Warranty creation failed" });
  }
};
