import { Router } from "express";

const router = Router();

router.get('/one', (req, res) => {
    return res
            .setHeader('Location', '/predefined/two')
            .setHeader('Answer', 'checkYourBrowser')
            .status(301).end();
})

router.get('/two', (req, res) => {
    return res.send(`<!doctype html>
    <html lang=en>
    <head>
    <meta charset=utf-8>
    <title>Two</title>
    </head>
    <body>
    <h1>Oops, too late!</h1>
    </body>
    </html>`);
})

export default router;