import React  from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getCountries, getActivities,filterCountriesbyContinent, orderByName, orderByPopulation ,filterByActivities, getDetail} from '../Actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginate from './Paginado';
import SearchBar from './SearchBar';
import '../Styles/Home.css'




export default function Home () {
    const dispatch = useDispatch();
    const allCountries = useSelector(state => state.countries);
    const allActivities = useSelector ((state) => state.activities)
    const[orden,setOrden]= useState('')
    const [currentPage, setCurrentPage] = useState(1);
    const [countriesPerPage, setCountriesPerPage] = useState(10);
    const indexOfLastCountrie = currentPage*countriesPerPage;
    const indexOfFirstCountrie = indexOfLastCountrie-countriesPerPage;
    const currentCountries = allCountries.slice(indexOfFirstCountrie, indexOfLastCountrie);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect((() => {
        dispatch(getCountries());
        dispatch(getActivities());
        dispatch(getDetail())
    }), [dispatch]); 


function handleClickCountries(e){
    e.preventDefault();
    dispatch(getCountries())
  
}

function handleSortAlpha(e){
    e.preventDefault();
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleSortPopulation(e){
    e.preventDefault();
    dispatch(orderByPopulation(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleFilterStatus(e){
    dispatch(filterCountriesbyContinent(e.target.value))
} 

function handleFilterByAct(e){
        e.preventDefault()
        e.target.value === "none" ? dispatch(getCountries()):
        dispatch(filterByActivities(e.target.value))
}

    return (
        <div className='contenedorHome'>
            
            <h1 className='title'>HENRY COUNTRIES</h1>

            <div className='Searchbar'>
            <SearchBar/>
            </div>
            
            <div className='filtros'>
    
                <Link className='createActivity' to= '/activities' >Create Activity</Link>
                <a className='reload' onClick={e=>{handleClickCountries(e)}}>Reload Countries</a>

                {/* Ordenamiento */}
                <select className='selectContent' onChange={e=>handleSortAlpha(e)}>
                    <option>ORDERING</option>
                    <option value='asc'>Ascending</option>
                    <option value='desc'>Descending</option>
                </select>
                
                {/* Filtro por poblacion */}
                <select className='selectContent' onChange={e=>handleSortPopulation(e)}>
                    <option>POPULATION</option>
                    <option value='all'>All</option>   
                    <option value='morepop'>More Population</option>
                    <option value='lesspop'>Less Population</option>
                </select>

                {/*Filtro por continente */}
                <select className='selectContent' onChange= {e=> handleFilterStatus(e)}>
                    <option>CONTINENT</option>
                    <option value='all'>All</option>
                    <option value='Africa'>Africa</option>
                    <option value='Americas'>America</option>
                    <option value='Antarctic'>Antartica</option>
                    <option value='Asia'>Asia</option>
                    <option value='Europe'>Europe</option>
                    <option value='Oceania'>Oceania</option>
                </select> 

                {(allActivities.length === 0)? <p>No se han creado actividades</p> :
                <select className='selectContent' onChange={e => handleFilterByAct(e)}>
                <option value="none">ACTIVITY</option>
                {allActivities.map(e => (
                <option value={e.name} key={e.id}>{e.name}</option>
                ))}
                </select>
                }
            </div>

            
            <div className='contenedorTarjetas'>
                {currentCountries?.map((p) => {
                    return (
                     
                // <Link to={'/home/' + p.id}>/*
            <Link  to={'/countries/' + p.id}>
                <Card  flag={p.flag} name={p.name} continent={p.continent} key={p.id}/>
            </Link>               
                   
                    );
                })} 
            </div>
            <Paginate countriesPerPage={countriesPerPage} allCountries={allCountries.length} paginate={paginate} />
        </div>
        
        )
}