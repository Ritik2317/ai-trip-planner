import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router'

function Header() {
  return ( 
    <div className="w-screen shadow-sm flex justify-between items-center px-6 py-4 bg-white">
        <div className="h-20">
            <img 
            src="/logo.png" 
            alt="Trip Planner Logo" 
            className="h-full w-auto object-contain" 
            />
        </div>
        <div>
            <Button variant='black'>Sign In</Button>
        </div>
    </div>

  )
}

export default Header