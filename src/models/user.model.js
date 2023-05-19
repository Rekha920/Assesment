const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    match: [
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      "Please enter a valid email",
    ],
    unique: true,
  },
  otp: {
    type: String,
    trim: true,
  },
  attempts: {
    type: Number,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", userSchema);

const checkUserExist = async (email, otp) => {
  const userExist = await User.findOne({ email: email });
  if (userExist) {
    const updateUsersDetails = await User.updateOne(
      { _id: userExist._id },
      {
        $set: {
          otp: otp,
        },
      },
      { new: true }
    );
  } else {
    const saveUserDetails = await User.create({
      email: email,
      otp: otp,
    });
  }
};

const getUserByEmail=async(email)=>{
  const fetchUser=await User.findOne({email:email});
  return fetchUser;
}
const validateOTP=async(email,otp)=>{
  const data=await getUserByEmail(email);
  if(data.otp===otp){
    return true
  }else{
    return false
  }
}
module.exports = { User, checkUserExist,getUserByEmail ,validateOTP};
