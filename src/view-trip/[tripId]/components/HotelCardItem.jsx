import { GetPlaceDetails, photoRefURL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

function HotelCardItem({hotel}) {
    const [photoURL,setPhotoURL] = useState();
        useEffect(()=>{
            hotel&&getPlacePhoto();
        },[hotel])
        const getPlacePhoto = async () => {
            const data = {
                textQuery: hotel?.hotelName,
            };
            try {
                const result = await GetPlaceDetails(data); // 👈 pass `data` here
                console.log(result.data.places[0].photos[3]);
                const PhotoURL = photoRefURL.replace('NAME',result.data.places[0].photos[2].name);
                setPhotoURL(PhotoURL);
            } catch (err) {
                console.error("Axios Error:", err.response?.data || err.message);
            }
    };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='blank'>
          <div
            className="group rounded-lg overflow-hidden shadow-md border border-gray-100 bg-gray-50 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <img
              src={photoURL?photoURL:'/placeholder.jpeg'}
              className="w-full h-[200px] object-cover"
            />
            <div className="p-4 space-y-2">
              <h2 className="text-lg font-semibold text-gray-800 flex gap-2">
                🏨 {hotel?.hotelName || "Hotel Name"}
              </h2>
              <h2 className="text-gray-600 flex gap-2">
                📍 {hotel?.hotelAddress || "Address not available"}
              </h2>
              <h2 className="text-gray-700 font-medium flex gap-2">
                💵 {hotel?.price || "N/A"}
              </h2>
              <h2 className="text-yellow-500 flex gap-2">
                ⭐ {hotel?.rating || "No rating"}
              </h2>
              <p className="text-sm text-gray-500 mt-2">
                📝 {hotel?.description || "No description provided."}
              </p>
            </div>
          </div>
    </Link>
  )
}

export default HotelCardItem