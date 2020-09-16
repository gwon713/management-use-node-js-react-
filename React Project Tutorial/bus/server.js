const fs = require('fs'); // 서버 기본 셋업
const express = require('express'); // 서버 기본 셋업
const bodyParser = require('body-parser'); // 서버 기본 셋업
const app = express(); // 서버 기본 셋업
const port = process.env.PORT || 5000; // 포트번호 설정

app.use(bodyParser.json()); // 서버 기본 셋업
app.use(bodyParser.urlencoded({ extended: true})); // 서버 기본 셋업


const multer = require('multer');

app.get('/api/customers', (req, res)=>{ // 해당 url 로 접속할때 동작 설정
    
});


 app.listen(port, () => console.log(`Listening on port ${port}`));