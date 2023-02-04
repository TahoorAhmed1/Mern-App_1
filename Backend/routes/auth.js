const express = require('express');
const router=express.Router()
// Set up rout and express-validation 
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRITE="Tahoorahmed+1"
// Impot models of User
const User = require('../models/User');
const fetchuser=require("../middelware/fetchuser")
//ROUT 1: Creact User  info  using Post "/api/auth/craectUser" "no login require"
router.post('/singup',[
    // adding restriction
    body('name',"Enter a valid name").isLength({min:3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Enter a valid password").isLength({min:8}),
],async(req,res)=>{

    let success=false;
    try{

   
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
 
      return res.status(400).json({ success, errors: errors.array() });

    }
 
    let user= await User.findOne({email:req.body.email})
    if(user){
       
        return res.status( 404).json({success,error:"Plz enter valid email"})
    }
     
    const salt=  await bcrypt.genSalt(10)
    const securePassword= await bcrypt.hash( req.body.password ,salt)

    // Creact a new User 
 user= await User.create({
      name: req.body.name,
      email:req.body.email,
      password:securePassword,
      number:req.body.number
    

    })
  
    const data={
        user:{
            id:user.id
        }
    }
    const authentication=jwt.sign(data,JWT_SECRITE)
    success=true
    res.status(200).json({success,"authToken":authentication})

}catch(err){
    console.log(err);
 
}
    
    
    // .then(user=>{
    
    //     res.status(200).json(user)
    //     console.log("Data has been saved");
    //     console.log(user);
    // }).catch((err)=>{
    //     console.log(err);
    // })
   
})


// ROUT 2 : Creact User login  using Post "/api/auth/login" "no login require"

router.post('/login',[
   body("email","Plz enter correct information").isEmail(),
   body("password","Plz enter correct information").exists()
],async(req,res)=>{
    let success=false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        success:false;
      return res.status(400).json({    success, errors: errors.array() });

    }
 
    let {email,password}=req.body
    try{

        let user=await User.findOne({email})
        if(!user){
            success:false
          return   res.status(404).json({
               success,
                error:  "Plz try to login with Correct Credanrials " 
            })
        }

        let passwordCompair= bcrypt.compare(password,user.password).then(()=>{
              console.log("compair");
        }).catch((err)=>{
 console.log(err);
        })
        if(!passwordCompair){
            res.status(404).json({
                error:"Plz try to login with Correct Credanrials "
            })
        }
        const data={
            user:{
                id:user.id
            }
        }

        success=true
        const authentication=jwt.sign(data,JWT_SECRITE)
        res.status(200).json({success,"authToken":authentication})
    }catch(err){
        console.log("Internal Server Error",err);
      
    }
})

// ROUT 3 : Get  User Detail  using Post "/api/auth/getuser" " login require"

router.post('/getuser',fetchuser,async(req,res)=>{

    try {
        let userId=req.user.id
        const user=await User.findById(userId).select("-password")
        res.status(200).send(user)
    } catch (err) {
        console.log("Internal Server Error",err);
        res.status(500)
    }
})

module.exports=router