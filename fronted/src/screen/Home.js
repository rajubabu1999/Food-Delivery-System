import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousal from "../components/Carousal";

export default function Home() {  
  // use state for search baar
   const [search,setSearch]=useState('');  //ye ek empty string hogi
  // -------------------------
  //  useState  concept;
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async () => {
    // https://secondwiferesturant.onrender.com
    let response = await fetch("https://secondwiferesturant.onrender.com/api/foodData", {
      method: "POST",
      headers: {
        "content-Type": "application/json"
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }

  //  use effect ka syntax
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade " data-bs-ride="carousel" style={{objectFit:"contain !important"}}>

<div className="carousel-inner " id='carousel'>
    <div className=" carousel-caption  " style={{ zIndex: "15" }}>
        <div className=" d-flex justify-content-center">  {/* justify-content-center, copy this <form> from navbar for search box */}
            <input className="form-control me-2 w-75 bg-white text-dark" type="search" placeholder="Type in..." aria-label="Search" value={search} onChange={(e)=>{setSearch(e.target.value)}} />
            {/* <button className="btn text-white bg-success" type="submit">Search</button> */}
        </div>
    </div>
    <div className="carousel-item active" >
        <img src="https://source.unsplash.com/random/900x500/?burger" className="d-block w-100  " style={{ filter: "brightness(100%)" }} alt="..." />
    </div>
    <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x500/?pastry" className="d-block w-100 " style={{ filter: "brightness(100%)" }} alt="..." />
    </div>
    <div className="carousel-item">
        <img src="https://source.unsplash.com/random/900x500/?barbeque" className="d-block w-100 " style={{ filter: "brightness(100%)" }} alt="..." />
    </div>
</div>
<button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
</button>
<button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
</button>
</div>
      </div>
      <div className="container"> 
        {/* ternary operaor */}
        {foodCat !== []
          ? foodCat.map((data) => {
              return (  
                <div className="row mb-3" key={data._id}>
                  <div key={data._id} className="fs-3 m-3">
                    {data.CategoryName}
                  </div>
                  <hr />
                  {foodItem !== [] ? (
                    foodItem
                      .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase())) )
                      .map((filterItems) => {
                        return (
                          <div key={filterItems.id} className="col-12 col-md-6 col-lg-3">
                            <Card  foodItem={filterItems}
                            // foodName={filterItems.name}
                            options={filterItems.options[0]}
                            // imgSrc={filterItems.img}
                            ></Card>
                          </div>
                        );
                      })
                  ) : (
                    <div> No such Data found</div>
                  )}
                </div>
              );
            })
          : ""}
       
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}
