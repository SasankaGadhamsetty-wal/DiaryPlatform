const express=require("express");
const PORT=3001;
const app=express();
const userRouter=require("./routes/user");
const noteRouter=require("./routes/note");

app.use("/users",userRouter);
app.use("/notes",noteRouter);

app.listen(PORT,()=>{
console.log("DiaryPlatform app is Up now");
});