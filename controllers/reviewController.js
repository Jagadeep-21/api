const asyncHandler = require("async-handler");
const Blog = require("../config/connectdb");

const getReview =  async(req, res) => {
  const data= await Blog.find()
  res.status(200).json(data);
};

const postReview = async (req, res) => {
  //   console.log(req.body);
  if (!req.body.review) {
    res.status(400);
    throw new Error("write something");
  }
  const name = req.body.name;
  const content = req.body.review;
  const result = await Blog.create({
    name: name,
    review: content,
  });
  //   let data = req.body;
  res.status(200).json(result);
};
const updateReview = async(req, res) => {
  const doc=await Blog.findByIdAndUpdate(req.params.id,req.body,{new:true})
  if(!doc){
    res.status(400)
    throw new Error("Not found")
  }
  res.status(200).json(doc);
};
const deleteReview = async(req, res) => {
const data=await Blog.findByIdAndDelete(req.params.id)
if(!data){
    throw new Error("Not found")
}
  res.status(200).json({ message: "deleted" });
};
module.exports = {
  getReview,
  postReview,
  updateReview,
  deleteReview,
};
