import React from 'react';
import ContactPopup from './ContactPopup';
import EnquiryForm from './EnquiryForm';

const Home = ({ showContact, showForm, handleContactClick, handleCloseContact, setShowForm }) => {
  return (
    <>
      <main className="relative h-[calc(100vh-88px)]">
        {/* Background Image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/intro-bg.jpg" 
            alt="Background" 
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF5722]/70 via-[#fff]/10 to-[#3B4B96]/80 mix-blend-multiply"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center h-full text-black px-4 sm:px-6 md:px-8" style={{ paddingTop: '5vh' }}>
          <div className="bg-[#FF5722] px-3 sm:px-5 md:px-8 py-1.5 sm:py-2 md:py-2.5 rounded-lg mb-2 md:mb-2 shadow-lg w-fit">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center leading-tight">Coming Soon!</h2>
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
        <div className="absolute bottom-[10px] left-0 right-0">
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
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
              </div>
              {/* Second set with delay */}
              <div className="absolute top-0 left-0 flex gap-32 animate-moveLeftToRight" style={{animationDelay: "-17.5s"}}>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[22px] left-[72%] w-[30px] h-[30px] animate-spin" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[22px] left-[27%] w-[30px] h-[30px] animate-spin" />
                </div>
              </div>
            </div>

            {/* Right to Left Buses */}
            <div className="absolute bottom-2 w-full">
              {/* First set */}
              <div className="flex gap-22 animate-moveRightToLeft">
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
                </div>
              </div>
              {/* Second set with delay */}
              <div className="absolute top-0 left-0 flex gap-22 animate-moveRightToLeft" style={{animationDelay: "-17.5s"}}>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
                </div>
                <div className="relative bus-container">
                  <img src="/bus.png" alt="Bus" className="h-[120px] w-auto object-contain scale-x-[-1]" />
                  <img src="/backwheel.png" alt="Front Wheel" className="absolute bottom-[20px] left-[63%] w-[30px] h-[30px] animate-spin-reverse" />
                  <img src="/backwheel.png" alt="Back Wheel" className="absolute bottom-[20px] left-[17%] w-[30px] h-[30px] animate-spin-reverse" />
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

export default Home; 