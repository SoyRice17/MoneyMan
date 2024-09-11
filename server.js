const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// 데이터 저장 경로
const DATA_FILE = 'data.json';

// 데이터 읽기
function readData() {
    if (fs.existsSync(DATA_FILE)) {
        return JSON.parse(fs.readFileSync(DATA_FILE));
    }
    return { incomes: [], expenses: [] };
}

// 데이터 쓰기
function writeData(data) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(data));
}

// 데이터 가져오기
app.get('/api/data', (req, res) => {
    res.json(readData());
});

// 데이터 저장하기
app.post('/api/data', (req, res) => {
    writeData(req.body);
    res.sendStatus(200);
});

// 루트 경로 처리 추가
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port}에서 실행 중입니다.`);
});