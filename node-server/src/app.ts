import express, { Request, Response } from 'express';
import cors from 'cors';
import { consoleKeyword, loopKeyword, numberKeyword, stringKeyword, variableKeyword } from './keyword';

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
    const result = [];

    for (const a of arr) {
        const token = a as string;
        if (token === '') continue;

        // 변수인 경우
        if (token.includes(variableKeyword['variable'])) {
            const name = token.split('학생')[0];
            let value: string | number = token.split('?')[1];
            
            // 변수 값 검증
            if (value.includes(stringKeyword['stringStart'])) {
                const startIndex = value.indexOf(stringKeyword['stringStart']) + 7;
                const endIndex = value.indexOf(stringKeyword['stringEnd']);
                value = value.substring(startIndex, endIndex);
            } else if (value.includes(numberKeyword['numberStart'])) {
                const comma = value.split(numberKeyword['numberStart'])[1];
                let numbers = 0;
                for (let x of comma) {
                    if (x === ',') numbers++;
                }
                value = numbers;
            } else {
                throw new Error('타입이 일치하지 않습니다.');
            }

            variableList.push([name, value]);
        }

        // 상수인 경우
        if (token.includes(variableKeyword['constVariable'])) {
            const name = token.split('학생')[0];
            let value: string | number = token.split('??')[1];
            // 변수 값 검증
            if (value.includes(stringKeyword['stringStart'])) {
                const startIndex = value.indexOf(stringKeyword['stringStart']) + 7;
                const endIndex = value.indexOf(stringKeyword['stringEnd']);
                value = value.substring(startIndex, endIndex);
            } else if (value.includes(numberKeyword['numberStart'])) {
                const comma = value.split(numberKeyword['numberStart'])[1];
                let numbers = 0;
                for (let x of comma) {
                    if (x === ',') numbers++;
                }
                value = numbers;
            } else {
                throw new Error('타입이 일치하지 않습니다.');
            }

            constVariableList.push([name, value]);
        }

        // 반복문인지 확인하기
        if (token.includes(loopKeyword['loopStart'])) {
            let loopCount = 0;
            for (let x of token) {
                if (x === '~') loopCount++;
            }

            for (let i = 0; i < loopCount; i++) {

            }
        }

        // 콘솔문인지 확인하기
        if (token.includes(consoleKeyword['print'])) {
            const value = token.split('.')[1];
            result.push(value);
        }
    }

    res.status(200).send(result);
});

app.listen('3001', () => {
    console.log(`
        ################################################
        welcome to com-ha !
        ################################################
    `);
});