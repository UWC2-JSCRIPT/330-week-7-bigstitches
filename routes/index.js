const { Router } = require('express');
const router = Router();
router.use('/landing', require('./landing'));
router.use('/weather', require('./weather'));

// capture errors when the transactionid is not valid
// use an error handling middleware - put it last
router.use((err, req, res, _next) => {
    if (err.message.includes("Cast to ObjetId failed")) {
        res.status(400).send('You Monster');
    } else {
        // 500 internal server error, client can't fix
        res.status(404).send(`
            The weather for ${req.badInput} is not available<br><a href="/weather">Go Back</a>
        `);
        // console.log('unexpected error: ', err)
    }
});

module.exports = router;