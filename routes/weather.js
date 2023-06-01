const { Router } = require('express');

const router = Router();

const weatherDAO = require('../daos/weather');

// let temp = 12;
// let locationName = 'Home';


router.get('/', (req, res, next) => {
    /*
    CODE FROM CLASS, AN OPTION
    res.send(`
        <html>
            <body>
                <h1>Hellow World!</h1>
            </body>
        </html>
    `)
    */
    try {
        res.render('weather');
    } catch(e) {
        console.error(e);
        next(e);
    }
   
});

router.get('/location', async (req, res, next) => {
    // get request name and find the temperature for that name
    const location = req.query.name;
    if (!location) {return res.status(400).redirect('/weather')}
    try {
        const temp = await weatherDAO.findTempByLocationName(location);
        if (!temp) {return res.status(404).send(`
            <html>
                <body>
                    <h1>Error.  There's no temperature at that location. ${location} Doesn't exist</h1>
                    <a href="/weather">Go Back</a>
                </body>
            </html>
        `)} else {
            res.render('location', {name: location, temperature: temp});
        }
    } catch(e) {
        req.badInput = location;
        next(e);
    }

});

module.exports = router;