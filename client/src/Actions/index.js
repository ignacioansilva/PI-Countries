import axios from 'axios';

export function getCountries(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/countries', {
        });
    return dispatch({
            type: 'GET_COUNTRIES',
            payload: json.data
        });
    }
}

export function getCountriesByName(payload){ //payload == texto del searchbar
    return async function(dispatch){
        try{
            let json= await axios.get('http://localhost:3001/countries?name=' + payload)
            return dispatch({
                type:'GET_COUNTRIES_BY_NAME',
                payload: json.data
            })
        }
        catch(error){
            console.log(error)
        }
    }

}

export function getActivities(){
    return async function(dispatch){
        let json = await axios.get('http://localhost:3001/activities', {
        });
    return dispatch({
            type: 'GET_ACTIVITIES',
            payload: json.data
        });
    }
}
export function postActivities(payload){
    return async function(dispatch){
        let json = await axios.post('http://localhost:3001/activities',payload);
    return json; 
    }
}

export function filterCountriesbyContinent(payload){
    return {
        type: 'FILTER_BY_CONTINENT',    
        payload: payload
    }
}

export function orderByName(payload){
    return {
        type: 'ORDER_BY_NAME',
        payload: payload
    }
}

export function orderByPopulation(payload){
    return {
        type: 'ORDER_BY_POPULATION',
        payload:payload
    }
}
export function filterByActivities(payload){
    return {
        type: 'FILTER_BY_ACTIVITY',    
        payload: payload
    }
}

export function getDetail(id){
    return async function(dispatch){
        try{
            let json= await axios.get('http://localhost:3001/countries/'+id)
        return dispatch({
            type: 'GET_DETAIL',
            payload:json.data
        })
        } catch (error){
            console.log(error)
        }
    }
}

