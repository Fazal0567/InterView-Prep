import React, { useContext, useState } from 'react';
import { APP_FEATURES } from '../utils/data';
import { LuSparkles, FiArrowRight } from 'react-icons/all';
import hero from '../assets/hero.png';
import Modal from '../components/Modal';
import LogIn from './Auth/LogIn';
import SignUp from './Auth/SignUp';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { motion } from 'framer-motion';

const LandingPage = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [currentPage, setCurrentPage] = useState("login");
  const [hoveredFeature, setHoveredFeature] = useState(null);

  const handleCTA = () => {
    if (!user) {
      setOpenAuthModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-br from-[#F8FAFF] to-blue-50 overflow-x-hidden relative">
        {/* Animated Background Elements */}
        <motion.div 
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-blue-100/30 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-indigo-100/30 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-24 h-24 rounded-full bg-purple-100/30 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />

        <div className="container mx-auto px-4 sm:px-6 pt-6 pb-6 md:pb-12 relative z-10">
          {/* Header */}
          <motion.header 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8 md:mb-16"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              InterviewPrep<span className="text-blue-500">AI</span>
            </div>
            {user ? (
              <ProfileInfoCard />
            ) : (
              <button
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-sm font-medium text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:shadow-blue-100 transition-all duration-300 flex items-center gap-2"
                onClick={() => setOpenAuthModal(true)}
              >
                Get Started <FiArrowRight className="text-white" />
              </button>
            )}
          </motion.header>

          {/* Hero Section */}
          <section className="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 mb-6 md:mb-16">
            {/* Text Block */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 text-sm text-blue-600 font-medium bg-blue-100 px-4 py-1.5 rounded-full border border-blue-200 mb-6"
              >
                <LuSparkles className="text-blue-500" /> AI Powered Interview Prep
              </motion.div>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-gray-900 leading-tight mb-6">
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Master Your Next
                </span>{" "}
                <br />
                Technical Interview
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
                Get personalized interview questions, AI-powered feedback, and comprehensive analytics to land your dream tech job.
              </p>
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium px-8 py-3.5 rounded-full shadow-lg hover:shadow-blue-200 transition-all duration-300"
                  onClick={handleCTA}
                >
                  Start Practicing Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-700 font-medium px-8 py-3.5 rounded-full border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  How It Works
                </motion.button>
              </div>
              
              <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                <div className="text-sm text-gray-500">Trusted by engineers at:</div>
                <div className="flex items-center gap-4">
                  {['Google', 'Amazon', 'Microsoft', 'Meta'].map((company, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -3 }}
                      className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded"
                    >
                      {company}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Image */}
            <motion.div 
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="w-full md:w-1/2 flex justify-center"
            >
              <div className="relative">
                <img
                  src={hero}
                  alt="Interview prep illustration"
                  className="w-full max-w-[90vw] md:max-w-[100%] rounded-2xl shadow-xl border-8 border-white"
                />
                <motion.div 
                  className="absolute -bottom-5 -right-5 bg-white px-6 py-3 rounded-xl shadow-lg border border-gray-100"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="text-sm font-medium text-gray-800">AI Feedback</div>
                  <div className="text-xs text-gray-500">Real-time analysis</div>
                </motion.div>
              </div>
            </motion.div>
          </section>
        </div>

        {/* Features Section */}
        <section className="w-full bg-white py-16 md:py-24">
          <div className="container mx-auto px-4 sm:px-6">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-medium mb-4">
                Powerful Features
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to <span className="text-blue-600">Succeed</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Our platform provides all the tools to help you prepare effectively for technical interviews.
              </p>
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            >
              {APP_FEATURES.slice(0, 3).map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`bg-white p-8 rounded-2xl border transition-all duration-300 ${hoveredFeature === feature.id ? 'border-blue-300 shadow-xl' : 'border-gray-100 shadow-md'}`}
                >
                  <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${hoveredFeature === feature.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
            >
              {APP_FEATURES.slice(3).map((feature) => (
                <motion.div
                  key={feature.id}
                  variants={itemVariants}
                  whileHover={{ y: -10 }}
                  onMouseEnter={() => setHoveredFeature(feature.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  className={`bg-white p-8 rounded-2xl border transition-all duration-300 ${hoveredFeature === feature.id ? 'border-blue-300 shadow-xl' : 'border-gray-100 shadow-md'}`}
                >
                  <div className={`w-12 h-12 rounded-lg mb-6 flex items-center justify-center ${hoveredFeature === feature.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                    <feature.icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 py-16 md:py-20">
          <div className="container mx-auto px-4 sm:px-6 text-center">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Ace Your Next Interview?
              </h2>
              <p className="text-lg text-blue-100 max-w-2xl mx-auto mb-8">
                Join thousands of engineers who landed their dream jobs with our platform.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 font-medium px-10 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={handleCTA}
              >
                Start Your Free Trial
              </motion.button>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-gray-400 py-12">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                  InterviewPrep<span className="text-blue-300">AI</span>
                </div>
                <p className="text-sm">The smart way to prepare for technical interviews</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-12">
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Product</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition">Features</a></li>
                    <li><a href="#" className="hover:text-white transition">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition">Examples</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Resources</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition">Blog</a></li>
                    <li><a href="#" className="hover:text-white transition">Guides</a></li>
                    <li><a href="#" className="hover:text-white transition">Help Center</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white text-sm font-medium mb-3">Company</h4>
                  <ul className="space-y-2 text-sm">
                    <li><a href="#" className="hover:text-white transition">About</a></li>
                    <li><a href="#" className="hover:text-white transition">Careers</a></li>
                    <li><a href="#" className="hover:text-white transition">Contact</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                © {new Date().getFullYear()} InterviewPrepAI. All rights reserved.
              </div>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition">
                  <span className="sr-only">GitHub</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://mohd-fazal-ali.onrender.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition">
                  Developer Portfolio
                </a>
              </div>
            </div>
          </div>
        </footer>
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
        {currentPage === "login" && <LogIn setCurrentPage={setCurrentPage} />}
        {currentPage === "signup" && <SignUp setCurrentPage={setCurrentPage} />}
      </Modal>
    </>
  );
};

export default LandingPage;
