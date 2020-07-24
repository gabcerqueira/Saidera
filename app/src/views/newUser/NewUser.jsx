import React, { useState } from 'react';
import './newUser.css'
import firebase from '../../config/firebase'
import 'firebase/auth'
import Navbar from '../../Components/navbar/Navbar'



function NewUser() {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [msgType, setMsgType] = useState();
    const [msg, setMsg] = useState();
    const [loading, setLoading] = useState();






    function register() {
        setMsgType(null);

        setLoading(1);

        if (!email || !password) {
            setLoading(0);

            setMsgType('error');
            setMsg('define a valid email and password !');
            return
        }

        if (password !== confirmPassword) {
            setLoading(0);

            setMsgType('error');
            setMsg('Please make sure your passwords match !');
            return
        }

        if (password.length < 6) {
            setLoading(0);
            setMsgType('error');
            setMsg('Password should be at least 6 caracteres');
            return
        }

        firebase.auth().createUserWithEmailAndPassword(email, password).then(result => {
            setLoading(0);


            setMsgType('success');

        }).catch(erro => {
            setLoading(0);


            setMsgType('error');

            switch (erro.message) {

                case 'The email address is badly formatted.':
                    setMsg('The email address is badly formatted.');
                    break;
                case 'The email address is already in use by another account.':
                    setMsg('The email address is already in use by another account.');
                    break;

                default:
                    setMsg('Couldn’t register you… please try again ! ');



            }

        });


    }


    return (
        <div>
            <Navbar />
            <div className="register-content">
                <form className="text-center form-register mx-auto mt-5" >
                    <h1 className="h3 text-black font-weight-bold">Create Account</h1>


                    <input onChange={(e) => setEmail(e.target.value)} type="email" className="form-control my-3" placeholder="Email" />
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control my-3" placeholder="Password" />
                    <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" className="form-control my-3" placeholder="Confirm password" />

                    {
                        (loading) ? <div className="spinner-border text-secondary" role="status"></div>
                            : <button onClick={register} type="button" className="btn btn-lg btn-block my-3 btn-register ">Create Account</button>

                    }




                    <div className="msg-login text-black text-center my-5">

                        {msgType === 'success' ? <span><strong>Registration Success !  &#128526;</strong></span> : ""}
                        {msgType === 'error' ? <span><strong>{msg}&#128546;</strong></span> : ""}

                    </div>


                </form>
            </div>
        </div>
    )
}

export default NewUser;

