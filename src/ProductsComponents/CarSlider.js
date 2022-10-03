import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { db } from '../firebase';
import Slidercarcard from './Slidercarcard'


const CarSlider = (props) => {

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

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 5
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
        <Carousel responsive={responsive}>
            {cars.map((car) => 
            (<Slidercarcard
                key = {car.id}    
                car = {car}
            />)
            
            )}
        </Carousel>;
    </div>
  )
}

export default CarSlider