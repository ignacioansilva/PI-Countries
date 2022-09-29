import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../Actions";
import { useEffect } from "react";
import '../Styles/Details.css'

export default function Detail(props){
    
    const dispatch = useDispatch()
    console.log(props)
    useEffect(()=>{
        dispatch(getDetail(props.match.params.id));
    }, [])
    

    const countrySelected = useSelector ((state)=> state.detail)

    return (
        <div className="parentDetail">
            <Link to='/home'>
                <button className='buttonHomeDetails'>Home</button>
            </Link>
            {
                countrySelected.length > 0 ? 
                <div className="cardDetail">
                    <div className="imagenDetailCont">
                    <img className="imagenDetail" src={countrySelected[0].flag} alt={countrySelected[0].name}/>
                    </div>
                    <div className="infoDetail" >
                    <h1 className="NameDetail" >{countrySelected[0].name.toUpperCase()}</h1>
                        <ul>
                        <li className="liDetail" >Id: {countrySelected[0].id}</li>
                        <li className="liDetail" >Capital: {countrySelected[0].capital}</li>
                        <li className="liDetail" >Continent: {countrySelected[0].continent}</li>
                        <li className="liDetail" >Subregion: {countrySelected[0].subregion}</li>
                        <li className="liDetail" >Population: {countrySelected[0].population} people</li>
                        <li className="liDetail" >Area: {countrySelected[0].area} Km²</li>
                        </ul>
                    </div>
                    <div className='activitiesDetail'>  {countrySelected[0].activities?.map(el=>{
                        return(
                        <div className='activityCardDetail'>
                            <div className='activityInfo'>
 
                                <h3> <b> {el.name} </b></h3>
                                <h3>Difficulty: {el.difficulty}</h3>
                                <h3>Duration: {el.duration}</h3>
                                <h3>Season: {el.season}</h3>
                            </div>
                        </div>
                  )})}</div>

                <Link className='createActivityDetails' to= '/activities' >Create Activity</Link>
                </div> : <p>Loading...</p>
            }


        </div>



    )



}
