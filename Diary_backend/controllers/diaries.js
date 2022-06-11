const jwtauthentication = require("../middlewares/authentication");
const { body, param, query, validationResult } = require("express-validator");
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
  param("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be provided correctly"),
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    console.log(email);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const diaries_notes = await diaries.findAll({ where: { email } });
        return res.send({ status: 200, data: diaries_notes });
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];


exports.addNoteToDairy = [
  body("date").isDate().withMessage("Date should be in valid format"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage("Description length should be in range 10 and 300"),
  jwtauthentication,
  async (req, res) => {
    const { email,description,date } = req.body;
    const checkEmail=req.query.email;
    const checkDate=req.query.date;
    console.log(`checkDate:${checkDate} and checkEmail:${checkEmail}`);
    const newNote = { email, date, description };
    console.log(description.length);
    console.log(req.query.email);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { email:checkEmail,date:checkDate },
        });
        if (findNote) {
          return res.send({ status: 200, data: "Note already added" });
        } else {
          await diaries.create(newNote);
          return res.send({ status: 200, data: "Note added successfully" });
        }
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];

exports.editNote = [
  query("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  query("date").isDate().withMessage("Date should be in valid format"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 300 })
    .withMessage("Description length should be in range 10 and 300"),
  jwtauthentication,
  async (req, res) => {
    const checkEmail = req.query.email;
    const checkdate=req.query.date;
    const description=req.body.description;
    console.log(description.length);
    console.log(`checkdate:${checkdate},checkEmail:${checkEmail}`);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { email:checkEmail,date:checkdate },
        });
        console.log(findNote.dataValues.description);
        if(findNote){
          findNote.description = req.body.description;
          await findNote.save();
          console.log(findNote.dataValues.description);
        return res.send({
          status: 200,
          Note: "Diary note edited successfully",
        });
        }
        else{
          return res.send({
            status: 200,
            Note: "Diary note does not exist",
          });
        }
        
       
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];

exports.deleteDiaryNote = [
  query("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  query("date").isDate().withMessage("Date should be in valid format"),
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    const checkEmail=req.query.email;
    const checkDate=req.query.date;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { email:checkEmail,date:checkDate },
        });
        findNote.destroy();
        return res.json({ status: 200, message: "entry Deleted successfully" });
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];

exports.getDiaryNoteByDateEmail = [
  query("date").isDate().withMessage("Date should be in valid format"),
  query("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email is invalid"),
    jwtauthentication,  
  async (req, res) => {
    console.log("Inside controllers");
    const email=req.query.email;
    const date = req.query.date;
    console.log(date);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { email:email,date:date },
        });
        return res.send({ status: 200, note: findNote });
      } catch (error) {
        return res.send({ status: 500, message: error.message });
      }
    }
  },
];
