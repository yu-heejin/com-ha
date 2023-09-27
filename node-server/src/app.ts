import express, { Request, Response } from 'express';
import cors from 'cors';
import { service } from './app.service';

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
    const result = service(text);

    res.status(200).send(result);
});

app.listen('3001', () => {
    console.log(`
        ################################################
        welcome to com-ha !
        ################################################
    `);
});
