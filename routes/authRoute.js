const express = require('express');
const { createUser,loginUser,getallUser, getaUser, deleteaUser, updateUser } = require('../controller/userController');
const {validationForUser} = require("../validator/validator")
const {uploadFile} = require("../controller/fileController")
const {authMiddleware} = require('../middlewares/authM')
const router = express.Router();
const multer = require('multer');

router.post("/register", validationForUser,createUser);
router.post("/login", loginUser);
router.put("/updateUser", authMiddleware,updateUser);
router.get("/all-users", getallUser);
router.get("/:id", authMiddleware,getaUser);
router.delete("/:id", deleteaUser);


// routes/route.js
const path = require('path');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const fileName = file.originalname.replace(ext, '') + '-' + Date.now() + ext;
    cb(null, fileName);
  }
});

// Create multer instance with file upload limit
const upload = multer({
  storage,
  limits: {
    files: 10 // Set the maximum number of files to 10
  }
});

// Handle the file upload route
router.post('/upload', upload.array('files', 10), uploadFile);

module.exports = router;
