import { async } from "@firebase/util";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import "./UserProfile.css";

function UserProfile() {
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
  console.log(loggeduser);

  return (
    <div className="userprofile__outercontainer">
      {loggeduser ? (
        <div className="user_profile">
          <p>Your Account Details</p>

          <div className="data_row">
            <span>Your Name:</span>
            <span>{loggeduser[0].name}</span>
          </div>
          <div className="data_row">
            <span>Your Email:</span>
            <span>{loggeduser[0].email}</span>
          </div>
          <div className="data_row">
            <span>Your Phone Number:</span>
            <span>{loggeduser[0].number}</span>
          </div>
          <div className="data_row">
            <span>Your Address:</span>
            <span>{loggeduser[0].address}</span>
          </div>
        </div>
      ) : (
        <div>You are not Logged In</div>
      )}
    </div>
  );
}

export default UserProfile;
