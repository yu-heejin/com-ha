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
    console.log(req.body);
    
    res.status(200).send();
});

app.listen('3001', () => {
    console.log(`
        ################################################
        welcome to com-ha !
        ################################################
    `);
});