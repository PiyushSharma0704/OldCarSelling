import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import "./Cart.css";
import CartCard from "./CartCard";

function Cart() {
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
      {cartdata ? (
        <div>
          <div className="cart__container">Your cart items</div>
          <div className="allcartitems">
            {cartdata.map((item) => (
              <CartCard key={item.id} itemdata={item} userid={loggeduser[0].uid} />
              //console.log(item);.
            ))}
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;
