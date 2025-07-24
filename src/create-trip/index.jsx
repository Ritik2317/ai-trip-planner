import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '../components/ui/input';
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from '../constants/options';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';
import { generateTripPlan } from '../service/ai-model';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaGoogle } from "react-icons/fa";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore"; 
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading } from "react-icons/ai";
import { useNavigate } from 'react-router';
import Footer from '@/view-trip/[tripId]/components/footer';

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFormData] = useState([]);
  const [tripResult, setTripResult] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (!formData.location || !formData.budget || !formData.noOfDays || !formData.traveller) {
      toast("Please enter all details.");
      return;
    }
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{noOfDays}', formData?.noOfDays)
      .replace('{traveller}', formData?.traveller)
      .replace('{budget}', formData?.budget);
    try {
      toast("Generating your itinerary...");
      const tripData = await generateTripPlan(FINAL_PROMPT);
      setTripResult(tripData);
      setLoading(false);
      toast.success("Trip plan generated successfully!");
      SaveAITrip(tripData);
      console.log("Trip Plan:", tripData);
    } catch (err) {
      setLoading(false);
      toast.error("❌ Failed to generate trip. Try again.");
      console.error(err);
    }
  };

  const SaveAITrip = async (tripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem('user'));
    const docID = Date.now().toString();
    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: tripData,
      userEmail: user?.email,
      id: docID
    });
    setLoading(false);
    navigator('/view-trip/'+docID);
  }

  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log(resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data));
      OnGenerateTrip();
      setOpenDialog(false);
    }).catch((err) => {
      console.error("Failed to fetch user profile:", err);
    });
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

        {/* Number of Days */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">How many days are you planning for your trip?</h2>
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
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Who do you plan on going with on your next trip?</h2>
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
          <Button
            className="bg-black text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-neutral-900 active:bg-neutral-800 transition-transform transform hover:-translate-y-1 hover:cursor-pointer"
            disabled={loading}
            onClick={OnGenerateTrip}
          >
            {loading ? (
              <AiOutlineLoading className='h-7 w-7 animate-spin' />
            ) : (
              <>Generate Trip</>
            )}
          </Button>
        </div>

        {/* Dialog */}
        <Dialog open={openDialog}>
          <DialogContent className="max-w-sm rounded-2xl p-6 shadow-lg bg-white dark:bg-zinc-900 text-center space-y-4">
            <DialogHeader>
              <DialogDescription>
                <img
                  src="/logo.png"
                  alt="Logo"
                  className="mx-auto h-14 w-14 rounded-full shadow-sm"
                />
                <h2 className="text-xl font-semibold mt-4 text-zinc-800 dark:text-zinc-100">
                  Sign in with Google
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Sign in to the app using Google authentication to continue.
                </p>
                <Button
                  onClick={login}
                  className="mt-6 w-full bg-black hover:bg-zinc-800 text-white font-medium py-2 px-4 rounded-xl transition hover:cursor-pointer"
                >
                  Sign in with Google <FaGoogle />
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default CreateTrip;