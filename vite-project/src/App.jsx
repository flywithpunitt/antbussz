import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'

import ContactPopup from './components/ContactPopup'
import EnquiryForm from './components/EnquiryForm'
import OperatorsList from './components/OperatorsList'
import OperatorDetails from './components/OperatorDetails'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import OperatorForm from './components/OperatorForm'

function AppContent() {
  const [showForm, setShowForm] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const location = useLocation()

  const handleContactClick = () => {
    setShowContact(true);
  };

  const handleCloseContact = () => {
    setShowContact(false);
  };

  // Hide navbar on operators list page and login page
  const shouldShowNavbar = !['operators', 'login', 'operator-registration'].includes(location.pathname.split('/')[1]) && !location.pathname.includes('operator/');

  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden">
      {shouldShowNavbar && (
        <Navbar 
          onContactClick={handleContactClick}
          onEnquiryClick={() => setShowForm(true)}
        />
      )}
      <main className="flex-grow relative">
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
          <Route path="/login" element={<Login />} />
          <Route path="/operator-registration" element={<OperatorForm />} />
          <Route path="/operators" element={
            <ProtectedRoute>
              <OperatorsList />
            </ProtectedRoute>
          } />
          <Route path="/operator/:id" element={
            <ProtectedRoute>
              <OperatorDetails />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
      {/* Footer only on home page */}
      {location.pathname === '/' && (
        <footer className="relative bg-white/90 backdrop-blur-sm text-center py-2 px-4 sm:px-6 md:px-8 shadow-top z-[50] mt-[-45px]">
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
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spinReverse {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        .animate-moveLeftToRight {
          animation: moveLeftToRight 35s linear infinite;
        }
        .animate-moveRightToLeft {
          animation: moveRightToLeft 35s linear infinite;
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
        .animate-spin {
          animation: spin 4s linear infinite;
        }
        .animate-spin-reverse {
          animation: spinReverse 4s linear infinite;
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

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
