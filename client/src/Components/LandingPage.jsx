import React from "react";
import { Link } from "react-router-dom";
import '../Styles/LandingPage.css';

export default function LandingPage(){
    return(
        <div className="container">
            <h1 className="h1Landing">HENRY COUNTRIES</h1>
            <p className="pWelcome">Welcome to the website where you can add Activities to any country in the world.</p>
            
            <Link to="/home">
                <button className="btn">LETS START</button>
            </Link>
            <div className="footer">
                <p>Created by: <a href="https://linktr.ee/ignaciosilva" target='_blank'>Ignacio Silva</a></p>
            </div>
        </div>
    )
}