const express = require("express");
const router = express.Router();
const {
  getProducts,
  setProducts,
  updateProducts,
  deleteProducts,
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
router.put("/:id", protect, updateProducts);
router.delete("/:id", protect, deleteProducts);
router.route("/").get(protect, getProducts).post(protect, setProducts);

module.exports = router;
