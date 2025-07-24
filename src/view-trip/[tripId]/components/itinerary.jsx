import React from 'react'
import PlaceCardItem from './placeCardItem'

function Itinerary({ trip }) {
  return (
    <div className="w-full bg-white text-black p-6 rounded-xl shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">🗓️ Itinerary</h2>

      <div className="space-y-10">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index}>
            <h2 className="text-xl font-semibold text-blue-700 mb-4">📅 Day {item?.day}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {item?.places?.map((place, placeIndex) => (
                <PlaceCardItem key={placeIndex} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Itinerary
