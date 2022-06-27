const express=require('express');
const imagesController=require('../controllers/images');
var router=express.Router();
router.post('/:diary_id',imagesController.uploadImages,imagesController.addImages);
router.get('/:diary_id',imagesController.getallImages);

module.exports=router;