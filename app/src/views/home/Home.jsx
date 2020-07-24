import React, { useState, useEffect } from 'react'
import './home.css'
import { Link } from 'react-router-dom'
import Navbar from '../../Components/navbar/Navbar'
import { useSelector } from 'react-redux'
import Footer from '../../Components/footer/Footer'
import EventCard from '../../Components/event-card/Event'
import firebase from '../../config/firebase'

function Home({ match }) {

    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    let eventList = [];

    const userEmail = useSelector(state=> state.userEmail);

    useEffect(() => {

        if (match.params.parameter) {
            firebase.firestore().collection('Events').where('user','==',userEmail).get().then(async (result) => {
                await result.docs.forEach(doc => {
                    if (doc.data().title.indexOf(search) >= 0) {

                        eventList.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setEvents(eventList);
            });

        }

        else {
            firebase.firestore().collection('Events').get().then(async (result) => {
                await result.docs.forEach(doc => {
                    if (doc.data().title.indexOf(search) >= 0) {

                        eventList.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    }
                })
                setEvents(eventList);
            });

        }
    },[search]);
    return (
        <>
            <Navbar />


            <div className="row p-5 ">
                <h3 className="mx-auto pb-2">Published Events</h3>
                <input onChange={(e) => setSearch(e.target.value)} type="text" className="form-control text-center" placeholder="Search the event by name..."></input>
            </div>
            
            <div className="row p-5">
                {events.map(item => <EventCard id={item.id} image={item.image} title={item.title} description={item.description} views={item.views} />)}

            </div>

            <Footer />
        </>


    )
}

export default Home;