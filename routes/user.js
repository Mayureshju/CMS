const express = require("express");
const router = express.Router();
const { signup, login } = require("../Controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const { addProduct, editProduct, getSingleProduct, getAllProducts } = require("../Controllers/Product");
const {addOrder,deleteOrder} = require('../Controllers/Order')

//tested
router.post("/signup", signup);
router.post("/login", login);



router.post("/addproduct", addProduct);
router.put("/editproduct", editProduct);
router.get("/getsingleproduct", getSingleProduct);
router.get("/getallproduct", getAllProducts);


router.post("/addorder", addOrder);
router.delete("/removeorder", deleteOrder);



//protected route

router.get("/test", auth, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route to the test",
  });
});

router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route to the student",
  });
});

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "welcome to the protected route to the Admin",
  });
});
module.exports = router;
