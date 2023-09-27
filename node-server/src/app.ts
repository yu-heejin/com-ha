import express, { Request, Response } from 'express';
import cors from 'cors';
import { loopKeyword, variableKeyword } from './keyword';

const app = express();

app.use(express.json());
app.use(cors({
    credentials: true,
    origin: function (origin: any, callback: any): void {
        if (origin === 'http://localhost:3000') {
            callback(null, true); // 허용
        } else {
            callback(new Error('Not allowed by CORS')); // 거부
        }
    }
}));

app.post('/', (req: Request, res: Response) => {
    const { text } = req.body;
    const arr = text.split('\n');
    const constVariableList = [];
    const variableList = [];

    for (const a of arr) {
        const token = a as string;
        if (token === '') continue;

        // 변수인 경우
        if (token.includes(variableKeyword['variable'])) {
            const name = token.split('학생')[0];
            const value = token.split('?')[1];
            variableList.push([name, value]);
        }

        // 상수인 경우
        if (token.includes(variableKeyword['constVariable'])) {
            const name = token.split('학생')[0];
            const value = token.split('??')[1];
            constVariableList.push([name, value]);
        }

        console.log(variableList, constVariableList);

        // 반복문인지 확인하기
        if (token.includes(loopKeyword['loopStart'])) {
            let loopCount = 0;
            for (let x of token) {
                if (x === '~') loopCount++;
            }

            for (let i = 0; i < loopCount; i++) {

            }
        }
    }

    res.status(200).send();
});

app.listen('3001', () => {
    console.log(`
        ################################################
        welcome to com-ha !
        ################################################
    `);
});