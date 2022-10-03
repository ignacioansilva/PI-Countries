const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Country, conn } = require('../../src/db.js');

const agent = session(app);
const country = {
  id: "INS",
  name: "Ignacio´s City",
  continent: "Henry",
  subregion: "SubHenry",
  capital: "Entre Rios",
  area: "13032003",
  population: "1",
  flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Bandera_de_la_Provincia_de_Entre_R%C3%ADos.svg/2560px-Bandera_de_la_Provincia_de_Entre_R%C3%ADos.svg.png"
};

describe('Country routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Country.sync({ force: true }) // reinicio la db
    .then(() => Country.create(country))); // Envio el country creado como constante

    describe('GET /countries', () => {
    it('should get 200', () =>
      agent.get('/countries').expect(200)
    );
  });
  describe('GET /countries/:id', () => {
    it('should get 200', () =>
      agent.get('/countries/INS').expect(200)
    );
    it('should get 400', () =>
    agent.get('/countries/NAC').expect(400)
  );
  });
});
