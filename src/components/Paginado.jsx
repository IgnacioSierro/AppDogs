import React from "react";
import '../Styles/pagination.css'

function Pagination({dogsPerPage, allDogs, paginado}) {
    const pageNumbers = [];
  
    for(let i = 1; i<= Math.ceil(allDogs/dogsPerPage); i++) {
        pageNumbers.push(i);
    }
      return (
        <nav > 
            <ul className= 'paginado'>
                {pageNumbers.map((n)=> (
                    <li>
                        <button onClick ={ () => paginado(n)} >
                            {n}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
      );
    }
    
    export default Pagination; 