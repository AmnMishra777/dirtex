const express = require('express');
const { createUser,loginUser,getallUser, getaUser, deleteaUser, updateUser } = require('../controller/userController');
const {validationForUser} = require("../validator/validator")
const {uploadedFileURL} = require("../controller/fileController")
const {authMiddleware} = require('../middlewares/authM')
const router = express.Router();

router.post("/register", validationForUser,createUser);
router.post("/login", loginUser);
router.put("/updateUser", authMiddleware,updateUser);
router.get("/all-users", getallUser);
router.get("/:id", authMiddleware,getaUser);
router.delete("/:id", deleteaUser);
router.post("/files",uploadedFileURL);





module.exports = router;