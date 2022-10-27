import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../redux/actions/index";
import { useEffect } from "react";
import '../Styles/detail.css'

export default function Detail(props) {
  console.log(props);

  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getDetail(id));
  }, [dispatch, id]);

  const myDog = useSelector((state) => state.detail);

  return (
    <div className="backgroundDetail">
      {myDog.length > 0 ? (
        <div className="detailDiv">
          <h1>{myDog[0].name}</h1>
          <img
            src={myDog[0].image}
            width="250px"
            height="250px"
            alt="img not found"
          />
          <h3>
            Weight: {myDog[0].weightMin} to {myDog[0].weightMax} kg
          </h3>
          <h3>
            Height: {myDog[0].heightMin} to {myDog[0].heightMax} cm
          </h3>
          <h3>
            Temperaments: {!myDog[0].createdInDb ?
              myDog[0].temperaments ? 
              myDog[0].temperaments.join(", ")
              :'no temperaments'
              : myDog[0].temperaments.map((el) => el.name).join(", ")}
          </h3>
          <h3>Life Span: {myDog[0].life_span} </h3>
          </div>
      ) : (
        <p>Loading...</p>
        
      )}
      <Link to="/home">
        <button>Back</button>
      </Link>
      </div>
  );
}
