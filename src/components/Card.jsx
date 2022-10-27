import React from "react";
import "../Styles/card.css"


export default function Card({name,image,temperaments,weightMax,weightMin,createdInDb}) {
    return (
        <li className="dogCard">
            <h4>{name}</h4>
            <img src={image} alt="img not found" className="dogImage" width={230} height={280}/>
            <h4>Temperaments: {!createdInDb ? temperaments.join(', ') : temperaments.map(el=> el.name).join(', ')}</h4>
             { weightMax? <h4>Weight: {weightMin} to {weightMax} kg</h4> : <h4>Weight: {weightMin} kg</h4>}        
        </li>
    )
}