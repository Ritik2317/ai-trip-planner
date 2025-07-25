import { GetPlaceDetails, photoRefURL } from '@/service/GlobalApi'
import React, { useEffect, useState } from 'react'

function Info({trip}) {
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
    <div className="w-full bg-white text-black p-4 rounded-xl shadow-md border border-gray-200">
        <img
            src={photoURL?photoURL:'/placeholder.jpeg'}
            alt="Trip"
            className="w-full h-[300px] object-contain rounded-lg mb-4"
        />

        <div className="space-y-4">
            {/* Location Name */}
            <h2 className="text-2xl font-bold flex items-center gap-2">
            📍 {trip?.userSelection?.location?.label}
            </h2>

            {/* Trip Info: Days, Budget, People */}
            <div className="flex flex-wrap gap-4 text-lg text-gray-700">
            <h2 className="px-4 py-2 bg-gray-100 rounded-md shadow-sm flex items-center gap-2">
                🗓️ {trip?.userSelection?.noOfDays} Days
            </h2>

            <h2 className="px-4 py-2 bg-gray-100 rounded-md shadow-sm flex items-center gap-2">
                💰 {trip?.userSelection?.budget} Budget
            </h2>

            <h2 className="px-4 py-2 bg-gray-100 rounded-md shadow-sm flex items-center gap-2">
                👥 {trip?.userSelection?.traveller}{" "}
                {trip?.userSelection?.traveller == 1 ? "Person" : "People"}
            </h2>
            </div>
        </div>
    </div>
  )
}

export default Info