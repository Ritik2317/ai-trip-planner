import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/service/firebaseConfig';
import UserTripCard from './components/UserTripCard';
function Mytrips() {
  useEffect(()=>{
    GetUserTrips();
  },[])
  const navigation = useNavigate();
  const[userTrips,setUserTrips] = useState([]);
  const GetUserTrips=async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user){
      navigation('/');
    }
    const q = query(collection(db, "AITrips"), where("userEmail", "==", user?.email));
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal=>[...prevVal,doc.data()]);
    });
  }
  return (
    <div className="w-screen min-h-screen px-4 md:px-10 py-10 bg-white text-black">
      <h2 className="text-3xl font-bold mb-8 text-center md:text-left">🧳 My Trips</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userTrips?.length > 0 ? (
          userTrips.map((trip, index) => (
            <UserTripCard trip={trip} key={index} />
          ))
        ) : (
          // Loading Skeletons
          [1, 2, 3, 4, 5, 6].map((item, index) => (
            <div
              key={index}
              className="h-[250px] w-full bg-gray-200 animate-pulse rounded-xl"
            ></div>
          ))
        )}
      </div>
    </div>
  )
}

export default Mytrips