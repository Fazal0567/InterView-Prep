import React, { useContext, useState } from 'react';
import { APP_FEATURES } from '../utils/data';
import { LuSparkles } from 'react-icons/lu';
import hero from '../assets/hero.png';
import Modal from '../components/Modal';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-[#F8FAFF] overflow-x-hidden relative">
        {/* Background Effect */}
        <div className="w-full h-full max-w-[500px] max-h-[500px] bg-blue-200/20 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 sm:px-6 pt-6 pb-6 md:pb-12 relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between mb-8 md:mb-12">
            <div className="text-lg sm:text-xl font-bold text-black">Interview-Prep</div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-[#3B82F6] to-[#1D4ED8] text-xs sm:text-sm font-semibold text-white px-4 sm:px-7 py-2 sm:py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors"
                onClick={() => setOpenAuthModal(true)}
              >
                Login / Signup
              </button>
            )}
          </header>

          {/* Hero Section */}
          <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mb-6 md:mb-12">
            {/* Text Block */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-600 font-semibold bg-blue-100 px-3 py-1 rounded-full border border-blue-300">
                  <LuSparkles size={16} /> AI Powered
                </div>
              </div>
              <h1 className="text-[clamp(1.9rem,5vw,3.2rem)] font-bold text-black leading-tight mb-4">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#3B82F6_0%,_#1E40AF_100%)] bg-[length:200%_200%] animate-text-shine">
                  AI Powered
                </span>{" "}
                Learning
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-800 mb-6">
                Get interview questions and model answers tailored to your role, experience, and target company — smart, sharp, and focused.
              </p>
              <div className="flex justify-center md:justify-start">
                <button
                  className="bg-black text-white text-sm sm:text-base font-semibold px-6 py-2.5 rounded-full transition hover:bg-blue-100 hover:text-black hover:border-blue-300 border border-transparent"
                  onClick={handleCTA}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="w-full md:w-1/2 flex justify-center">
              <img
                src={hero}
                alt="Interview prep illustration"
                className="w-full max-w-[90vw] md:max-w-[100%] rounded-xl shadow-lg"
              />
            </div>
          </section>
        </div>
      </div>

      {/* Features Section */}
      <section className="w-full bg-[#F8FAFF] pt-6 md:pt-12 pb-10 md:pb-18">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-10">
            Features of Interview Prep AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-xl border border-blue-100 shadow hover:shadow-lg transition"
              >
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-white p-6 rounded-xl border border-blue-100 shadow hover:shadow-lg transition"
              >
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 text-center text-xs sm:text-sm text-secondary py-4">
        <a
          href="https://mohd-fazal-ali.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline hover:text-blue-800 transition"
        >
          Mohd Fazal Ali
        </a>{" "}
        © All Rights Reserved
      </footer>

      {/* Auth Modal */}
      <Modal
        isOpen={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setCurrentPage("login");
        }}
        hideHeader
      >
        {currentPage === "login" && <LogIn setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  );
};

export default LandingPage;
