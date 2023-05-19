const router=require('express').Router();
const {loginAndSendOtp,loginAndVerify}  =require('../controller/user.controller');
const verifyToken =require('../middleware/token.middleware');
router.post("/login",loginAndSendOtp)

router.post("/loginAndVerify",verifyToken,loginAndVerify)
module.exports= router;