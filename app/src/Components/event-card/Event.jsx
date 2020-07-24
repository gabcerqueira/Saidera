import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import firebase from '../../config/firebase'
import './event.css'



function Event({id,image,title,description,views}) {


    const[urlImage,setUrlImage] = useState();

    useEffect(()=>{
        firebase.storage().ref(`imagens/${image}`).getDownloadURL().then(url=>{setUrlImage(url)}).catch();
 
    },[urlImage]);

    return (
        <div className="col-md-3 col-sm-12">
            <img src={urlImage} className="card-img-top img-card" alt="Imagem do Evento" />


            <div className="row card-body">
                <h5>{title}</h5>
                    <p className="card-text text-justify">
                        {description}
                    </p>

                <div className="footer-card d-flex align-itens-center">
                    <div className="col-6">
                        <Link to={'/eventDetail/' + id} className="btn btn-sm btn-detail">Detail</Link>
                    </div>

                    <div className="col-6 text-right">
                        <i className="fas fa-eye"></i><span>{views}</span>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default Event;