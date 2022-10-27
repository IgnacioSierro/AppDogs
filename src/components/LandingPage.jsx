import React from "react";
import {Link} from "react-router-dom";
import "../Styles/landing.css"

export default function LandingPage() {
    return(
        <div className="background">
        <div className="contentContainer">
            <h2>WELCOME</h2>
            <Link to="/home"><img src='/assets/perro.png' alt="pokebola" className="dog"/></Link>
            <h2>CLICK ME 🐶</h2>
        </div>
        </div>
    )
}