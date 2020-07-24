import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './registerEvent.css'
import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'
import 'firebase/auth'

import Navbar from '../../Components/navbar/Navbar'
import Footer from '../../Components/footer/Footer'

function RegisterEvent() {

    const [msgType, setMsgType] = useState();
    const [title, setTitle] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [image, setImage] = useState();
    const [loading = false, setLoading] = useState();

    const userEmail = (useSelector(state => state.userEmail));


    const storage = firebase.storage();
    const db = firebase.firestore();




    function create() {
        setLoading(true);
        setMsgType(null);
        storage.ref(`imagens/${image.name}`).put(image).then(() => {
            db.collection('Events').add({
                title: title,
                type: type,
                description: description,
                date: date,
                time: time,
                user: userEmail,
                views: 0,
                image: image.name,
                public: 1,
                created: new Date()
            }).then(() => {
                setMsgType('success');
                setLoading(false);

            }).catch(error => {
                setMsgType('error');
                setLoading(false);

            })

        })
    }

    return (
        <>
            <Navbar />

            <h3 className="my-3 text-center">New Event</h3>
            <form className="my-2  register-event mx-auto text-left">

                <div className="form-group">
                    <label>Title :</label>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control"></input>
                </div>

                <div className="form-group">
                    <label>Type :</label>
                    <select onChange={(e) => setType(e.target.value)} type="text" className="form-control former">
                        <option disabled selected value>-- Select a type --</option>
                        <option>Party</option>
                        <option>Conference</option>
                        <option>Show</option>
                        <option>Theater</option>
                        <option>Event</option>
                    </select>
                </div>

                <div className="form-group ">
                    <label>Description :</label>
                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" rows="3"></textarea>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <label>Date :</label>
                        <input onChange={(e) => setDate(e.target.value)} type="date" className="form-control"></input>
                    </div>
                    <div className="col-6">
                        <label>Time :</label>
                        <input onChange={(e) => setTime(e.target.value)} type="time" className="form-control"></input>
                    </div>
                </div>

                <div className="form-group">
                    <label>Upload Image :</label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" className="form-control"></input>
                </div>
                <div className="row">
                    {
                        (loading) ? <div className="spinner-border text-secondary mx-auto my-3" role="status"></div>
                            : <button onClick={create} type="button" className="btn btn-lg btn-block my-3 btn-register ">Create Event</button>

                    }
                </div>

            </form>

            <div className="msg-login text-center mt-2">


                {msgType === 'success' ? <span><strong>Event created !  &#128526;</strong></span> : ""}
                {msgType === 'error' ? <span><strong>Creation failed ! &#128546;</strong></span> : ""}

            </div>

        </>
    )
}

export default RegisterEvent;