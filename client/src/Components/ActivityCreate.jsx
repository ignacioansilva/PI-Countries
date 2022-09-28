import React from "react";
import { Link,useHistory } from "react-router-dom";
import { postActivities,getActivities, getCountries } from "../Actions/index"
import { useDispatch,useSelector }  from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import '../Styles/ActivityCreate.css'

function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = 'Name required'
    } else if (!input.difficulty){
        errors.difficulty = 'You have to choose a difficulty'
    } else if (!input.duration){
        errors.duration = 'Duration required'
    } else if (!input.season){
        errors.season = 'You have to choose a season'
    } else if (!input.countryId){
        errors.season = 'You have to select at less one Country'
    }

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

function handleCheckSeason(e){
    if(e.target.checked){
        setInput({
            ...input,
            season: e.target.value
        })
    }
}
function handleCheckDifficulty(e){
    if(e.target.checked){
        setInput({
            ...input,
            difficulty: e.target.value
        })
    }
}

function handleSelect(e){
    setInput({
        ...input,
        countryId:[...input.countryId, e.target.value]
    })

}

function handleSubmit (e){
    e.preventDefault();
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
}

function handleDelete(el){
    setInput({
        ...input,
        countryId: input.countryId.filter(occ => occ !== el)
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
                    {
                        errors.name && (
                            <h3 className="ErrorText">{errors.name}</h3>
                        )
                    }
                        {
                        errors.difficulty && (
                            <h3 className="ErrorText">{errors.difficulty}</h3>
                        )
                    }
                        {
                        errors.duration && (
                            <h3 className="ErrorText">{errors.duration}</h3>
                        )
                    }
                        {
                        errors.season && (
                            <h3 className="ErrorText">{errors.season}</h3>
                        )
                    }
                        {
                        errors.countryId && (
                            <h3 className="ErrorText">{errors.countryId}</h3>
                        )
                    }<br />
                    <label>Name:</label><br />
                    <input className='inputCreate' type='text' value={input.name} name='name' onChange={handleChange}></input>

                </div>
                <div>
                <label className="labelCreate">Difficulty:</label><br />
                    <label>
                        1
                        <input className='inputCreate' type='checkbox' value='1' name='1' onChange={(e)=>handleCheckDifficulty(e)}/>

                    </label>

                    <label className="labelCreate">
                        2
                        <input type='checkbox' value='2' name='2' onChange={(e)=>handleCheckDifficulty(e)}/>

                    </label>

                    <label className="labelCreate"> 
                        3
                        <input  className='inputCreate' type='checkbox' value='3' name='3' onChange={(e)=>handleCheckDifficulty(e)}/>
                        
                    </label>

                    <label className="labelCreate">
                        4
                        <input  className='inputCreate' type='checkbox' value='4' name='4' onChange={(e)=>handleCheckDifficulty(e)}/>
                        
                    </label>

                    <label className="labelCreate">
                        5
                        <input  className='inputCreate' type='checkbox' value='5' name='5' onChange={(e)=>handleCheckDifficulty(e)}/>
                        
                    </label>

                </div>
                <div>
                    <label>Duration:</label><br />
                    <input  className='inputCreate' type='text' value={input.duration} name='duration' onChange={handleChange}></input>
                </div>
                <div>

                    <label>Season:</label><br />
                    <label>
                    Summer
                        <input className='inputCreate' type='checkbox' value='Verano' name='Verano' onChange={(e)=>handleCheckSeason(e)}/>
                        
                    </label>

                    <label>
                    Winter
                        <input className='inputCreate' type='checkbox' value='Invierno' name='Invierno' onChange={(e)=>handleCheckSeason(e)}/>
                        
                    </label>

                    <label>
                    Spring
                        <input className='inputCreate' type='checkbox' value='Primavera' name='Primavera' onChange={(e)=>handleCheckSeason(e)}/>
                        
                    </label>

                    <label>
                    Autumn
                        <input className='inputCreate' type='checkbox' value='Otoño' name='Otoño' onChange={(e)=>handleCheckSeason(e)}/>
                        
                    </label> 

                </div>

                <select  className='selectId' onChange={(e)=>handleSelect(e)}>
                    {countries.map((country)=>(
                        <option value={country.id}>{country.name}</option>
                    ))}
                </select>
                        {/* <ul><li>{input.countryId.map(el=>el + ' ,')}</li></ul> */}
                <br />
                       
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
