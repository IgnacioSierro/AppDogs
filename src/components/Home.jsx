import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDogs, getTemperaments, filterCreated, filterByTemperament, orderByName, orderByWeight, clearDetail, orderByHeight } from "../redux/actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import Pagination from "./Paginado";
import SearchBar from "./SearchBar";
import "../Styles/home.css"

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemperaments = useSelector((state) => state.temperaments);
  const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8);
    const indexOfLastDog = currentPage * dogsPerPage;
    const indexOfFirstDog = indexOfLastDog - dogsPerPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    const [order, setOrder] = useState("")

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemperaments());
    return () => {
      dispatch(clearDetail())
    }
  }, [dispatch]);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getDogs());
    setCurrentPage(1)
  };

  const handleCreated = (e) => {
      dispatch(filterCreated(e.target.value))
      setCurrentPage(1)
  }

  const handleTemperament = (e) => {
      dispatch(filterByTemperament(e.target.value))
      setCurrentPage(1)
  }

  const handleOrderByName = (e) =>{
      e.preventDefault()
      dispatch(orderByName(e.target.value))
      setCurrentPage(1)
      setOrder(`ordered${e.target.value}`)
  }

  const handleOrderByWeight = (e) =>{
    e.preventDefault()
    dispatch(orderByWeight(e.target.value))
    setCurrentPage(1)
    setOrder(`ordered${e.target.value}`)
}

  return (
    <div className="backgroundHome">
      <Link to="/dog">
      <div className="createDiv">
        <button className="create">Create a new Dog ➕</button>
        </div>
      </Link>
      <div className="resetdiv">
      <button className="reset"
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Reset Dogs 🔄
      </button>
      </div>

      <div className="search">
        <SearchBar/>
        </div>
        
      <div className="order-filter">
      <label>Order by name: </label>
        <select onChange={e => handleOrderByName(e)}>
            <option value="asc_name">Asc 🔼</option>
            <option value="desc_name">Desc 🔽</option>
            </select>
            <label>  Order by weight: </label>
        <select onChange={e => handleOrderByWeight(e)}>
          <option value="asc_weight">Asc 🔼</option>
          <option value="desc_weight">Desc 🔽</option>
          </select>
          <label>  Filter by created: </label>
        <select onChange={e => handleCreated(e)}>
          <option value="all">All</option>
          <option value="created">Created</option>
          <option value="api">Existent</option>
        </select>
        <label>  Filter by temperament: </label>
        <select onChange={e => handleTemperament(e)}>
            <option value="all">All</option>
            {
                allTemperaments.map(el => (
                    <option value={el.name} key={el.id}>{el.name}</option>
                ))
            }
        </select>
        </div>
        <div className="paginado">
        <Pagination 
                dogsPerPage={dogsPerPage}
                allDogs={allDogs.length}
                paginado={paginado}
                />
                </div>
    <ul className="dogGrid">
      {currentDogs?.map((d) => {
        return (
            <Link to={"/home/" + d.id} className = "homeLink">
              <Card createdInDb={d.createdInDb} name={d.name} image={d.image} weightMax={d.weightMax} weightMin={d.weightMin} temperaments={d.temperaments ? d.temperaments : d.temperaments && d.temperaments.map(t => t.name + ' ')}  key={d.id} />
            </Link>
        );
            })} 
            </ul>
    </div>
  )
}
