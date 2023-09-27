import express, { Request, Response } from 'express';
import cors from 'cors';

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

    for (const a of arr) {
        const token = a as string;
        // 변수가 있는지 확인하기

        // 반복문인지 확인하기
        if (token.includes('뭐 나도 맨날 헷갈리는데')) {
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