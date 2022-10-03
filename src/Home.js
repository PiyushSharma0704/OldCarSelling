import { async } from '@firebase/util'
import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import Banner from './Banner'
import { auth, db } from './firebase'
import Header from './Header'
import CarSlider from './ProductsComponents/CarSlider'

function Home() {

    function GetCurrentUser() {
      const [user, setUser] = useState('')
      const userCollectionRef = collection(db,"users")

      useEffect(() => {
        auth.onAuthStateChanged(userlogged=>{
          if(userlogged){
            const getUsers = async ()=>{
              const q = query(collection(db, "users"), where("uid", "==", userlogged.uid))
              // console.log(q)
              const data = await getDocs(q)
              setUser(data.docs.map((doc)=>({...doc.data(),id:doc.id})))
            }
            getUsers();
          }
          else(
            setUser(null)
          )
        })
      },[])
      return user
    }
    const loggeduser = GetCurrentUser();
    //console.log(loggeduser)

  return (
    <div className='home'>
      <Header />
      <Banner />
      <CarSlider type={'Hyundai'} />
      <CarSlider type={'Tata'} />
      <CarSlider type={'Kia'} />
      <CarSlider type={'Maruti'} />

    </div>
  ) 
}

export default Home