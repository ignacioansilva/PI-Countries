const axios = require ('axios');
const { Country, Activity } = require ('../db');


//saving api data
async function getApiInfo() {

    {
      const apiUrl = await axios.get('https://restcountries.com/v3/all');
      const infoCountriesApi = apiUrl.data.map((p) => {
        return {
           id: p.cca3,
           name: !p.translations.spa.common ? p.name.common : p.translations.spa.common,
           flag: p.flags[1],
           continent: p.region,
           capital:  !p.capital ? 'Sin datos' : p.capital[0],
           subregion: !p.subregion ? 'Sin datos' : p.subregion,
           area: p.area,
           population: p.population, 
        };
      });

      const saveData = () => {
      infoCountriesApi.map( (p) => {
        Country.findOrCreate({
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
        ).catch ((err) => { console.log (err); });
      });
      
    }
    saveData()
    console.log('DB loaded successfully')
    return infoCountriesApi;
  } 

} 

//getting api data from db
  const getDbInfo = async () =>{
    const countries = await Country.findAll({
      include: {
        model: Activity,
        atributes: ['name' , 'difficulty', 'duration', 'season'],
        through: {
          attributes: [],
        }
      }
    })
      return countries; 
    }
    
  //getting activities from db
    const getActivities = async () => {
      const activities = await Activity.findAll()
      console.log('Activities loaded succesfully')
      return activities;

  }
module.exports= {getDbInfo, getActivities, getApiInfo}