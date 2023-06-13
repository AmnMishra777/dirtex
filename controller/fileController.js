const File = require("../models/filesModel");
const asyncHandler = require('express-async-handler')
const uploadFile = require("../middlewares/aws")



const uploadedFileURL = asyncHandler(async(req, res) => {
    try {
        let profileImage = req.files;
      
       
     // validation for image
     function isValidImage(value) {
        const regEx = /.+\.(?:(jpg|gif|png|jpeg|jfif))/; //It will handle all undefined, null, only numbersNaming, dot, space allowed in between
        const result = regEx.test(value);
        return result;
      }
    
        if (profileImage.length === 0) {
            return res
              .status(400)
              .send({ status: false, message: "Please Upload the Profile Image" });
          } else if (profileImage.length > 1) {
            return res
              .status(400)
              .send({ status: false, message: "Please upload only one image" });
          }

          if (!isValidImage(profileImage[0].originalname)) {
            return res.status(400).send({
              status: false,
              message:
                "Please upload only image file with extension jpg, png, gif, jpeg, jfif",
            });
          }
        
    
        let uploadedFile = await uploadFile.uploadFile(profileImage[0]);
        pI = uploadedFile;

        console.log(uploadedFile)

        const newFile = await File.create(pI);
        return res
          .status(201)
          .send({ status: true, message: "file uploaded succesfully", data: newFile });
      } catch (error) {
        return res.status(500).send({
          status: false,
          message: "not able to upload",
        });
      }
    });
    

    module.exports={uploadedFileURL}



   // if (!checkBodyParams(data) && !profileImage) {
        //     return res
        //       .status(400)
        //       .send({ status: false, message: "Please input Parameters" });
        //    }

        // let uploadedFile = profileImage[0];
        // pI = uploadedFile;

        // console.log(uploadedFile)