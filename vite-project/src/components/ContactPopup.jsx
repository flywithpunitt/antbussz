import React from 'react';

const ContactPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center overflow-y-auto py-4 px-4 sm:px-6"
      style={{ zIndex: 9999 }}
    >
      <div 
        className="bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl border-2 border-gray-100 relative my-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 z-50 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-gray-100 transition-all duration-300 group shadow-lg"
        >
          <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 group-hover:text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {/* Left Section - Contact Information */}
          <div className="bg-gray-50">
            <div className="p-6 sm:p-8 md:p-10 space-y-6 sm:space-y-8">
              <div className="mb-4 sm:mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Contact Information</h2>
                <div className="h-1 w-24 sm:w-32 bg-[#FF5722] mt-3 sm:mt-4 rounded-full"></div>
              </div>

              {/* Contact Details Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm space-y-4 sm:space-y-6">
                {/* Contact Numbers */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-[#FF5722]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Contact Numbers</h3>
                  </div>
                  <div className="text-base sm:text-lg pl-7 sm:pl-9 space-y-1">
                    <p>
                      <span className="text-gray-500">Toll Free:</span>{' '}
                      <a href="tel:18001027408" className="hover:text-[#FF5722] transition-colors">18001027408</a>
                    </p>
                    <p>
                      <span className="text-gray-500">WhatsApp:</span>{' '}
                      <a href="tel:+919811992203" className="hover:text-[#FF5722] transition-colors">+91 98119 92203</a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-[#FF5722]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Email Address</h3>
                  </div>
                  <div className="pl-7 sm:pl-9">
                    <a href="mailto:booking@antbus.in" className="text-base sm:text-lg text-gray-600 hover:text-[#FF5722] transition-colors">
                      booking@antbus.in
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-[#FF5722]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Working Hours</h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 pl-7 sm:pl-9">Open 24/7</p>
                </div>
              </div>

              {/* Location Section */}
              <div className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="text-[#FF5722]">
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800">Our Location</h3>
                  </div>
                  <p className="text-base sm:text-lg text-gray-600 pl-7 sm:pl-9">
                    B-128, Transport Nagar, Sector 69,<br />
                    Noida, Uttar Pradesh - 201301, India
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Map */}
          <div className="relative min-h-[400px] md:h-full">
            <h2 className="absolute top-4 left-4 sm:top-6 sm:left-6 text-xl sm:text-2xl font-bold text-gray-800 bg-white/90 backdrop-blur-sm px-4 sm:px-6 py-2 rounded-lg shadow-md z-10">
              Find Us on Map
            </h2>
            <div className="absolute inset-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0157192146347!2d77.38047731508403!3d28.627818982418818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce5d76b0bab9f%3A0x5b0d7c4e5e7691a5!2sANT%20BUS%20PVT.%20LTD.%20(Delhi%20NCR)!5e0!3m2!1sen!2sin!4v1647886085149!5m2!1sen!2sin"
                className="w-full h-full"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup;
