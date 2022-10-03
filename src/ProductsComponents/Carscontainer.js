import React, { useEffect, useState } from 'react'
import './Carscontainer.css'
import { Link } from 'react-router-dom';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Carscontainer = (car) => {

  let overalltax = 10/100;
  let overcommission = 10/100;
  let extraforprofit = 10/100;

  let mrp = parseInt(car.car.price)
  mrp = mrp + overalltax*mrp + overcommission*mrp + extraforprofit*mrp
  const saleprice = mrp - extraforprofit*mrp

  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const addtocart = () =>{
    if(loggeduser){
      addDoc(collection(db,`cart-${loggeduser[0].uid}`),{
        car, quanity:1 
      }).then(() => {
        setSuccessMsg('Car added to your cart');
      }).catch((error) => { setErrorMsg(error.message)})

    } 
    else{
      setErrorMsg('You need to login first')
    }
  }

  return (
    <div className='cars__container'>
      <img src={car.car.carimage} />
      <div className='car__detail'>
        <a href={`/car/${car.car.brand}/${car.car.id}`}>
            <button className='car__title'>{car.car.cartitile}</button>
        </a>
      <div className='price__container'>
        <p className='mrp'>MRP: <p className='rate'>{mrp}</p></p>
        <p className='sale__price'>Discount Price:<p className='rate'>{saleprice}</p></p>
        <p className='you__save'>You Save: {mrp - saleprice}</p>
      </div> 
      <div className='btn__container'>
        <button className='btn'>Buy Now</button>
        <button className='btn' onClick={addtocart}>Add To Cart</button>
      </div>
      </div>
    </div>
  )
}

export default Carscontainer