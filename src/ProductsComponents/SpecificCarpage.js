import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../firebase';
import CarSlider from './CarSlider'
import './SpecificCarpage.css'

const SpecificCarpage = () => {

    const {id, brand} = useParams()
    const [car, setCar] = useState("");
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

     function GetCurrentCar() {
     
      useEffect(()=>{
        const getCar = async () => {

          const docRef = doc(db, `cars-${brand.toUpperCase()}`,id);
          const docSnap = await getDoc(docRef);
          setCar(docSnap.data());
        };
        getCar();
      }, [])  
      return car
    }
    GetCurrentCar();

    let overalltax = 10/100;
    let overcommission = 10/100;
    let extraforprofit = 10/100;  
  
    let mrp = parseInt(car.price)
    mrp = mrp + overalltax*mrp + overcommission*mrp + extraforprofit*mrp
    const saleprice = mrp - extraforprofit*mrp

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
    <div>

    {car ? <div className='mycar__container'>
      <div className='car_img_container'>
        <img src={car.carimage} />
      </div>

      <div className='car__data'>
         <p className='car__head'>{car.cartitile}</p>
      
        <div className='price__container'>
            <p className='mrp'>MRP: <p className='rate'>{car.price}</p></p>
            <p className='sale__price'>Discount Price:<p className='rate'>{saleprice}</p></p>
            <p className='you_save'>You Save: {mrp - saleprice}</p>
      </div>
      <div className='car__details'>Details:</div>
      <p className='car_descriprtion'>{car.description}</p>
      <div className='row__container'>
        <div className='cod_warranty_replacement'>
        <div className='cod'>
          <div className='img__circle'>
            <img src='https://cdn-icons-png.flaticon.com/512/1554/1554401.png'/>
          </div>
          <p>Cash On Dilvery</p>
        </div>
        <div className='warranty'>
          <div className='img__circle'>
            <img src='https://img.freepik.com/premium-vector/red-warranty-stamp-flat-design-check-mark-icon-checklist-document-shield-icon_476325-118.jpg?w=2000'/>
          </div>
          <p>{car.warranty} year warranty</p>
        </div>
        <div className='easy__returns'>
          <div className='img__circle'>
            <img src='https://cdn-icons-png.flaticon.com/512/670/670910.png'/>
          </div>
          <p>30 days replacement</p>
        </div>
      </div>
          <div className='buy__cart'>
              <button className='buy__now'>Buy Now</button>
              <button className='addto__cart' onClick={addtocart}>Add to Cart</button>
          </div>
      </div>
      {successMsg && <>
        <div className='success__msg'>{successMsg}</div>
      </>}
      {errorMsg && <>
      <div className='error__msg'>{errorMsg}</div>
      </>}
      </div>  

    </div>
    :<div>Loading...</div>
    }
    <p className='mycar__container2'>Similar Cars</p>
    <CarSlider type={brand} />
    </div>
  )   
}

export default SpecificCarpage