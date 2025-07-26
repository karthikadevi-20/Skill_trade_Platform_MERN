const mongoose=require("mongoose")

mongoose.connect(process.env.MONGO_URI||"mongodb+srv://arunatechbox:skilltradedb@skilltrade.yjoo8.mongodb.net/skilltrade?retryWrites=true&w=majority&appName=skilltrade")
.then(()=>{console.log("Connected to DB");
})
.catch((err)=>{console.log(err.message)})