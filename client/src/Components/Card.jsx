import React from "react";
import { Link } from "react-router-dom";
import '../Styles/Card.css'

export default function Card ({flag, name, continent, id}) {
    return (
        <div className='tarjeta'>
            <img className='imagen' src= {flag} alt='img not found' />

                <h1 className='nombre'>{name}</h1>
                <h2 className='continente'>{continent}</h2>
                {/* <Link to={`/countries/${id}`}></Link> */}
                <button className="buttonDetails">Details</button>

        </div>
    )
}