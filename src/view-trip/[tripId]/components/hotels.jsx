import React from 'react'
import { Link } from 'react-router';
import HotelCardItem from './HotelCardItem';

function Hotels({ trip }) {
  return (
    <div className="w-full bg-white text-black p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🏨 Hotel Recommendations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
            <HotelCardItem hotel={hotel}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
