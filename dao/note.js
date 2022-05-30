const User=require("../models/user");
const Note=require("../models/note");

async function createNote({
    email,note
}){
    return Note.create({
        email,
        date:new Date(),
        note,
    });
}

module.exports = { createNote};