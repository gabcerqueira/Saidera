import React, { useState, useEffect } from 'react'
import './eventDetail.css'
import { Link,Redirect } from 'react-router-dom'
import Navbar from '../../Components/navbar/Navbar'
import { useSelector } from 'react-redux'


import firebase from '../../config/firebase'
import Footer from '../../Components/footer/Footer'


function EventDetail(props) {

    const [event,setEvent] = useState({});
    const [urlImage,setUrlImage] = useState({});
    const [loading,setLoading] = useState(true);
    const [removed,setRemoved] = useState(false);


    const userLogged = useSelector(state => state.userEmail);

    function remove(){

        firebase.firestore().collection('Events').doc(props.match.params.id).delete().then(()=>{
            setRemoved(true);
        })

    }


    useEffect(() => {
        if(loading){
        firebase.firestore().collection('Events').doc(props.match.params.id).get().then(result =>{
            setEvent(result.data())
            firebase.firestore().collection('Events').doc(props.match.params.id).update('views',result.data().views +1);
            firebase.storage().ref(`imagens/${result.data().image}`).getDownloadURL().then(url=>{
                setUrlImage(url);
                setLoading(false);
            });
        });
        }
        else{
            firebase.storage().ref(`imagens/${event.image}`).getDownloadURL().then(url=>setUrlImage(url));
            
        }
        
    },[])

    return (

        <>  
            <Navbar />

            {(removed) ? <Redirect to='/' /> : null}

            <div className="container mx-auto">
            {
                (loading) ? <div className="row mt-5"><div className="spinner-border text-dark mx-auto " role="status"></div></div>
                    :

                <div>
                <div className="row mt-5">
                    <img src={urlImage} alt="banner" className="img-banner" />

                    <div className="col-12 text-right mt-2 event-views">
                        <i className="fas fa-eye mr-1"></i><span>{event.views + 1}</span>
                    </div>
                    <h3 className="mx-auto mt-5 btn-title"><strong>{event.title}</strong></h3>
                </div>

                <div className="row mt-5 d-flex justify-content-between ">
                    <div className="box-info col-md-3 col-sm-12  p-3 my-2 mx-2 ">
                        <i className="fas fa-ticket-alt fa-2x"></i>
                        <h5 className="my-2"><strong>Type</strong></h5>
                        <span className="mt-3 ">{event.type}</span>
                    </div>

                    
                        <div className="box-info col-md-3 col-sm-12  p-3 my-2 mx-2">
                            <i className="fas fa-calendar-alt fa-2x"></i>
                            <h5 className="my-2"><strong>Date</strong></h5>
                            <span className="mt-3 ">{event.date}</span>
                        </div>

                    
                        <div className="box-info col-md-3 col-sm-12 box-info p-3 my-2 mx-2 ">
                                <i className="fas fa-clock fa-2x "></i>
                                <h5 className="my-2"><strong>Hour</strong></h5>
                                <span className="mt-3 ">{event.time}</span>
                        </div>
                    
                </div>

                <div className="box-detail row mt-5">
                    <div className="col-12 text-center">
                        <h5 ><strong>Event Detail</strong></h5>
                    </div>
                    <div className="col-12 text center">
                        <p >{event.description}</p>
                    </div>
                    
                    

                </div>
                    {
                        (userLogged === event.user) ?
                         <Link to={`/editEvent/${props.match.params.id}`} className="btn-edit"><i className="fas fa-pen-square fa-3x"></i></Link>
                        : ''
                    }

                    {
                    (userLogged === event.user) ?   
                    <button onClick={remove} type="button" className="btn btn-lg btn-block my-3 mx-auto btn-remove ">Remove Event</button>
                    : null
                    }
                </div>

                
                
            }
            </div>
            <Footer/>
        </>
        
    )
}


export default EventDetail;
