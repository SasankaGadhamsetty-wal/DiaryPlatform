/*const express=require("express");
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
});*/
const express = require("express")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const PORT = 3004

app.listen(PORT, () => {
    console.log(`Server is listening to port ${PORT}`)
})


const usersRouter = require('./routes/users');
const diaryRouter = require('./routes/diaries');
const credentialsRouter=require("./routes/credentials");

app.use('/users', usersRouter);
app.use('/diaries', diaryRouter);
app.use('/credentials',credentialsRouter);

app.use(function (req, res, next) {
    next(createError(404));
});

app.use(function (err, req, res, next) {
     res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

