const express = require("express");
require("dotenv").config({path:'variables.env'});
const {User} = require('../management MongoDB/models/User');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

const multer = require('multer');
const upload = multer({dest: './upload'}); //사진 업로드 설정 (사진 데이터 보관) => upload
  

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

app.use('/image', express.static('./upload')); 

app.post('/api/customers', upload.single('image'), (req, res) => {
  const postUser = new User();
  postUser.image = '/image/' + req.file.filename;
  postUser.name = req.body.name;
  postUser.birthday = req.body.birthday;
  postUser.gender = req.body.gender;
  postUser.job = req.body.job;  
  console.log(postUser);
  const newPost = postUser.toJSON()
  console.log(newPost);
  postUser.save()
  .then(newP => {
    {
      res.json(newP);
      console.log("Create Data");
      console.log(newP);
    }
  })
  .catch(err => {
    res.json({
      message: err
    });
  })
});

app.delete('/api/customers/:id', (req, res) => {
  User
  .deleteOne(req.url.id, function(err, output) {
    if (err) {
      return next(err);
    }
    console.log("Delete Data")
    res.send(output === 1 ? { msg: "success" } : { msg: "error" });
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);



