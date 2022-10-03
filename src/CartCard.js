import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import "./CartCard.css";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const CartCard = (props) => {
  const [productquantity, setproductquantity] = useState(props.itemdata.productquantity);


  let p = props.itemdata.car.price;
  let overalltax = 10 / 100;
  let overcommission = 10 / 100;
  let extraforprofit = 10 / 100;

  let mrp = parseInt(p);
  mrp = mrp + overalltax * mrp + overcommission * mrp + extraforprofit * mrp;
  const saleprice = (mrp - extraforprofit * mrp) * productquantity;

  const increasequantity = () => {
    setproductquantity(productquantity + 1);
  };
  const decreasequantity = () => {
    if (productquantity >= 1) {
      setproductquantity(productquantity - 1);
    }
  };

  const deletecartitem = async () => 
  {
    await deleteDoc(doc(db,`cart-${props.userid}`, `${props.itemdata.id}`))
    .then(() => {
      
    }) 
  };

  return (
    <div className="cart_car_container">
      <div className="cart_car_imgtitle">
        <div className="car_image">
          <img src={props.itemdata.car.carimage} />
        </div>
        <div className="car_title">{props.itemdata.car.cartitile}</div>
      </div>
      <div className="carquantity_div">
        <button onClick={increasequantity}>+</button> 
        <p>{productquantity}</p>
        <button onClick={decreasequantity}>-</button>
      </div>
      <div className="carprice">{saleprice}</div>
      <button className="deletebutton" onClick={deletecartitem}>
        <DeleteIcon />
      </button>
    </div>
  );
};

export default CartCard;
