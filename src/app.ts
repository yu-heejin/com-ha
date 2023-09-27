import express from 'express';

const app = express();

app.listen('1234', () => {
    console.log(`
        ################################################
        welcome to com-ha !
        ################################################
    `);
});