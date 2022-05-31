const Diary=require("../models").diaries;
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