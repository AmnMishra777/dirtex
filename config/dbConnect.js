const { default: mongoose } = require("mongoose");

const dbConnect = () => {
try{
    const conn= mongoose.connect("mongodb+srv://AmnMishra777:ZwLJNlmaLi3ga4GF@cluster0.9xjau.mongodb.net/DirtEX", 
    { useNewUrlParser: true })
    console.log("Database connected succesfully ")
} catch(error){
    console.log("Database error")
 }
};
module.exports=dbConnect

// mongoose.connect("mongodb+srv://animesh:KNlVl9CDDcfmXfF0@cluster0.nrkqb.mongodb.net/group8Database", { useNewUrlParser: true })
//      .then(() => console.log("MongoDb is connected"))
//      .catch(error => console.log(error))