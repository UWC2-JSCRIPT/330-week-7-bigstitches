const { Router } = require('express');
const router = Router();

router.get('/', (req, res, next) => {
    /*
    res.send(`
        <html>
            <body>
                <h1>Hellow World!</h1>
            </body>
        </html>
    `)
    */
    try {
        const timeStamp = new Date().toTimeString();
        res.render('index', {time: timeStamp});
    } catch(e) {
        console.error(e);
        next(e);
    }
   
});

module.exports = router;