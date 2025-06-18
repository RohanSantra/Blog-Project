import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux'
import { Outlet, ScrollRestoration } from "react-router-dom";
import authService from './Appwrite/auth'
import { fetchCurrentUser, login, logout } from "./Store/authSlice";
import { Footer, Header } from "./components/index";

function App() {
  const dispatch = useDispatch();

  // dispatching useData to login if available otherwise logout
  // Showing loader untill the process finishes
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        userData ? dispatch(login({ userData })) : dispatch(logout());
        dispatch(fetchCurrentUser());
      })
  }, [dispatch]);


  return (
    <div className=" min-h-screen flex flex-wrap content-between bg-gray-950 text-gray-50 selection:bg-gray-50 selection:text-gray-950">
      <div className="w-full block ">
        <Header />
        <main>
          <Outlet />
          <ScrollRestoration />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
