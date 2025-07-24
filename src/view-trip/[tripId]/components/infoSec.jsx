import React from 'react'

function Info({trip}) {
  return (
    <div className="w-full bg-white text-black p-4 rounded-xl shadow-md border border-gray-200">
        <img
            src="/placeholder.jpeg"
            alt="Trip"
            className="w-full h-[300px] object-cover rounded-lg mb-4"
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