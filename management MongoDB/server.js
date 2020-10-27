const express = require("express");
require("dotenv").config({path:'variables.env'});
const {User} = require('../management MongoDB/models/User');

const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser'); // 서버 기본 셋업

const port = process.env.PORT || 5000;

// middleware
// application/json
app.use(express.json());
// application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

const multer = require('multer');
const upload = multer({dest: './upload'}); //사진 업로드 설정 (사진 데이터 보관) => upload

// db connect
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    dbName:"management"
  })
  .then(() => console.log(`mongoDB connected`))
  .catch((err) => console.error(err));


app.get("/api/customers", (req, res) => {
  User
  .find()
  .then(rows => {
    console.log("Read All 완료");
    res.status(200).json(rows);
  })
  .catch(err => {
    res.status(500).json({
      message: err
    });
  });
});

app.post('/api/customers', upload.single('image'), (req, res) => {
    const {name, birthday, gender, job} = req.body;
    const postUser = new User();
    postUser.image = '/image/' + req.file.filename;
    postUser.name = name;
    postUser.birthday = birthday;
    postUser.gender = gender;
    postUser.job = job;
    console.log(postUser); // 전송된 값 출력
    console.log(req.file.filename); // 전송된 값 출력
    postUser.save()
    .then(newPost => {
      {
        console.log("Create Data")
        res.json(newPost);
        res.send(postUser.image);
      }
    })
    .catch(err => {
      res.json({message: err});
    })
});

// app.delete('/api/customers/:id', (req, res) => {
//   User
//   .find()
//   .then(rows => {
//     console.log("Read All 완료");
//     res.status(200).json(rows);
//   })
//   .catch(err => {
//     res.status(500).json({
//       message: err
//     });
//   });
// });

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);



