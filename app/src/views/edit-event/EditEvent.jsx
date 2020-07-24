import React, { useState,useEffect } from 'react'
import { useSelector, } from 'react-redux'
import './editEvent.css'
import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'
import 'firebase/auth'

import Navbar from '../../Components/navbar/Navbar'



function EditEvent(props) {

    const [msgType, setMsgType] = useState();
    const [title, setTitle] = useState();
    const [type, setType] = useState();
    const [description, setDescription] = useState();
    const [date, setDate] = useState();
    const [time, setTime] = useState();
    const [image, setImage] = useState();
    const [newImage,setNewImage] = useState();
    const [loading, setLoading] = useState(false);

    const userEmail = (useSelector(state => state.userEmail));


    const storage = firebase.storage();
    const db = firebase.firestore();


    useEffect(() => {
        
        firebase.firestore().collection('Events').doc(props.match.params.id).get().then(result =>{
            setTitle(result.data().title);
            setType(result.data().type);
            setDescription(result.data().description);
            setDate(result.data().date);
            setTime(result.data().time);
            setImage(result.data().image);
        });
    },[loading])



    function update() {
        setLoading(true);
        setMsgType(null);     

        if(newImage){
        storage.ref(`imagens/${image.name}`).put(image);
        }

            db.collection('Events').doc(props.match.params.id).update({
                title: title,
                type: type,
                description: description,
                date: date,
                time: time,
                image: newImage ? newImage.name : image
            }).then(() => {
                setMsgType('success');
                setLoading(false);

            }).catch(error => {
                setMsgType('error');
                setLoading(false);

            });
            setLoading(false);
    }

    return (
        <>
            <Navbar />

            <h3 className="my-3 text-center">Edit Event</h3>
            <form className="my-2  register-event mx-auto text-left">

                <div className="form-group">
                    <label>Title :</label>
                    <input onChange={(e) => setTitle(e.target.value)} type="text" className="form-control" value={title}></input>
                </div>

                <div className="form-group">
                    <label>Type :</label>
                    <select onChange={(e) => setType(e.target.value)} type="text" value ={type} className="form-control former">
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
                    <textarea onChange={(e) => setDescription(e.target.value)} className="form-control" rows="3" value={description}></textarea>
                </div>

                <div className="form-group row">
                    <div className="col-6">
                        <label>Date :</label>
                        <input onChange={(e) => setDate(e.target.value)} type="date" value ={date} className="form-control"></input>
                    </div>
                    <div className="col-6">
                        <label>Time :</label>
                        <input onChange={(e) => setTime(e.target.value)} type="time" value ={time} className="form-control"></input>
                    </div>
                </div>

                <div className="form-group">
                    <label>Upload Image :</label>
                    <input onChange={(e) => setNewImage(e.target.files[0])} type="file" className="form-control"></input>
                </div>
                <div className="row">
                    {
                        (loading) ? <div className="spinner-border text-secondary mx-auto my-3" role="status"></div>
                            : <button onClick={update} type="button" className="btn btn-lg btn-block my-3 btn-register ">Edit</button>

                    }
                </div>

            </form>

            <div className="msg-login text-center mt-2">


                {msgType === 'success' ? <span><strong>Event edited !  &#128526;</strong></span> : ""}
                {msgType === 'error' ? <span><strong>Edition failed ! &#128546;</strong></span> : ""}

            </div>

            

        </>
    )
}

export default EditEvent;