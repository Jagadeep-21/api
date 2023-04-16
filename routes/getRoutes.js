const express=require("express")
const router=express.Router()
const {getReview,updateReview,deleteReview,postReview}=require("../controllers/reviewController")


router.route('/').get(getReview)
router.get('/',getReview)
router.post('/add',postReview)
router.put('/:id',updateReview)
router.delete('/:id',deleteReview)

module.exports=router