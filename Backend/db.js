
const mongoose = require('mongoose');
mongoose.set('strictQuery', true)

const server='127.0.0.1:27017'
const data=base='Note-Book'

const mongo= async()=>{
 try{
    await mongoose.connect(`mongodb://${server}/${data}`)
    console.log("Connected to MongoDB");
  
 }catch(err){
   console.log(err);
  
 }
}


module.exports=mongo;