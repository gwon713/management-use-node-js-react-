const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res)=>{
    res.send([
        {
            'id':1,
            'image':'https://placeimg.com/64/64/1',
            'name':'홍길동',
            'birthday':'010713',
            'gender':'남자',
            'job':'프로그래머'
          },
          {
            'id':2,
            'image':'https://placeimg.com/64/64/2',
            'name':'이순신',
            'birthday':'612313',
            'gender':'남자',
            'job':'장군'
          },
          {
            'id':3,
            'image':'https://placeimg.com/64/64/3',
            'name':'김땡땡',
            'birthday':'232424',
            'gender':'남자',
            'job':'회사원'
          }
    ]);
});
 app.listen(port, () => console.log(`Listening on port ${port}`));