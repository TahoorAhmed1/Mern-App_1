
const mongoose=require("mongoose") ;
const { Schema } = mongoose;

// Creacting schema for validaqtion
const NotesSchema = new Schema({
//   for user  to see what they da do multipal user do multipal things
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'

    },

 tittle:{
 type:String,
 require:true


 },
 description:{
 type:String,

 },
 tag:{
 type:String,

 }


});
module.exports=mongoose.model('notes',NotesSchema)