const Users = require("../models/Usermodel");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({ storage: storage }).single("dp");
const signup = (req, res) => {
  upload(req, res, async (err) => {
    const file = req.file.mimetype;
    let data = req.body;
    if (err) {
      throw new Error(err.message);
    } else {
      const newDoc = await Users.create({
        name: data.name,
        email: data.email,
        password: data.password,
        profileImage: {
          data: req.file.filename,
          contentType: file,
        },
        mobileNo: data.no,
      })
        .then(() => res.json({ message: "User registered" }))
        .catch((e) => res.send(e.message));
    }
  });
};

const signin = async (req, res, err) => {
  const data = req.body;
  const username = data.name;
  const password = data.password;
  try {
    const user = await Users.findOne({ name: username });
    if (user) {
      if (user.password === password) {
        res.send("password matches\t logged in ");
      } else {
        res.send("password does not match");
      }
    } else {
      res.send("user not registered");
    }
  } catch {
    res.send(err.message);
  }
  // await Users.findOne({name:username}).exec((err,user)=>{
  //     if(err){
  //         res.send("user not found")
  //     }
  //     else{
  //         if(user.password===password){
  //             res.send("password matches")
  //         }
  //         else{
  //             res.send("password does not match")
  //         }
  //     }
  // }).then(()=>res.send("user is signned in to homepage")).catch(()=>res.send("user is not registered"))
};

const follow = async (req, res) => {
  const id = req.params.id;
  const userid = req.body.userId;
  await Users.findByIdAndUpdate(userid, { $push: { followers: id } })
    .then(() => console.log("followers updated"))
    .catch((e) => console.log(e.message));
  await Users.findByIdAndUpdate(id, { $push: { following: userid } })
    .then(() => console.log("following updated "))
    .catch((e) => console.log(e.message));
};
const unfollow = async (req, res) => {
  const id = req.params.id;
  const userid = req.body.userId;
  await Users.findByIdAndUpdate(userid, { $pull: { followers: id } })
    .then(() => console.log("followers updated(unfollow)"))
    .catch((e) => console.log(e.message));
  await Users.findByIdAndUpdate(id, { $pull: { following: userid } })
    .then(() => console.log("following updated (unfollow)"))
    .catch((e) => console.log(e.message));
};
module.exports = {
  signup,
  signin,
  follow,
  unfollow,
};
