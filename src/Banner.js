import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import banner1 from './Assets/Bannerimages/banner1.jpg'
import banner2 from './Assets/Bannerimages/banner2.jpg'
import banner3 from './Assets/Bannerimages/banner3.jpg'
import banner4 from './Assets/Bannerimages/banner4.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';

function Banner() {
  return (
    <Carousel >
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner1}
          alt="First slide"
          width="1000" height="350"
        />
        <Carousel.Caption>
          <h3>The road will never be the same</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner2}
          alt="Second slide"
          width="1000" height="350"
        />
        <Carousel.Caption>
          <h3>True definition of Luxury. Yours</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner3}
          alt="Third slide"
          width="1000" height="350"
        />
        <Carousel.Caption>
          <h3>Precision crafted performance</h3>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={banner4}
          alt="Fourth slide"
          width="1000" height="350"
        />
        <Carousel.Caption>
          <h3>Keeping ahead through technology</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Banner;