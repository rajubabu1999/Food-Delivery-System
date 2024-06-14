import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import Modal from '../Modal';
import Badge from 'react-bootstrap/Badge';
import Cart from '../screen/Cart';
import { useCart } from '../components/ContextReducer';
export default function Navbar() {
  const [cartView,setCartView]=useState(false)
  let data=useCart();
  console.log(data);
  const navigate=useNavigate();
  const handleLogout=()=>{
    localStorage.removeItem("authToken");
    navigate("/login");

  }
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1 fst-italic " to="/">
            Second Wife Resturant
          </Link>
     


          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5 "
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
              {/* jab sign in hoga to myorder dikana start ho jaye  isko hum ternary operation se karenge*/}
              {(localStorage.getItem("authToken")) ? (
                <li className="nav-item">
                  <Link
                    className="nav-link active fs-5 "
                    aria-current="page"
                    to="/"
                  >
                    myorder
                  </Link>
                </li>
              ) : (
                ""
              )}
            </ul>

            {/* login and sinup ko alag kar diye taki jab koi login hoga wo in dono ko nai logout ko dhek sake */}
             {/* iske andar v ek aur logic lagega ke login,signup  tab dhike jab token na ho */}
             {(!localStorage.getItem("authToken")) ?
            <div className="d-flex">
              <Link className="btn bg-white text -success mx-1 text-dark" to="/login">
                Login
              </Link>

              <Link className="btn bg-white text -suceess mx-1 text-dark" to="/creatuser">
                Signup
              </Link>
            </div>
            :
            <div>
                  {/* //  cart ke liye  */}
                  <div className='btn bg-white text-success mx-2' onClick={ ()=>{setCartView(true)}}>
                  My Cart {" "}
                  <Badge pill bg='danger'>{data.length}</Badge>
                  </div>
                  {cartView ? <Modal onClose={() => setCartView(false)}><Cart></Cart></Modal> : ""}

            <div className='btn bg-white text-danger mx-2' onClick={handleLogout}>
              Logout
              </div>
              </div>
            }
         
          </div>
        </div>
      </nav>
    </div>
  );
}
