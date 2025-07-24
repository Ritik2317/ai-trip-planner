import React from 'react'
import { Link } from 'react-router';

function Hotels({ trip }) {
  return (
    <div className="w-full bg-white text-black p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        🏨 Hotel Recommendations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+","+hotel?.hotelAddress} target='blank'>
          <div
            key={index}
            className="group rounded-lg overflow-hidden shadow-md border border-gray-100 bg-gray-50 transition-transform duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
          >
            <img
              src="/placeholder.jpeg"
              alt={`Hotel ${index + 1}`}
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
                💵 ₹{hotel?.price || "N/A"}
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
        ))}
      </div>
    </div>
  );
}

export default Hotels;
