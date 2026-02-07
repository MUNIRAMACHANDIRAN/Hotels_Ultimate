
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const users = [
  {id:1, username:"admin", password:bcrypt.hashSync("admin",8), role:"admin"},
  {id:2, username:"staff", password:bcrypt.hashSync("staff",8), role:"staff"}
];

router.post("/login",(req,res)=>{
  const {username,password} = req.body;
  const user = users.find(u=>u.username===username);
  if(!user || !bcrypt.compareSync(password,user.password))
    return res.status(401).json({error:"Invalid"});
  const token = jwt.sign({id:user.id,role:user.role},"secret",{expiresIn:"1h"});
  res.json({token,role:user.role});
});

module.exports = router;
