import React, { useState } from 'react'
import './resetPassword.css'
import firebase from '../../config/firebase'
import 'firebase/auth'

import Navbar from '../../Components/navbar/Navbar'



function ResetPassword() {

    const [email, setEmail] = useState();
    const [msg, setMsg] = useState();
    const [loading = 0, setLoading] = useState();

    const reset = () => {
        setLoading(1);

        if(email == null){
            
            setMsg("");
            setTimeout(()=>setMsg('Enter a valid email and try again'),1000);
            setTimeout(()=>setLoading(0),1000);
            
            
     
        }

        else{
        
            firebase.auth().sendPasswordResetEmail(email).then(result => {

                setMsg("");
                setTimeout(()=>setMsg('We sent you a link to reset your Password'),2000);
                setTimeout(()=>setLoading(0),2000);
            }).catch(error => {
                setMsg("");
                console.log(error);
                setTimeout(()=>setMsg('Please Check your email and try again'),2000);
                setTimeout(()=>setLoading(0),2000);
            })
        }
    }





    return (
        <>
            <Navbar />

            <form className="text-center form-login mx-auto mt-5">
                <h1 className="mb-5 font-weight-bold">Reset Password</h1>
                <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-2" placeholder="Email" />



                {
                    (loading) ? <div className="spinner-border text-secondary" role="status"></div>
                        : <button onClick={reset} type="button" className="btn btn-lg btn-block btn-send">Reset</button>

                }

                <div className="msg my-4 text-center">
                    <span>{msg}</span>
                </div>
            </form>


        </>
    )
}


export default ResetPassword;