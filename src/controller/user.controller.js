const {checkUserExist, User,getUserByEmail,validateOTP} =require('../models/user.model');
const generateOtp =require('../utils/generateOtp');
const sendMail=require('../services/email.service');
const jwt=require('jsonwebtoken');
let blockedUsers=[];
const loginAndSendOtp=async(req,res)=>{
    try {
       const {email}=req.body;
       const otp=generateOtp();
       const token=jwt.sign({otp:otp},process.env.SECRET,{expiresIn:'5m'});
       await checkUserExist(email,otp);
       const sendEmailObject={
        to:email,
        subject:'Sending OTP for Verification',
        text:otp
       }
      const responseFromMailService= await sendMail(sendEmailObject);
      if(responseFromMailService.includes('Ok')){
        res.status(200).json({
            success:true,
            token:token,
            message:"OTP sent on registered email Address.!"
        })
        return;
      }else{
        res.status(422).json({
            success:false,
            message:"Invalid Credentials"
        })
        return;
      }
    } catch (error) {
      res.status(404).json({ message: error.message });
      return;
    }    
}

const loginAndVerify=async(req,res)=>{
  try {
    let count=0;
    const {email,otp}=req.body;
    const fetchUser=await getUserByEmail(email);
    if(fetchUser){
      const lastLoggedInTime=fetchUser.updatedAt;
      const currentTime=new Date().getTime();
      const differenceTime=lastLoggedInTime-currentTime;
      const time=3600000;
      if(differenceTime <3600000){
        res.status(401).json({message:`Account is Blocked for ${time}ms`});
        return;
      }
    }else{
      blockedUsers=blockedUsers.filter(user=>user.email===email)
    }
    const isValidOtp=validateOTP(email,otp);
    if(isValidOtp){
      res.status(200).json({message:"Login In Successfully.!"})
      return;
    }else{
      const user=blockedUsers.find(user=>user.email===email);
      if(user){
        user.attempts++;
        if(user.attempts>=5){
          user.timestamp=new Date().getTime();
           res.status(401).json({message:"Invalid Otp Account is Blocked for 1 hour."});
           return;
        }else{
          blockedUsers.push({email,attemps:1,time:0})
        }
      }
      res.status(401).json({ message: 'Invalid OTP.' });
      return
    }
  } catch (error) {
    res.status(401).json({ message: error.message });
    return
  }
}

module.exports={loginAndSendOtp,loginAndVerify}