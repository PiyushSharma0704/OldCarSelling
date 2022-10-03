import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { auth, db } from './firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import "./Signup.css";

function Signup() {

    const [name, setUserName] = useState("");
    const [number, setUserNumber] = useState("");
    const [email, setUserEmail] = useState("");
    const [password, setUserPassword] = useState("");
    const [address, setUserAddress] = useState("");

    const navigate = useNavigate();

    const [errorMsg, setErrorMsg] = useState();
    const [successMsg, setSuccessMsg] = useState();

    const handleSubmit = (e)=>{
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const initialcartValue = 0;
        console.log(user);
        
        addDoc(collection(db,"users"), {
          name: name,  email: email, number: number,
          password: password, cart: initialcartValue, address: address,
          uid: user.uid 
        }).then(()=>{
          setSuccessMsg('Your account has been successfully created. You will now be automaticaly redirected to the login page.')

          setUserName('')
          setUserNumber('')
          setUserEmail('')
          setUserPassword('')
          setErrorMsg('')
          setTimeout(() => {
            setSuccessMsg('');
            navigate('/login')
          }, 4000);
        })
        .catch((error)=> { setErrorMsg(error.message)});
      }) 
      .catch((error) => {
        if(error.message == 'Firebase: Error (auth/invalid-email)')
        {
          setErrorMsg('Please fill all the required fiels')
        }
        if(error.message == 'Firebase: Error (auth/email-already-exists)')
        {
          setErrorMsg('User is already registered');
        }
      })

    }

  return (

      <div className='signup'>
        <Link to="/">
            <img className='header__logo'
              src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" />
            </Link>
            <div classname='signup__container'>
            <form className='signup__form' onSubmit={handleSubmit}>
              <p>Create Your Account</p>

            {successMsg && <><div className='success__msg'>{successMsg}</div></>}
            {errorMsg && <><div className='error__msg'>{errorMsg}</div></>}
            <label>Name</label>
            <input onChange={(e) => setUserName(e.target.value)} type="text" placeholder="Enter your name" />
            
            <label>Mobile Number</label>
            <input onChange={(e) => setUserNumber(e.target.value) } type="tel" placeholder="Enter your number" />
            
            <label>Email</label>
            <input onChange={(e)=> setUserEmail(e.target.value)} type="email" placeholder="Enter your Email" />
            
            <label>Password</label>
            <input onChange={(e)=> setUserPassword(e.target.value)} type="password" placeholder='Enter your password'/>
            
            <label>Address</label>
            <textarea onChange={(e)=> setUserAddress(e.target.value)}></textarea>
            
            <button type='submit'>Sign Up</button>

            <div>
                <span>Already have an account?</span>
                <Link to="/login">Sign In</Link>
            </div>
              


        </form>        

    </div>
    </div>
  )
}

export default Signup