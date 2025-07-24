import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'
import Footer from '@/view-trip/[tripId]/components/footer'

function Hero() {
  return (
    <div className="w-screen text-center px-6 py-16 bg-white">
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 mt-16">
            Plan Your Perfect Trip in Seconds
        </h1>
        <h2 className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Get personalized travel itineraries based on your preferences — destination, budget, group type, and more. All in one place, powered by AI.
        </h2>
        <Link to={'/create-trip'}>
            <Button variant='black'>Get Started</Button>
        </Link>
        <Footer/>
    </div>
  )
}

export default Hero