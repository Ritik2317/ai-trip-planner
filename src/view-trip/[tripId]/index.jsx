import { db } from '@/service/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import Info from './components/infoSec.jsx';
import Hotels from './components/hotels.jsx';
import Itinerary from './components/itinerary.jsx';
import Footer from './components/footer.jsx';


function Viewtrip() {
    const {tripId} = useParams();
    const [trip,setTrip] = useState([]);
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId]);
    const GetTripData=async()=>{
        const docRef = doc(db,"AITrips",tripId);
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Document:", docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
            toast("No trip found");
        }
    }
  return (
    <div className='w-screen p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* Information Section */}
        <div className="my-10">
            <Info trip={trip} />
        </div>

        {/* Hotels Section */}
        <div className="my-10">
            <Hotels trip={trip} />
        </div>

        {/* Itinerary Section */}
        <div className="my-10">
            <Itinerary trip={trip} />
        </div>

        {/* Footer */}
        <div className="my-10">
            <Footer />
        </div>
    </div>

  )
}

export default Viewtrip