/*const Diary=require("../models").diaries;
console.log("Inside dao");
async function createDiary({
    description,image,email
}){
    return Diary.create({
        description,
        image,
        date:new Date(),
        email,
    });
}

async function getAllDiaryNotes(email,date){
    return Diary.findAll({
        where:{
            email:email,
            date:date
        }
    });
}
module.exports = { createDiary,getAllDiaryNotes};
*/

const jwtauthentication = require("../middlewares/authentication");
const diaries = require("../models").diaries;
exports.getDiaries = [
  async (req, res) => {
    try {
      const all_diaries = await diaries.findAll();
      return res.send({ status: 200, all_diaries });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];
exports.getDiaryNotesByEmail = [
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    console.log(email);
    try {
      const diaries_notes = await diaries.findAll({ where: { email } });
      return res.send({ status: 200, data: diaries_notes });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];

exports.addNoteToDairy = [
  jwtauthentication,
  async (req, res) => {
    const { email, date, description } = req.body;
    const newNote = { email, date, description };
    try {
      const findNote = await diaries.findOne({
        where: { email },
      });
      if (findNote) {
        return res.send({ status: 400, data: "Note already added" });
      } else {
        await diaries.create(newNote);
        return res.send({ status: 200, data: "Note added successfully" });
      }
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];

exports.editNote = [
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    try {
      const findNote = await diaries.findOne({
        where: { email },
      });
      findNote.description = req.body.description;
      await findNote.save();
      //console.log(findNote);
      return res.send({ status: 200, Note: "Diary note edited successfully" });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];

exports.deleteDiaryNote = [
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    try {
      const findNote = await diaries.findOne({
        where: { email },
      });
      await findNote.destroy();
      return res.json({ status: 200, message: "entry Deleted successfully" });
    } catch (error) {
      return res.send({ status: 500, data: error.message });
    }
  },
];


exports.getDiaryNoteByDate=[async (req,res)=>{
  console.log("Inside controllers");
  const date=req.params.date;
  console.log(date);
  try{
    const findNote=await diaries.findOne({
      where:{date},
      
    });
    return res.send({status:200,note:findNote});
  }
  catch(error){
    return res.send({ status: 500, message: error.message });
  }
}
]