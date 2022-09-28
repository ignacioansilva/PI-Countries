const { Router } = require('express');
const router = Router();
const { Country, Activity } = require ('../db.js')
const { getDbInfo } = require('../DBinfo/LoadDataBase');



router.get('/', async (req, res) => {
    const name = req.query.name;
    const info = await getDbInfo();
    if (name) {
        const countryName = await info.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
       countryName.length ? 
       res.status(200).send (countryName) :
       res.status(400).send('No se encontraron coincidencias');
    } else {
        res.status(200).send(info);
    }
});

router.get ('/:id', async (req, res) => {
    const id = req.params.id;
    const info = await getDbInfo();
    if (id){
    const country = await info.filter(p => p.id === id.toUpperCase());
    country.length ?
    res.status(200).send(country) : 
    res.status(400).send('No se encontro');  
    }});

    module.exports = router;
