import { async } from "@firebase/util";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, db, storage } from "./firebase";
import "./Sellcar.css";

function Sellcar() {
  const [cartitile, setCarTitle] = useState("");
  const [cartype, setCarType] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState();
  const [customersupport, setCustomerSupport] = useState();
  const [price, setPrice] = useState();
  const [warranty, setWarranty] = useState();
  const [carimage, setCarImage] = useState(null);

  const [imageError, setImageError] = useState();
  const [successMsg, setSuccessMsg] = useState();
  const [uploadError, setUploadError] = useState();

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

  //  console.log(loggeduser);

  const types = ['image/jpg','image/png', 'image/PNG', 'image/jpeg']
  const handleProductImage = (e) => {
    e.preventDefault();
    let selectedFile = e.target.files[0];

    if (selectedFile) {
      if (selectedFile && types.includes(selectedFile.type)) {
        setCarImage(selectedFile);
        setImageError('');
      } else {
        setCarImage(null);
        setImageError("Please select the correct file type");
      }
    } else {
      setImageError("Please select Your File");
    }
  };    


  const handleSellCar = (e) => {
    e.preventDefault();
    const storageRef = ref(storage, `car-images${brand.toUpperCase()}/${Date.now()}`)
    
//    console.log(storageRef._location.path)  
    uploadBytes(storageRef, carimage)
      .then(() => {
        getDownloadURL(storageRef).then(url => {
          addDoc(collection(db, `cars-${brand.toUpperCase()}`), {
          cartitile,
          cartype,
          description,
          brand,
          customersupport,
          price,
          warranty,
          carimage: url
          })
        })
      })
  }

  return (
    <div>
      {loggeduser && loggeduser ? (
        <div className="SellCar__container">
          <form className="SellCar__form" onSubmit={handleSellCar}>
            <p>Add Your Used Car</p>
            {successMsg && <div className="success_msg">{successMsg}</div>}
            {uploadError && <div className="upload_msg">{uploadError}</div>}
            <lable>Car Name:</lable>
            <input
              type="text"
              onChange={(e) => {
                setCarTitle(e.target.value);
              }}
            />
            <lable>Car Type:</lable>
            <input
              type="text"
              onChange={(e) => {
                setCarType(e.target.value);
              }}
            />
            <lable>Car Description:</lable>
            <textarea
              type="text"
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            <lable>Car Brand:</lable>
            <input
              type="text"
              onChange={(e) => {
                setBrand(e.target.value);
              }}
            />
            <lable>Contact Number:</lable>
            <input
              type="text"
              onChange={(e) => {
                setCustomerSupport(e.target.value);
              }}
            />
            <lable>Car Price:</lable>
            <input
              type="text"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
            <lable>Car Warranty:</lable>
            <input
              type="text"
              onChange={(e) => {
                setWarranty(e.target.value);
              }}
            />
            <lable>Car Image:</lable>
            <input onChange={handleProductImage} type="file"/>
            {imageError && (
              <>
                <div className="error_msg">{imageError}</div>
              </>
            )}
            <button type="submit">Add</button>
          </form>
        </div>
      ) : (
        <div>You need to Login First</div>
      )}
    </div>
  );
}

export default Sellcar;
