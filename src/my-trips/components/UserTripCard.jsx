import { GetPlaceDetails, photoRefURL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router';

function UserTripCard({trip}) {
    const [photoURL,setPhotoURL] = useState();
    useEffect(()=>{
        trip&&getPlacePhoto();
    },[])
    const getPlacePhoto = async () => {
        const data = {
            textQuery: trip?.userSelection?.location?.label,
        };
        try {
            const result = await GetPlaceDetails(data); // 👈 pass `data` here
            console.log(result.data.places[0].photos[2]);
            const PhotoURL = photoRefURL.replace('NAME',result.data.places[0].photos[2].name);
            setPhotoURL(PhotoURL);
        } catch (err) {
            console.error("Axios Error:", err.response?.data || err.message);
        }
    };
  return (
    <Link to={`/view-trip/${trip?.id}`}>
        <div className="flex flex-col md:flex-row items-center gap-4 p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:scale-105 transition-all bg-white text-black">
            <img
            src={photoURL ? photoURL : "/placeholder.jpeg"}
            alt="Trip"
            className="w-full md:w-48 h-32 object-cover rounded-lg"
            />

            <div className="flex flex-col gap-2 text-center md:text-left">
            <h2 className="text-xl font-semibold">
                📍 {trip?.userSelection?.location?.label}
            </h2>

            <h2 className="text-sm text-gray-700">
                Trip for <span className="font-medium">{trip?.userSelection?.noOfDays}</span> days for{" "}
                <span className="font-medium">{trip?.userSelection?.traveller}</span>{" "}
                {trip?.userSelection?.traveller == 1 ? "Person" : "People"} with{" "}
                <span className="font-medium">{trip?.userSelection?.budget}</span> budget.
            </h2>
            </div>
        </div>
    </Link>
  )
}

export default UserTripCard