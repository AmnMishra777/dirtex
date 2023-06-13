const User = require("../models/userModel");


const isValidBody = function (value) {
    if (typeof value === "undefined" || value === "null") return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };
  
const isValidEmail = function (email) {
    let checkemail = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{3})+$/;
    if (checkemail.test(email)) {
      return true;
    }
    return false;
  };
  
  const isValidMobileNumber = function (mobile) {
    let checkMobile = /^\s*[6-9]\d{9}$/;  ///^\s*\91([0-9]){10}\s*$/
    if (checkMobile.test(mobile)) {
      return true;
    }
    return false;
  };
  
  const isValidPassword = function (password) {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,15}$/; //for password space not allowed, also handles !password
    return re.test(password);
  };
  
  // Validation for length of characters
  const name = function (value) {
    if (!/^\s*(?=[a-zA-Z])[\a-z\A-Z\s]{3,64}\s*$/.test(value)) return false;
    else return true;
  };
  
  // validation for Profile image
  function isValidImage(value) {
    const regEx = /.+\.(?:(jpg|gif|png|jpeg|jfif))/; //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
    const result = regEx.test(value);
    return result;
  }

  // ....................................... Validation for User .................................//
const validationForUser = async function (req, res, next) {
    try {
      let data = req.body;
      let { firstName, lastName, email, mobile, password } = data;
      
      if (!isValidBody(firstName)) {
        return res.status(400).send({
          status: false,
          message: "Please provide first name ",
        });
      }
      if (!name(firstName)) {
        return res.status(400).send({
          status: false,
          message: "Please provide a vaild first name",
        });
      }
  
      if (!isValidBody(lastName)) {
        return res.status(400).send({
          status: false,
          message: "Please provide your last name ",
        });
      }
      if (!name(lastName)) {
        return res.status(400).send({
          status: false,
          message: "Please provide a valid name",
        });
      }
  
      if (email) email = email.toLowerCase();
      if (!isValidBody(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Please enter email" });
      } else if (!isValidEmail(email)) {
        return res
          .status(400)
          .send({ status: false, message: "Email is not valid" });
      }
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res
          .status(400)
          .send({ status: false, message: "This Email is already in use" });
    }
    
    if (!mobile) {
        return res.status(400).send({
          status: false,
          message: "Please enter mobile number",
        });
      }
      if (!isValidMobileNumber(mobile)) {
        return res.status(400).send({
          status: false,
          message: "Please enter 10 digit indian number, eg. 9876xxxxxx",
        });
      }
      const existmobile = await User.findOne({ mobile });
      if (existmobile) {
        return res.status(400).send({
          status: false,
          message: "This Mobile number is already in use",
        });
      }
      if (!isValidPassword(password)) {
        return res.status(400).send({
          status: false,
          message:
            "Please enter valid password with one uppercase ,lowercse and special character and length should be 8 to 15",
        });
      } 
    } catch (error) {
      return res.status(500).send({
        status: false,
        message: error.message,
      });
    }
    next();
  };

module.exports= {validationForUser}


