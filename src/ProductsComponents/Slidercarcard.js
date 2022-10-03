    import React from 'react'
import { Link } from 'react-router-dom';
    import './Slidercarcard.css'
    
    const Slidercarcard = (car) => {

      let overalltax = 10/100;
      let overcommission = 10/100;
      let extraforprofit = 10/100;
     
      let mrp = parseInt(car.car.price)
      mrp = mrp + overalltax*mrp + overcommission*mrp + extraforprofit*mrp
      const saleprice = mrp - extraforprofit*mrp

      return (
        <div class='mini_car_container'>
            <div className='mini_img_container'>
                <img src={car.car.carimage} />
            </div>
            <div className='mini_car_detail'>
              <p className='mini_cartitle'>{car.car.cartitile}</p> 
            </div>

            <div className='mini_price__container'>
                <p className='mrp'>MRP: <p className='rate'>{mrp}</p></p>
                <p className='sale__price'>Discount Price:<p className='rate'>{saleprice}</p></p>
                <p className='you__save'>You Save: {mrp - saleprice}</p>

          
          <a href={`/car/${car.car.brand}/${car.car.id}`}> 
               <button className='show_more_btn'>Show More &gt;</button>
           </a>

           </div> 
        </div>
      )
    }
    
    export default Slidercarcard