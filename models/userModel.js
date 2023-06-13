const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt")
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim: true
    },
    lastName:{
        type:String,
        required:true,
        trim: true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
        trim: true
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type: String,
        default: "user"
    }
});

userSchema.pre('save', async function(next ){
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.isPasswordMatched = async function(enterPassword){
    return await bcrypt.compare(enterPassword, this.password)
};

//Export the model
module.exports = mongoose.model('User', userSchema);