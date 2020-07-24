import React, { useState } from 'react'
import './login.css'
import firebase from '../../config/firebase'
import 'firebase/auth'
import { Link,Redirect } from 'react-router-dom'

import {useSelector,useDispatch} from 'react-redux'

function Login() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msgType, setMsgType] = useState();


    const dispatch = useDispatch();




    function logon() {


        if (!email || !password) {
            setMsgType('error');

        }

        firebase.auth().signInWithEmailAndPassword(email, password).then(result => {
            setMsgType('success');

            setTimeout(()=> {
                dispatch({type: 'LOG_IN',userEmail: email});
            },2000);
            
        }).catch(error => {

            setMsgType('error');

        });

        
    }






    return (




        <div className="login-content d-flex align-itens-center">

        
      {useSelector(state => state.userLogged) != 0 ? <Redirect to='/' /> : null}


            
            <form className="form-signin mx-auto">
                <div className="text-center mb-2">
                    <i className="fab fa-ethereum text-white fa-5x mb-3"></i>
                    <h1 className="h3 mb-3 login-label font-weight-bold">Login</h1>
                </div>

                <input onChange={(e) => setEmail(e.target.value)} type="email" id="inputEmail" className="form-control my-2" placeholder="Email" />
                <input onChange={(e) => setPassword(e.target.value)} type="password" id="inputPassword" className="form-control my-2" placeholder="Password" />



                <button onClick={logon} className=" btn-login btn btn-lg btn-block " type="button">Sign in</button>


                <div className="msg-login text-white text-center my-5">


                    {msgType === 'success' ? <span><strong>Connected !  &#128526;</strong></span> : ""}
                    {msgType === 'error' ? <span><strong>Connection failed ! &#128546;</strong></span> : ""}
                    

                </div>
                <div className="opcoes-login mt-5">
                    <Link to="resetPassword" className="mx-2 mt-3 mb-3  text-center footer-date">&copy; Reset password</Link>
                    <Link to='NewUser' className="mx-2 mt-3 mb-3  text-center footer-date">&copy; Sign up</Link>
                </div>
            </form>
        </div>

    )
}

export default Login;