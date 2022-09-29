
const initialState = {
    countries : [],
    allCountries : [],
    activities : [],
    detail: []
}

export function RootReducer(state=initialState,action) {
    switch(action.type){
        case 'GET_COUNTRIES':
            return {
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case 'GET_COUNTRIES_BY_NAME':
            return{
                ...state,
                countries:action.payload
            }

        case 'DETAIL':
            return{
                ...state,
                detail:action.payload
            }

        case 'POST_ACTIVITY':
            return {
                ...state,
            }
        
        case'GET_ACTIVITIES':
        return{
            ...state,
            activities:action.payload
        }


        case 'ORDER_BY_NAME':
            let sortedArray = action.payload === 'asc' ? state.countries.sort(function (a,b){
                if(a.name < b.name) {
                    return -1;
                }
                if(a.name > b.name) {
                    return 1;
                }
                return 0;
            }) :
            state.countries.sort(function(a,b){
                if(a.name > b.name) {
                    return -1;
                }
                if(b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries:sortedArray
            }

        case 'ORDER_BY_POPULATION':
            let sortedArrayPop = action.payload === 'lesspop' ? state.countries.sort(function (a,b){
                if(a.population < b.population) {
                    return -1;
                }
                if(a.population > b.population) {
                    return 1;
                }
                return 0;
            }) :
            state.countries.sort(function(a,b){
                if(a.population > b.population) {
                    return -1;
                }
                if(b.population > a.population) {
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                countries:sortedArrayPop
            }
        

        case 'FILTER_BY_CONTINENT':
            const allCountries = state.allCountries
            const statusFiltered = action.payload === 'all' ? allCountries : allCountries.filter(country => country.continent === action.payload)
            return {
                ...state,
                countries: statusFiltered,
            }

        case 'FILTER_BY_ACTIVITY':
            const allCountriesAct = state.allCountries
            const countriesFiltered = allCountriesAct.filter((country) => {
                return country.activities.length > 0;
                });
   
               let array = [];
   
               for (let i = 0; i < countriesFiltered.length; i++) {
               for (let j = 0; j < countriesFiltered[i].activities.length; j++) {
                if (countriesFiltered[i].activities[j].name === action.payload) {
                      array.push(countriesFiltered[i]);
                    }
                   }
                   }
   
               const filter = action.payload === "Todos" ? allCountriesAct : array;
   
               return {
                    ...state,
                    countries: filter,
           }
       
        default:            
            return state            
    }
}
