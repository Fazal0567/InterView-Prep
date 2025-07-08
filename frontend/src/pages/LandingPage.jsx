import React, { useContext, useState, useEffect } from 'react';
import { APP_FEATURES } from '../utils/data';
import { LuSparkles } from 'react-icons/lu';
import hero from '../assets/hero.png';
import Modal from '../components/Modal';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';

// ✅ Dark Mode Toggle (built-in)
const DarkModeToggle = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const root = document.documentElement;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      root.classList.add('dark');
      setIsDark(true);
    } else {
      root.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;

    if (root.classList.contains('dark')) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-xs sm:text-sm px-3 py-1 rounded-full border border-gray-300 bg-gray-100 dark:bg-gray-700 text-black dark:text-white transition hover:scale-105"
    >
      {isDark ? '🌙 Dark' : '☀️ Light'}
    </button>
  );
};

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
      <div className="w-full min-h-screen bg-[#FFFCEF] dark:bg-[#1a1a1a] text-black dark:text-white overflow-x-hidden relative transition-colors duration-300">
        {/* Background blob */}
        <div className="w-full h-full max-w-[500px] max-h-[500px] bg-amber-200/20 blur-[65px] absolute top-0 left-0" />

        <div className="container mx-auto px-4 sm:px-6 pt-6 pb-12 md:pb-16 relative z-10">
          {/* Header */}
          <header className="flex items-center justify-between mb-8 md:mb-12">
            <div className="text-lg sm:text-xl font-bold">Interview-Prep</div>
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              {user ? (
                <ProfileInfoCard />
              ) : (
                <button
                  className="bg-gradient-to-r from-[#FF9324] to-[#e99a4b] text-xs sm:text-sm font-semibold text-white px-4 sm:px-7 py-2 sm:py-2.5 rounded-full hover:bg-black hover:text-white border border-white transition-colors"
                  onClick={() => setOpenAuthModal(true)}
                >
                  Login / Signup
                </button>
              )}
            </div>
          </header>

          {/* Hero Section */}
          <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 mb-12">
            {/* Text Block */}
            <div className="w-full md:w-1/2 text-center md:text-left">
              <div className="flex justify-center md:justify-start mb-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-amber-600 font-semibold bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                  <LuSparkles size={16} /> AI Powered
                </div>
              </div>
              <h1 className="text-[clamp(1.9rem,5vw,3.2rem)] font-bold leading-tight mb-4">
                Ace Interviews with <br />
                <span className="text-transparent bg-clip-text bg-[radial-gradient(circle,_#FF9324_0%,_#FCD760_100%)] bg-[length:200%_200%] animate-text-shine">
                  AI Powered
                </span>{" "}
                Learning
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-gray-800 dark:text-gray-300 mb-6">
                Get interview questions and model answers tailored to your role, experience, and target company — smart, sharp, and focused.
              </p>
              <div className="flex justify-center md:justify-start">
                <button
                  className="bg-black dark:bg-white text-white dark:text-black text-sm sm:text-base font-semibold px-6 py-2.5 rounded-full transition hover:bg-yellow-100 hover:text-black border border-transparent"
                  onClick={handleCTA}
                >
                  Get Started
                </button>
              </div>
            </div>

            {/* Hero Image */}
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
      <section className="w-full bg-[#FFFCEF] dark:bg-[#121212] py-12 md:py-20 transition-colors duration-300">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-center text-xl sm:text-2xl md:text-3xl font-semibold mb-10">
            Features of Interview Prep AI
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {APP_FEATURES.slice(0, 3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#FFFEF8] dark:bg-[#1e1e1e] p-6 rounded-xl border border-amber-100 shadow hover:shadow-lg transition"
              >
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {APP_FEATURES.slice(3).map((feature) => (
              <div
                key={feature.id}
                className="bg-[#FFFEF8] dark:bg-[#1e1e1e] p-6 rounded-xl border border-amber-100 shadow hover:shadow-lg transition"
              >
                <h3 className="text-base font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-[#111] text-center text-xs sm:text-sm text-secondary text-black dark:text-gray-300 py-4">
        <a
          href="https://mohd-fazal-ali.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-amber-600 underline hover:text-amber-800 transition"
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
