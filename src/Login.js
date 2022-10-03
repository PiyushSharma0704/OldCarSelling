import React, { useState } from 'react'
import  './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function Login() {

      const [email, setUserEmail] = useState("");
      const [password, setUserPassword] = useState("");
      const [errorMsg, setErrorMsg] = useState("");
      const [successMsg, setSuccessMsg] = useState("");
      const auth = getAuth();
      const navigate = useNavigate();

      const handleLogin = (e) => {
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setSuccessMsg('Logged in successfully')

           setUserEmail('')
           setUserPassword('')
           setErrorMsg('')
           setTimeout(() => {
              setSuccessMsg('');
              navigate('/')
            }, 2000);
          })
         .catch((error) => {
                  const errorCode = error.code;
                  console.log(error.msg)
                  if(error.message === 'Firebase: Error (auth/invalid-email)')
                  {
                    setErrorMsg('Please fill all the required fiels');
                  }
                  if(error.message === 'Firebase: Error (auth/user-not-found)')
                  {
                    setErrorMsg('User not found');
                  }
                  if(error.message === 'Firebase: Error (auth/wrong-password)')
                  {
                    setErrorMsg('Wrong Password');
                  }
         
              });

      }


  return ( 
    <div className='login'>
    <Link to="/">
        <img className='header__logo'
          src="https://imgd.aeplcdn.com/0x0/cw/static/icons/new-header/logo.svg" />
        </Link>
        <div classname='login__container'>
        <form className='login__form'>
          <p>Log In</p>

        {successMsg && <div className='success__msg'>{ successMsg }</div>}
        {errorMsg && <div className='error__msg'>{ errorMsg }</div>}
                
        <label>Email</label>
        <input onChange={(e)=> setUserEmail(e.target.value)} type="email" placeholder="Enter your Email" />
        
        <label>Password</label>
        <input onChange={(e)=> setUserPassword(e.target.value)} type="password" placeholder='Enter your password'/>
                
        <button onClick={handleLogin}>Log In</button>

        <div>
            <span>Don't have an account?</span>
            <Link to="/signup">Sign Up</Link>
        </div>
         


    </form>        

</div>
</div>
  )
}

export default Login