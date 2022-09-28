import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getCountriesByName } from "../Actions";
import '../Styles/SearchBar.css'

export default function SearchBar (){
    const dispatch = useDispatch();
    const [search, setSearch] = useState('');
    
    function handleChange(e) {
        e.preventDefault();
        setSearch(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getCountriesByName(search))
    }

    return (
        <div className='form'>
            <input className='input' type="text" placeholder='Buscar por Nombre' value={search} onChange={e =>handleChange(e)}/>
            <button className='submit' type='submit' onClick={(e) => handleSubmit(e)}>Go</button>
        </div>
    )
}

