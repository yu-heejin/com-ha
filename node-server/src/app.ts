import express, { Request, Response } from 'express';

const app = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    console.log(req.body);
    
    res.status(200).send();
});

app.listen('3000', () => {
    console.log(`
        ################################################
        welcome to com-ha !
        ################################################
    `);
});