import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom'

import ContactPopup from './components/ContactPopup'
import EnquiryForm from './components/EnquiryForm'
import OperatorForm from './components/OperatorForm'

// Navbar component extracted for cleaner code
const Navbar = ({ onContactClick, onEnquiryClick }) => {
  const navigate = useNavigate();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <nav className="relative z-10 flex flex-col md:flex-row justify-between items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="flex w-full md:w-auto items-center justify-between">
        <img src="/logo2-removebg-preview.png" alt="ANT" className="h-10 md:h-12 w-auto hover:scale-105 transition-transform duration-300" />
        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={showMobileMenu ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>
      </div>
      
      <div className={`${showMobileMenu ? 'flex' : 'hidden'} md:flex flex-col md:flex-row items-center gap-3 w-full md:w-auto mt-4 md:mt-0`}>
        <button
          onClick={() => navigate('/operator-registration')}
          className="w-full md:w-auto bg-[#3B4B96] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2C3A7D] hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
        >
          <span>Add Operator</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
        <button
          onClick={onEnquiryClick}
          className="w-full md:w-auto bg-[#3B4B96] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#2C3A7D] hover:scale-105 transition-all duration-300 shadow-md flex items-center justify-center gap-2"
        >
          <span>Send Enquiry</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

// Home component for the main page
const Home = ({ showContact, showForm, handleContactClick, handleCloseContact, setShowForm }) => {
  return (
    <>
      <main className="relative h-[calc(100vh-88px)]">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/intro-bg.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/30 via-transparent to-[#3B4B96]/40 backdrop-blur-[2px] animate-gradient"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-[#3B4B96]/20 via-transparent to-[#FF5722]/30 mix-blend-overlay animate-gradient-reverse"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-black px-4 sm:px-6 md:px-8" style={{ paddingTop: '5vh' }}>
          <div className="bg-[#FF5722] px-4 sm:px-8 md:px-16 py-3 sm:py-4 md:py-6 rounded-lg mb-2 md:mb-2 shadow-lg w-fit">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">Coming Soon!</h2>
          </div>
          <h1 className="text-lg sm:text-xl md:text-4xl font-bold text-center mb-2 md:mb-2 px-2">  
            Our new website is on its way.
          </h1>
          <div className="max-w-[90%] sm:max-w-2xl md:max-w-3xl mx-auto text-center space-y-2 sm:space-y-3 md:space-y-2">
            <h2 className="text-base sm:text-lg md:text-xl text-center font-semibold">
              India's Most Trusted Bus Rental Platform for Businesses.
            </h2>
            <h3 className="text-sm sm:text-base md:text-lg text-center text-gray-700">
              Hassle-Free, Long-Term Staff Transport Contracts,
            </h3>
            <h3 className="text-sm sm:text-base md:text-lg text-center text-gray-700 mb-4 sm:mb-2 md:mb-2">
              Outstation, Events, and More!
            </h3>
            <p className="text-sm sm:text-base md:text-lg text-center text-[#FF5722] font-medium bg-white/80 py-2 px-3 sm:px-4 rounded-full inline-block mx-auto">
              Corporate • Group • Pilgrimage • Leisure Bus Services
            </p>
          </div>
        </div>

        {/* Moving Buses Container */}
        <div className="absolute bottom-[20px] left-0 right-0">
          {/* Road */}
          <div className="relative h-[60px] md:h-[100px] mb-5">
            <img 
              src="/road.jpg" 
              alt="Road" 
              className="w-full h-full object-contain"
            />

            {/* Left to Right Buses */}
            <div className="absolute bottom-6 md:bottom-11 w-full">
              {/* First set */}
              <div className="flex gap-32 animate-moveLeftToRight">
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
              </div>
              {/* Second set with delay */}
              <div className="absolute top-0 left-0 flex gap-32 animate-moveLeftToRight" style={{animationDelay: "-12.5s"}}>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-[13px] left-[72%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[13px] left-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
              </div>
            </div>

            {/* Right to Left Buses */}
            <div className="absolute bottom-2 w-full">
              {/* First set */}
              <div className="flex gap-22 animate-moveRightToLeft">
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
              </div>
              {/* Second set with delay */}
              <div className="absolute top-0 left-0 flex gap-22 animate-moveRightToLeft" style={{animationDelay: "-12.5s"}}>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/frontwheel.png" alt="Front Wheel" className="absolute bottom-2.5 right-[73%] w-[37px] h-[37px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-2.5 right-[28%] w-[37px] h-[37px] animate-spin" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {showContact && <ContactPopup isOpen={showContact} onClose={handleCloseContact} />}
      {showForm && <EnquiryForm isOpen={showForm} onClose={() => setShowForm(false)} />}
    </>
  );
};

function App() {
  const [showForm, setShowForm] = useState(false)
  const [showContact, setShowContact] = useState(false)

  const handleContactClick = () => {
    setShowContact(true);
  };

  const handleCloseContact = () => {
    setShowContact(false);
  };

  return (
    <Router>
      <AppContent
        showForm={showForm}
        setShowForm={setShowForm}
        showContact={showContact}
        handleContactClick={handleContactClick}
        handleCloseContact={handleCloseContact}
      />
    </Router>
  )
}

function AppContent({ showForm, setShowForm, showContact, handleContactClick, handleCloseContact }) {
  const location = useLocation();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Navbar 
        onContactClick={handleContactClick}
        onEnquiryClick={() => setShowForm(true)}
      />
      <Routes>
        <Route path="/" element={
          <Home 
            showContact={showContact}
            showForm={showForm}
            handleContactClick={handleContactClick}
            handleCloseContact={handleCloseContact}
            setShowForm={setShowForm}
          />
        } />
        <Route path="/operator-registration" element={<OperatorForm />} />
      </Routes>
      {/* Footer only on home page */}
      {location.pathname === '/' && (
        <footer className="fixed bottom-0 w-full bg-white/90 backdrop-blur-sm text-center py-2 px-4 sm:px-6 md:px-8 shadow-top z-[50]">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-gray-600">
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base">All Rights Reserved.</span>
              <span className="text-sm md:text-base hidden sm:inline">•</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm md:text-base">Designed by</span>
              <a href="#" className="text-[#3B4B96] font-medium hover:text-[#2C3A7D] transition-colors text-sm md:text-base">A N T Soft Solution.</a>
            </div>
            <button
              type="button"
              onClick={handleContactClick}
              className="bg-[#3B4B96] text-white px-4 py-1.5 rounded-md hover:bg-[#2C3A7D] transition-all duration-300 text-sm md:text-base flex items-center gap-1 mt-2 sm:mt-0 sm:ml-2"
            >
              <span>Contact Us</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
          </div>
        </footer>
      )}
      <style>{`
        @keyframes moveLeftToRight {
          0% { transform: translateX(-150%); }
          100% { transform: translateX(150%); }
        }
        @keyframes moveRightToLeft {
          0% { transform: translateX(150%); }
          100% { transform: translateX(-150%); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes popup {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-moveLeftToRight {
          animation: moveLeftToRight 25s linear infinite;
        }
        .animate-moveRightToLeft {
          animation: moveRightToLeft 25s linear infinite;
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-popup {
          animation: popup 0.3s ease-out forwards;
        }
        .animate-gradient {
          animation: gradient 15s ease infinite;
          background-size: 200% 200%;
        }
        .animate-gradient-reverse {
          animation: gradient 15s ease infinite reverse;
          background-size: 200% 200%;
        }
        @media (max-width: 768px) {
          .bus-container {
            transform: scale(0.5);
            transform-origin: bottom;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .bus-container {
            transform: scale(0.7);
            transform-origin: bottom;
          }
        }
        .shadow-top {
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}

export default App
