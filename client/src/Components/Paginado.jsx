import React from "react";
import '../Styles/Paginado.css'

export default function Paginate ({countriesPerPage, allCountries, paginate}){
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(allCountries / countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav className='contenedor'>
            <ul className='paginado'>
                {pageNumbers &&
                pageNumbers.map(number => {
                    return (
                    <li className='numero' key={number}>
                    <a onClick={()=>paginate(number)}>{number}</a>
                    </li>
                    )
                })}
            </ul>
        </nav>
    )

}