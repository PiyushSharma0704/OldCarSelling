import "./Header.css";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { async } from "@firebase/util";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";

function Header() {
  function GetCurrentUser() {
    const [user, setUser] = useState("");
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userlogged) => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userlogged.uid)
            );
            // console.log(q)
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else setUser(null);
      });
    }, []);
    return user;
  }
  const loggeduser = GetCurrentUser();

  const handleAuthentication = () => {
    if (loggeduser) {
      auth.signOut();
    }
  };

  const [cartdata, setcartdata] = useState([]);
  if (loggeduser) {
    const getcartdata = async () => {
      const cartArray = [];
      const path = `cart-${loggeduser[0].uid}`;
      //console.log(path)
      getDocs(collection(db, path))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // console.log(doc.id, " => ", doc.data());
            cartArray.push({ ...doc.data(), id: doc.id });
          });
          setcartdata(cartArray);
          //console.log('done')
        })
        .catch("Error error error");
    };
    getcartdata();
  }

  return (
    <div>
      <div className="header">
        <Link to="/">
          <img
            className="header__logo"
            src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg"
          />
        </Link>

        <Link to="./newcar" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionOne">New Car</span>
          </div>
        </Link>

        <Link to="./usedcar" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionTwo">Used Car</span>
          </div>
        </Link>

        <Link to="./sellcar" style={{ textDecoration: "none" }}>
          <div className="header__option">
            <span className="header__optionTwo">Sell Car</span>
          </div>
        </Link>

        <div className="header__search">
          <input
            className="header__searchInput"
            type="text"
            placeholder="Search for Your Favourite Car Brand eg. Toyota or MG"
          />
          <SearchIcon className="header__searchIcon" />
        </div>

        <Link to="./userprofile">
          <div className="header__userIcon">
            <AccountCircleIcon />
          </div>
        </Link>

        <Link to="./login" style={{ textDecoration: "none" }}>
          <div onClick={handleAuthentication} className="header__signIn">
            <span className="header__optionlineOne">
              Hello {!loggeduser ? "Guest" : loggeduser[0].name}{" "}
            </span>
            <span className="header__optionlineTwo">
              {loggeduser ? "Sign Out" : "Sign In"}
            </span>
          </div>
        </Link>

        <Link to="./cartdata">
          <div className="header__basket">
            <ShoppingBasketIcon />
            <span className="headerbasket__icon">{cartdata.length}</span>
          </div>
        </Link>
      </div>
      <div className="car_brands">
        <a href="car-brands/Hyundai">
          <button>Hyundai</button>
        </a>
        <a href="car-brands/Kia">
          <button>Kia</button>
        </a>
        <a href="car-brands/Maruti">
          <button>Maruti</button>
        </a>
        <a href="car-brands/Tata">
          <button>Tata</button>
        </a>
      </div>
    </div>
  );
}

export default Header;
