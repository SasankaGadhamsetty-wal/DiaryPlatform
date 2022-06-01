/*const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

const diaryDao = require("../controllers/diaries");

//Posting diary note
router.post("/", jsonParser, async (req, res) => {
  console.log("Inside diaries routes");
  console.log(req.body);
  try {
    const newDiary = await diaryDao.createDiary(req.body);
    res.json({
      message: `Created a new note for this user ${newDiary.email}`,
    });
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

//Getting the note given email and date
router.get("/", async (req, res) => {
    console.log(`Email:${req.query.email},Date:${req.query.date}`);
  try {
    const email = req.query.email;
    const date = req.query.date;
    const Diaries = await diaryDao.getAllDiaryNotes(email, date);
    res.json(Diaries);
  } catch (err) {
    res.json({
      error: err.toString(),
    });
  }
});

module.exports = router;
*/


const express = require('express');
const diaryController = require('../controllers/diaries');
const router = express.Router();
router.get('/', diaryController.getDiaries);
router.post('/:email', diaryController.addNoteToDairy);
router.put('/:email', diaryController.editNote);
router.delete('/:email',diaryController.deleteDiaryNote);
router.get('/:email', diaryController.getDiaryNotesByEmail);
router.get('/date/:date',diaryController.getDiaryNoteByDate);
module.exports = router;
