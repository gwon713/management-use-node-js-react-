const fs = require('fs'); // 서버 기본 셋업
const express = require('express'); // 서버 기본 셋업
const bodyParser = require('body-parser'); // 서버 기본 셋업
const app = express(); // 서버 기본 셋업
const port = process.env.PORT || 5000; // 포트번호 설정

app.use(bodyParser.json()); // 서버 기본 셋업
app.use(bodyParser.urlencoded({ extended: true})); // 서버 기본 셋업

const data = fs.readFileSync('./database.json'); // db 데이터 접근을 위한 정보입력
const conf = JSON.parse(data); // 서버 기본 셋업
const mysql = require('mysql'); // 서버 기본 셋업

const connection = mysql.createConnection({ //mysql 셋업
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database
})
connection.connect();  //mysql 연동

const multer = require('multer');
const upload = multer({dest: './upload'}); //사진 업로드 설정 (사진 데이터 보관) => upload

app.get('/api/customers', (req, res)=>{ // 해당 url 로 접속할때 동작 설정
    connection.query(
      "SELECT * FROM CUSTOMER WHERE isDeleted = 0",
      (err, rows, fields)=>{
        res.send(rows);
      }
    );
});

app.use('/image', express.static('./upload')); 

app.post('/api/customers', upload.single('image'), (req, res) => { //post 방식 사용하여 데이터를 db에 저장
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, now(), 0)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];//데이터 전달 값 초기화
  connection.query(sql, params,// DB전송
    (err, rows, fields) => {
      res.send(rows);// DB전송
      console.log(err); // 에러 로그 출력
      console.log(rows); // 전송된 값 출력
    }
  );
});

app.delete('/api/customers/:id', (req, res) => {
  let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?'; //DB에 삭제완료 되었다는 값저장 구문
  let params = [req.params.id]; //id 데이터 전달 값 초기화
  connection.query(sql, params,// DB전송
    (err, rows, fields) => {
      res.send(rows); // DB전송
      console.log(err); // 에러 로그 출력
      console.log(rows); // 전송된 값 출력
    }
  );
});
 app.listen(port, () => console.log(`Listening on port ${port}`));