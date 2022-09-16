const axios = require ('axios');
const { Country, } = require ('../db')

async function getApiInfo() {
  try {
    {
      const apiUrl = await axios.get('https://restcountries.com/v3/all');
      const infoCountriesApi = apiUrl.data.map((p) => {
        return {
           id: p.cca3,
           name: p.name.common,
           flag: p.flags[1],
           continent: p.region,
           capital:  !p.capital ? 'Sin datos' : p.capital[0],
           subregion: !p.subregion ? 'Sin datos' : p.subregion,
           area: p.area,
           population: p.population, 
           
        };
      });
      infoCountriesApi.forEach(async (p) => {
        await Country.findOrCreate({
          where: {
            name: p.name,
            id: p.id,
            flag: p.flag,
            continent: p.continent,
            capital: p.capital,
            subregion: p.subregion,
            area: p.area,
            population: p.population,
          },
        }
        );
      });
    }
    console.log('DB loaded successfull')
  } catch (error) {
    console.log(error);
  }
} 
module.exports= {getApiInfo}