import React from "react";
import { useHistory } from "react-router-dom";
import { postActivities,getActivities, getCountries } from "../Actions/index"
import { useDispatch,useSelector }  from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import '../Styles/ActivityCreate.css'

function validate(input){
    let errors = {};

    if(!input.name) errors.name = 'Name required'
    else if (/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = 'You can´t use special characters'
    
    if(!input.difficulty) errors.difficulty = 'Difficulty required'
    
    if(!input.duration) errors.duration = 'Duration required'

    if(!input.season) errors.season = 'Season required'

    if(!input.countryId) errors.countryId = 'You have to select at less one Country'

    return errors;

}


export default function ActivityCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const countries = useSelector((state) => state.countries)
  const [errors,setErrors] = useState({})

  const [input,setInput] = useState({
    name:'',
    difficulty:'',
    duration:'',
    season:'',
    countryId:[]
  })

function handleChange(e){
    setInput({
        ...input,
        [e.target.name] : e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}


function handleSelectCountry(e){
    setInput({
        ...input,
        countryId:[...input.countryId, e.target.value]
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}
function handleSelectSeason(e){
    setInput({
        ...input,
        season: e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}

function handleSelectDifficulty(e){
    setInput({
        ...input,
        difficulty: e.target.value
    })
    setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
    }))
}

function handleSubmit (e){
    e.preventDefault();
       
    
    if(!input.name || !input.difficulty || !input.duration || !input.season || !input.countryId) {
        return alert ('Complete correctamente el formulario antes de enviarlo')
    } else{
        dispatch(postActivities(input)) 
    alert('Actividad agregada con exito')
    setInput({
        name:'',
        difficulty:'',
        duration:'',
        season:'',
        countryId:[]
    })
    history.push('/home')
}}

function handleDelete(el){
    setInput({
        ...input,
        countryId: input.countryId.filter(del => del !== el)
    })
}

  useEffect(()=>{
    dispatch(getActivities())
    dispatch(getCountries())
  }, []);





  return (
    <div className="container-father">

        
        <h1 className='titleCreate'>Create Activity</h1>

        <div className="containerCreation">
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='nameValue'>

                    <label>Name:</label> <br />
                    {
                        errors.name && ( 
                            <h3 className="ErrorText">{errors.name}</h3>
                        )
                        
                    } <br />
                    <input className='inputCreate' type='text' value={input.name} name='name' onChange={handleChange}></input>

                </div>

                <div className='nameValue'>
                    <label >Difficulty: </label>
                    {
                        errors.difficulty && ( 
                            <h3 className="ErrorText">{errors.difficulty}</h3>
                        )     
                    } <br />
                    <select className="selectId" name="difficulty" id="difficulty" onChange={(e) => handleSelectDifficulty(e)}>
                    <option value="vacio"> </option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                    </select>
                </div>
                
                <div>
                    <label>Duration:</label><br />
                    {
                        errors.duration && (
                            <h3 className="ErrorText">{errors.duration}</h3>
                        )
                    }<br />
                    <input  className='inputCreate' type='text' value={input.duration} name='duration' onChange={handleChange}></input>
                </div>

                <div className='nameValue'>
                    <label >Season: </label>
                    {
                        errors.season && ( 
                            <h3 className="ErrorText">{errors.season}</h3>
                        )  
                    } <br />
                    <select className="selectId" name="season" id="season" onChange={(e) => handleSelectSeason(e)}>
                    <option value="vacio"> </option>
                            <option value={"Verano"}>Verano </option>
                            <option value={"Invierno"}>Invierno </option>
                            <option value={"Primavera"}>Primavera </option>
                            <option value={"Otoño"}>Otoño </option>
                    </select>
                </div>
                

                <select  className='selectId' onChange={(e)=>handleSelectCountry(e)}>
                    {countries.map((country)=>(
                        <option value={country.id}>{country.name}</option>
                    ))}
                </select>
                {
                    errors.countryId && (
                    <h3 className="ErrorText">{errors.countryId}</h3>
                )} <br />
                       
            {input.countryId.map(el=>
                <div className="divCreate"> 
                    <p className="pCreate">{el}</p>
                    <button className='buttonX' onClick={()=> handleDelete(el)}>x</button>
                </div>
            )} 
            
            <br />
                <button className='buttonCreate' type='submit'>Create!</button>
            </form>

        </div>
    </div>
  )

}

