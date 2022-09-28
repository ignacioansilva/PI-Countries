const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const routerCountry = require('./Country_Routes');
const routerActivity = require('./Activity_Routes');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

    // Rutas de paises
    router.use('/countries', routerCountry);
    //Rutas de actividades
    router.use('/activities', routerActivity);

module.exports = router;
