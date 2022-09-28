import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Actions";
import { useEffect } from "react";

export default function Detail(props){
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    }, [dispatch])

    const countrySelected = useSelector ((state)=> state.detail)

    return (
        <div>
            {
                countrySelected.length>0 ? 
                <div>
                    <img src={countrySelected[0].flag} alt={countrySelected[0].name}/>
                    <h1>{countrySelected[0].name}</h1>
                    <p>{countrySelected[0].capital}</p>
                    <p>{countrySelected[0].population}</p>
                    <p>{countrySelected[0].area} Km²</p>

                </div> : <p>Loading...</p>
            }

            <Link to='/home'>
                <button>Home</button>
            </Link>
        </div>



    )



}