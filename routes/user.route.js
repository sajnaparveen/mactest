const router = require("express").Router();
const userSchema = require('../models/user.model')
const {mailsending}= require('../middleware/nodemailer')

const port = process.env.port || 7000;
router.post("/register", async (req, res) => {
  try {
    // await mailsending()

    const username = req.body.username;
    const email = req.body.email;
    const mobilenumber = req.body.mobilenumber;
    const password = req.body.password;
  
    const mailData = {
      to: email,
      subject: "Verify Email",
    fileName: "welcomepage.ejs",
          details: {
        name: username,
        date: new Date(),
         link: `http://localhost:${port}/login`
      }
    };

    if (username && email && mobilenumber && password) {
  
        let mailRes = mailsending(mailData);
               
          let user = new userSchema(req.body);
          let result = await user.save();
          console.log("result", result);
          return res.status(200).json({
            status: "success",
            message: "user details added  successfully",
          });
      
    } else {
      return res
        .status(400)
        .json({ status: "failure", message: "must include all details" });
    }
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ status: "failure", message: error.message });
  }
});


//login
router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    
let userdetails;
    if (username) {
      userdetails = await userSchema.findOne({ username: username }).exec();
       if(userdetails){
        if(password===userdetails.password){
          await userSchema
                .findOneAndUpdate(
                  { uuid: userdetails.uuid },
                  { loginStatus: true },
                  { new: true }
                ) 
                .exec();
          return res.status(200).json({
            status: "success",
            message: "Login successfully",
            data:userdetails ,
          });
        }else{
          return res.status(200).json({ status: "failure", message: "password not valid"});
        }
       }else{
        return res.status(200).json({ status: "failure", message: "you dont have an account please signup" });
       }
    }else {
      
      return res.status(400).json({ status: "failure", message: "user not to be empty" });  

    }

  } catch (error) {
   
    return res.status(500).json({ status: "failure", message: error.message });
  }
});


module.exports = router;