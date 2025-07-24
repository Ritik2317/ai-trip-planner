import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FaGoogle } from 'react-icons/fa';
import axios from 'axios';

function Header() {
  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserProfile(codeResp),
    onError: (error) => console.log(error)
  });
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(()=>{
    console.log(user);
  },[])
  const getUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((resp) => {
      console.log(resp.data);
      localStorage.setItem('user', JSON.stringify(resp.data));
      setOpenDialog(false);
      window.location.reload();
    }).catch((err) => {
      console.error("Failed to fetch user profile:", err);
    });
  };
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
            {user? 
              <div className="flex items-center gap-4">
                <a href='/my-trips'>
                <Button className='cursor-pointer'>My Trips</Button>
                </a>
                <Popover>
                  <PopoverTrigger>
                    <img
                      src={user?.picture}
                      alt="User"
                      className="w-10 h-10 rounded-full object-cover border"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        console.error("Failed to load image:", e.target.src);
                        e.target.src = "/placeholder-profile.png";
                      }}
                    />
                </PopoverTrigger>
                  <PopoverContent>
                    <h2 className='cursor-pointer'onClick={()=>{
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}>Logout</h2>
                  </PopoverContent>
                </Popover>
              </div>:
              <Button variant='black' onClick={()=>setOpenDialog(true)}>Sign In</Button>}
        </div>
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

  )
}

export default Header

