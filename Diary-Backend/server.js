const express=require("express");
const PORT=3001;
const app=express();
const userRouter=require("./routes/users");
const diaryRouter=require("./routes/diaries");
const credentialsRouter=require("./routes/credentials");

app.use("/users",userRouter);
app.use("/diaries",diaryRouter);
app.use("/credentials",credentialsRouter);

app.listen(PORT,()=>{
console.log("DiaryPlatform app is Up now");
});