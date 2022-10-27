import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogsName } from "../redux/actions";
import "../Styles/searchBar.css"

export default function SearchBar ({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault(e)
        setName(e.target.value)
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault(e)
        dispatch(getDogsName(name))
        setName("")
    }

    function handleSearch(e) {
        e.preventDefault(e)
        dispatch(getDogsName(name))
        setName("")
    }

    return (
        <div>
        <div className="searchinputdiv">
            <input
            className="searchInput"
            type = "text"
            placeholder= "Search..."
            onChange = {(e) => handleInputChange(e)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            />
            </div>
            <div className="searchDivBtn">
            <button className="searchBtn" type="submit" onClick={e => handleSubmit(e)} >Search</button>
            </div>
        </div>
    )
}