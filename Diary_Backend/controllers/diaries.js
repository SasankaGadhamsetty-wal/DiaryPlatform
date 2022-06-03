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
    .isLength({ min: 10, max: 30 })
    .withMessage("Description length should be in range 10 and 300"),
  jwtauthentication,
  async (req, res) => {
    const { email, date, description } = req.body;
    const newNote = { email, date, description };
    console.log(req.params.email);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { email },
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
  param("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  body("description")
    .trim()
    .isLength({ min: 10, max: 30 })
    .withMessage("Description length should be in range 10 and 300"),
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { email },
        });
        findNote.description = req.body.description;
        await findNote.save();
        //console.log(findNote);
        return res.send({
          status: 200,
          Note: "Diary note edited successfully",
        });
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];

exports.deleteDiaryNote = [
  param("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage("Email must be valid"),
  jwtauthentication,
  async (req, res) => {
    const email = req.params.email;
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { email },
        });
        await findNote.destroy();
        return res.json({ status: 200, message: "entry Deleted successfully" });
      } catch (error) {
        return res.send({ status: 500, data: error.message });
      }
    }
  },
];

exports.getDiaryNoteByDate = [
  param("date").isDate().withMessage("Date should be in valid format"),
  async (req, res) => {
    console.log("Inside controllers");
    const date = req.params.date;
    console.log(date);
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      res.status(400).json({ success: false, errors: errors.array() });
    } else {
      try {
        const findNote = await diaries.findOne({
          where: { date },
        });
        return res.send({ status: 200, note: findNote });
      } catch (error) {
        return res.send({ status: 500, message: error.message });
      }
    }
  },
];
