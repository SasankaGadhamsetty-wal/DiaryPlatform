const jwtauthentication = require("../middlewares/authentication");
const multer = require("multer");
const images=require("../models").images;
const path=require("path");
let imageName=null;

const uploadstorage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'imageuploads')
  },
  filename:(req,file,cb)=>{
    imageName=Date.now()+file.originalname;
    cb(null,imageName)
  }
});

exports.uploadImages=multer({
  storage: uploadstorage,
  limits: { fieldNameSize: 1000, fileSize: 102400000 },
  fileFilter: (req, file, cb) => {
    console.log("File filter running..");
    const fileTypes = /jpeg|jpg|png|gif/;
    const mimetype = fileTypes.test(file.mimetype);
    const extname = fileTypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Only .png .jpg and .jpeg are allowed"));
  },
}).array("file",4);


exports.addImages=[
  jwtauthentication,
  async(req,res,next)=>{
    console.log("Inside image upload");
    try{
      let imagesArray=[];
      console.log(imagesArray);
      req.files.forEach(element => {
        const file=element.path;
        imagesArray.push(file);
      });
      console.log(imagesArray);
      const multipleImages=new images({
        diary_id:req.body.diary_id,
        imageurl:imagesArray
      });
    
      console.log(multipleImages);
      await multipleImages.save();
      res.status(201).send('Images uploaded successfully');
    }
    catch(error){
      console.log(error);
      res.status(400).send(error.message);
    }
  }
]


exports.getallImages = [
  jwtauthentication,
  async (req, res, next) => {
      const diary_id=req.params.diary_id;
      console.log('Inside get all images');
      console.log(diary_id);
  try {
      const files = await images.findAll(  {
              where: { diary_id },
          } );
      
      return res.send({status:200,data:files});
  } catch (error) {
    res.status(400).send(error.message);
  }
}

]


{/*
 for(var i=0;i<imagesArray.length;i++){
        const diary_id=req.body.diary_id;
        const imageurl=imagesArray[i];
        const newImage={diary_id,imageurl};
        await images.create(newImage);
      }

   */}
