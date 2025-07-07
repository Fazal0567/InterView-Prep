import React, { useContext, useState } from 'react'
import { APP_FEATURES } from '../utils/data'
import {LuSparkles } from 'react-icons/lu'
import hero from '../assets/hero.png'
import Modal from '../components/Modal'
import LogIn from './Auth/LogIn'
import SignUp from './Auth/SignUp'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../contexts/UserContext'
import ProfileInfoCard from '../components/Cards/ProfileInfoCard'

const LandingPage = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  
  const handleCTA = () => {
    if(!user){
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  }

  return (
    <>
      <div className='w-full min-h-screen bg-[#FFFCEF] overflow-x-hidden'>
        {/* Background blob */}
        <div className="w-full h-full max-w-[500px] max-h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0"></div>
        
        <div className="container mx-auto px-4 sm:px-6 pt-6 pb-[100px] md:pb-[200px] relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between mb-8 md:mb-16">
            <div className="text-lg sm:text-xl text-black font-bold">
              Interview-Prep
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button 
                className="bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-xs sm:text-sm font-semibold text-white px-4 sm:px-7 py-2 sm:py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors cursor-pointer" 
                onClick={() => setOpenAuthModal(true)}
              >
                Login/Signup
              </button>
            )}
          </header>

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 md:pr-4 mb-8 md:mb-0">
              <div className="flex items-center justify-center md:justify-left mb-2">
                <div className="flex items-center gap-2 text-xs sm:text-[13px] text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles size={14} /> Ai Powered
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl text-black font-medium mb-4 md:mb-6 leading-tight text-center md:text-left">
                Ace Interview with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine font-semibold">
                  Ai powered
                </span>{" "}
                Learning
              </h1>
            </div>
            
            <div className="w-full md:w-1/2">
              <p className="text-sm sm:text-[15px] md:text-[17px] text-gray-900 mb-4 md:mb-6 text-center md:text-left">
                Get interview questions and model answers based on your role, experience, and specific focus areas — no filler, just what matters. 
              </p>
              <div className="flex justify-center md:justify-start">
                <button 
                  className="bg-black text-xs sm:text-sm font-semibold text-white px-5 sm:px-7 py-2 sm:py-2.5 rounded-full hover:bg-yellow-100 hover:text-black border border-yellow-50 hover:border-yellow-300 transition-colors cursor-pointer" 
                  onClick={handleCTA}
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="w-full min-h-full relative z-10 bg-[#FFFCEF]">
        {/* Hero Image */}
        <div className="container mx-auto px-4">
          <section className='flex items-center justify-center -mt-20 sm:-mt-28 md:-mt-36'>
            <img 
              src={hero} 
              alt="Interview preparation illustration" 
              className='w-full max-w-[90vw] md:w-[80vw] rounded-lg' 
            />
          </section>
        </div>

        {/* Features Section */}
        <div className="w-full min-h-full bg-[#FFFCEF] mt-10 md:mt-20">
          <div className="container mx-auto px-4 pt-6 pb-12 md:pb-20">
            <section className='mt-5 md:mt-10'>
              <h2 className="text-xl sm:text-2xl font-medium text-center mb-8 md:mb-12">
                Features of Interview Prep AI
              </h2>
              
              <div className="flex flex-col items-center gap-6 md:gap-8">
                {/* First row - 3 features on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full">
                  {APP_FEATURES.slice(0,3).map((feature) => (
                    <div 
                      className="bg-[#FFFEF8] p-4 sm:p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100" 
                      key={feature.id}
                    >
                      <h3 className='text-sm sm:text-base font-semibold mb-2 sm:mb-3'>
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>

                {/* Second row - 2 features on desktop, 1 on mobile */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full">
                  {APP_FEATURES.slice(3).map((feature) => (
                    <div 
                      className="bg-[#FFFEF8] p-4 sm:p-6 rounded-xl shadow-xs hover:shadow-lg shadow-amber-100 transition border border-amber-100" 
                      key={feature.id}
                    >
                      <h3 className='text-sm sm:text-base font-semibold mb-2 sm:mb-3'>
                        {feature.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs sm:text-sm bg-gray-50 text-secondary text-center p-4 sm:p-5 mt-5">
          <a
            href="https://mohd-fazal-ali.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-600 underline hover:text-amber-800 transition"
          >
            Mohd Fazal Ali 
          </a>
          &nbsp;© All Rights Reserved
        </div>
      </div>

      {/* Auth Modal */}
      <Modal 
        isOpen={openAuthModal} 
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }} 
        hideHeader
      >
        <div>
          {currentPage === "login" && <LogIn setCurrentPage={setCurrentPage} />}
          {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
        </div>
      </Modal>
    </>
  )
}

export default LandingPage
