import { GetPlaceDetails, photoRefURL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'

function PlaceCardItem({ place }) {
  const [photoURL,setPhotoURL] = useState();
          useEffect(()=>{
              place&&getPlacePhoto();
          },[place])
          const getPlacePhoto = async () => {
              const data = {
                  textQuery: place?.placeName,
              };
              try {
                  const result = await GetPlaceDetails(data); // 👈 pass `data` here
                  console.log(result.data.places[0].photos[1]);
                  const PhotoURL = photoRefURL.replace('NAME',result.data.places[0].photos[2].name);
                  setPhotoURL(PhotoURL);
              } catch (err) {
                  console.error("Axios Error:", err.response?.data || err.message);
              }
    };
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+place.placeName} target='blank'>
    <div className="bg-white border border-gray-200 rounded-xl shadow-md p-4 transition-transform duration-300 flex flex-col gap-3 cursor-pointer transform hover:scale-105 hover:shadow-xl">
      <img
        src={photoURL?photoURL:'/placeholder.jpeg'}
        alt={place?.placeName}
        className="w-full h-[180px] object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold text-gray-800">📍 {place?.placeName}</h2>
      <p className="text-sm text-gray-600">📝 {place?.placeDetails}</p>
      <p className="text-sm text-blue-600 font-medium">⏱️ {place?.timeToTravel}</p>
    </div>
    </Link>
  )
}

export default PlaceCardItem