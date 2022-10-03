import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import Carscontainer from './Carscontainer'
import './Allcarspage.css'

const Allcarspage = (props) => {

  const [cars, setCars] = useState([]);

  useEffect(() => {

    const getCars = () => {
        const carsArray = [];
        const path = `cars-${props.type.toUpperCase()}`;
       // console.log(path);

        getDocs(collection(db, path)).then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            carsArray.push({ ...doc.data(), id: doc.id })
            //console.log(doc.id, " => ", doc.data())

          })
          setCars(carsArray)
        }).catch((error) => {
          console.log(error.message);
        })
    }
    getCars()
  }, []);

  return (
    <div className='allcarpage'>
    <div className='heading'>
        <p>Top Results For {props.type}</p>
    </div>

    <div className="allcarcontainer">
        {cars.map((car) => (
          <Carscontainer key = {car.id} car = {car} />  
        ))}
      </div>
    </div>
  )
}

export default Allcarspage