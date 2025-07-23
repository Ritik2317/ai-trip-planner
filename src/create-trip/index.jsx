import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { generateTripPlan } from '../service/ai-model';

function CreateTrip() {
  const [place,setPlace] = useState();
  const [formData,setFormData] = useState([]);
  const [tripResult, setTripResult] = useState(null);
  const handleInputChange = (name,value)=>{
    setFormData({
      ...formData,
      [name]:value,
    })
  }
  useEffect(() => {
    console.log(formData);
  },[formData])

  const OnGenerateTrip = async () => {
  if (!formData.location || !formData.budget || !formData.noOfDays || !formData.traveller) {
    toast("Please enter all details.");
    return;
  }

  const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.location?.label)
    .replace('{noOfDays}', formData?.noOfDays)
    .replace('{traveller}', formData?.traveller)
    .replace('{budget}', formData?.budget);
    console.log(FINAL_PROMPT);
  try {
    toast("Generating your itinerary...");
    const tripData = await generateTripPlan(FINAL_PROMPT);
    setTripResult(tripData);
    toast.success("Trip plan generated successfully!");
    console.log("Trip Plan:", tripData);
  } catch (err) {
    toast.error("❌ Failed to generate trip. Try again.");
    console.error(err);
  }
  };


  return (
  <div className="w-screen min-h-screen px-4 py-10 bg-white">
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Let’s Get Started with Your Trip!</h2>
        <p className="text-gray-600 text-lg">
          Tell us a bit about your journey — destination, travel dates, group type, and budget. We'll take care of the rest!
        </p>
      </div>

      {/* Location Input */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Where to next?</h2>
        <div>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange('location', v);
              },
            }}
          />
        </div>
      </div>

      {/* Number of Days */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          How many days are you planning for your trip?
        </h2>
        <Input
          placeholder="Eg. 4"
          type={Number}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      {/* Budget */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">What is your budget?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
          {SelectBudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-5 border rounded-xl shadow-sm cursor-pointer transition-transform text-center hover:-translate-y-1 
                ${formData.budget === item.title
                  ? 'bg-blue-100 border-blue-500 shadow-md'
                  : 'bg-gray-50 hover:bg-white hover:shadow-md'}`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <h2 className="text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Traveller Type */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Who do you plan on going with on your next trip?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {SelectTravelesList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveller', item.people)}
              className={`p-5 border rounded-xl shadow-sm cursor-pointer transition-transform text-center hover:-translate-y-1 
                ${formData.traveller === item.people
                  ? 'bg-blue-100 border-blue-500 shadow-md'
                  : 'bg-gray-50 hover:bg-white hover:shadow-md'}`}
            >
              <div className="text-3xl mb-2">{item.icon}</div>
              <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
              <h2 className="text-gray-600">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>


      {/* Submit Button */}
      <div className="text-center">
        <Button className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-neutral-900 active:bg-neutral-800 transition-transform transform hover:-translate-y-1"
          onClick = {OnGenerateTrip}>
          Generate Trip
        </Button>
      </div>
    </div>
  </div>
  )
}

export default CreateTrip