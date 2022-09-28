const { Router } = require('express');
const router = Router();
const { Country, Activity } = require ('../db.js')
const { getActivities } = require('../DBinfo/LoadDataBase');


router.post ('/', async (req,res)=> {
    let {name, difficulty, duration, season, countryId } = req.body

    let newActivity = await Activity.create({
        name,
        difficulty,
        duration,
        season,
        countryId
    });

    const countrieDb = await Country.findAll ({
        where: {
            id: countryId,
        }
    }) 
    newActivity.addCountries(countrieDb)
    res.status(200).send(newActivity);
});

    router.get('/', async (req,res) =>{
        const activities = await getActivities();
        res.status(200).send(activities);
    });


module.exports = router;
 
