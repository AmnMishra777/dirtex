const mongoose = require('mongoose'); 

// Declare the Schema of the Mongo model
var fileSchema = new mongoose.Schema({
    files:{
        type:String,
    },

});


//Export the model
module.exports = mongoose.model('File', fileSchema);