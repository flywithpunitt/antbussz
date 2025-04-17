import { useState, useEffect } from 'react'
import emailjs from '@emailjs/browser'

function App() {
  const [showForm, setShowForm] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({
    destination: '',
    busType: '',
    bus: '',
    name: '',
    email: '',
    phone: '',
    date: '',
    passengers: '1'
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const destinations = [
    'Chennai',
    'Bangalore',
    'Hyderabad',
    'Mumbai',
    'Delhi',
    'Kolkata'
  ]

  const busTypes = [
    'AC Sleeper',
    'Non-AC Sleeper',
    'AC Seater',
    'Non-AC Seater',
    'Luxury',
    'Semi-Luxury'
  ]

  const buses = [
    'Volvo Multi-Axle',
    'Volvo AC Sleeper',
    'Scania AC Sleeper',
    'Bharat Benz AC',
    'Regular AC Bus',
    'Regular Non-AC Bus'
  ]

  const modalStyle = {
    msOverflowStyle: 'none',
    scrollbarWidth: 'none',
    '&::-webkit-scrollbar': {
      display: 'none'
    }
  }

  useEffect(() => {
    setIsVisible(true)
    // Initialize EmailJS with your public key
    emailjs.init("wmTHuDwVQJCXI4ylh")
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ text: '', type: '' })

    try {
      const response = await emailjs.send(
        "service_jzg7o7c", // Your EmailJS service ID
        "template_9xngds9", // Your EmailJS template ID
        {
          destination: formData.destination,
          busType: formData.busType,
          bus: formData.bus,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          date: formData.date,
          passengers: formData.passengers
        }
      )

      if (response.status === 200) {
        setMessage({ 
          text: 'Booking request sent successfully! We will contact you soon.', 
          type: 'success' 
        })
        // Reset form after successful submission
        setFormData({
          destination: '',
          busType: '',
          bus: '',
          name: '',
          email: '',
          phone: '',
          date: '',
          passengers: '1'
        })
        // Close modal after 3 seconds
        setTimeout(() => setShowForm(false), 3000)
      }
    } catch (error) {
      console.error('Email sending failed:', error)
      setMessage({ 
        text: 'Failed to send booking request. Please try again or contact us directly.', 
        type: 'error' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-gradient-to-br from-orange-200 to-orange-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gradient-to-tr from-orange-200 to-orange-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      {/* Navbar - Enhanced mobile responsiveness */}
      <nav className="relative z-10 flex justify-between items-center px-4 sm:px-6 md:px-12 py-3 sm:py-4">
        <div className="flex items-center gap-3">
          <img src="/logo2-removebg-preview.png" alt="ANT" className="h-10 sm:h-12 md:h-16 w-auto object-contain" />
        </div>
        
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-[#FF5722] to-orange-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 rounded-full transition-all duration-300 font-medium text-sm sm:text-base hover:shadow-[0_8px_16px_rgba(255,87,34,0.3)] hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2"
        >
          <span className="hidden sm:inline">Book Now</span>
          <span className="sm:hidden">Book</span>
          <svg className="w-4 h-4 sm:w-5 sm:h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </nav>

      {/* Hero Section - Improved responsiveness */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          <div className="space-y-4 sm:space-y-6 relative">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative">
                <span className="text-xs sm:text-sm font-semibold px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-orange-50 text-[#FF5722] inline-block">
                  🚀 Launching Soon
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Coming Soon!
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl">
                Our new website is on its way. We are thrilled to announce that something exciting is coming your way! Our brand-new website is under development and will soon be ready to deliver a fresh, seamless, and user-friendly experience.
              </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
              {/* Progress Bar Section - Mobile optimized */}
              <div className="w-full max-w-md bg-white/50 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100">
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs sm:text-sm font-medium text-gray-600">Development Progress</span>
                    <span className="text-xs sm:text-sm font-medium text-[#FF5722]">75%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 sm:h-2.5">
                    <div className="bg-[#FF5722] h-2 sm:h-2.5 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* Features Grid - Responsive layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { 
                    icon: "🎨", 
                    title: "Modern Design", 
                    desc: "Fresh and contemporary look",
                    gradient: "bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-orange-500/10"
                  },
                  { 
                    icon: "⚡", 
                    title: "Fast Loading", 
                    desc: "Optimized for speed",
                    gradient: "bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10"
                  },
                  { 
                    icon: "📱", 
                    title: "Mobile Ready", 
                    desc: "Perfect on all devices",
                    gradient: "bg-gradient-to-br from-emerald-500/10 via-teal-500/10 to-cyan-500/10"
                  }
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className={`group relative overflow-hidden backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 hover:shadow-lg transition-all duration-300 ${feature.gradient} border border-white/20 hover:border-white/40`}
                  >
                    <div className="text-3xl sm:text-4xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Hero Image - Responsive sizing */}
          <div className="relative mt-6 lg:mt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5722]/20 to-orange-100/20 rounded-xl sm:rounded-2xl transform rotate-3"></div>
            <img 
              src="/intro-bg.png" 
              alt="Coming Soon" 
              className="relative rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl transform -rotate-3 hover:rotate-0 transition-all duration-500 w-full object-cover aspect-[4/3]"
            />
          </div>
        </div>
      </main>

      {/* Stats Section */}
      <section className="relative z-10 bg-white/80 backdrop-blur-sm border-y border-gray-100 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Cities Covered" },
              { number: "1000+", label: "Happy Customers" },
              { number: "100+", label: "Luxury Buses" },
              { number: "24/7", label: "Customer Support" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-[#FF5722]">{stat.number}</div>
                <div className="text-gray-600 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-gray-100 pt-16 pb-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="space-y-4">
              <img src="/logo2-removebg-preview.png" alt="ANT" className="h-12 w-auto" />
              <p className="text-gray-600 text-sm leading-relaxed">
                Experience the best in bus travel with our premium fleet and exceptional service. Your comfort is our priority.
              </p>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                  <a
                    key={social}
                    href={`#${social}`}
                    className="w-10 h-10 rounded-full bg-gray-50 hover:bg-[#FF5722]/10 flex items-center justify-center text-gray-600 hover:text-[#FF5722] transition-all duration-300 group"
                  >
                    <span className="sr-only">{social}</span>
                    <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                      {social === 'facebook' && <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>}
                      {social === 'twitter' && <path d="M23 3.01s-2.018 1.192-3.14 1.53a4.48 4.48 0 00-7.86 3v1a10.66 10.66 0 01-9-4.53s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5 0-.278-.028-.556-.08-.83C21.94 5.674 23 3.01 23 3.01z"/>}
                      {social === 'instagram' && <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z"/>}
                      {social === 'linkedin' && <path d="M19 3a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h14m-.5 15.5v-5.3a3.26 3.26 0 00-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 011.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 001.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 00-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>}
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Services', 'Book Now', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-600 hover:text-[#FF5722] transition-colors duration-300 text-sm flex items-center group">
                      <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Our Services</h3>
              <ul className="space-y-3">
                {['City Transfer', 'Airport Transfer', 'Corporate Travel', 'Holiday Packages'].map((service) => (
                  <li key={service}>
                    <a href={`#${service.toLowerCase()}`} className="text-gray-600 hover:text-[#FF5722] transition-colors duration-300 text-sm flex items-center group">
                      <svg className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-gray-900 font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#FF5722] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 Travel Street, City Name, Country - 12345</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@antbus.com</span>
                </li>
                <li className="flex items-center space-x-3 text-gray-600 text-sm">
                  <svg className="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+1 234 567 8900</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-gray-600 text-sm">
                © {new Date().getFullYear()} ANT Bus. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <a href="#privacy" className="hover:text-[#FF5722] transition-colors duration-300">Privacy Policy</a>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <a href="#terms" className="hover:text-[#FF5722] transition-colors duration-300">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Form - Mobile responsive */}
      {showForm && (
        <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3 sm:gap-4">
                  <img src="/logo2-removebg-preview.png" alt="ANT" className="h-8 sm:h-12 w-auto" />
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-gray-900">Book Now</h3>
                    <p className="text-sm text-gray-600">Fill in your details</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl"
                >
                  ×
                </button>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-8 overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Destination Selection */}
                <div className="space-y-3 group">
                  <label htmlFor="destination" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Select Destination
                  </label>
                  <div className="relative">
                    <select
                      id="destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 appearance-none hover:border-[#FF5722]/30"
                    >
                      <option value="">Select Destination</option>
                      {destinations.map((dest) => (
                        <option key={dest} value={dest}>{dest}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bus Type Selection */}
                <div className="space-y-3 group">
                  <label htmlFor="busType" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Select Bus Type
                  </label>
                  <div className="relative">
                    <select
                      id="busType"
                      name="busType"
                      value={formData.busType}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 appearance-none hover:border-[#FF5722]/30"
                    >
                      <option value="">Select Bus Type</option>
                      {busTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Bus Selection */}
                <div className="space-y-3 group">
                  <label htmlFor="bus" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Select Bus
                  </label>
                  <div className="relative">
                    <select
                      id="bus"
                      name="bus"
                      value={formData.bus}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 appearance-none hover:border-[#FF5722]/30"
                    >
                      <option value="">Select Bus</option>
                      {buses.map((bus) => (
                        <option key={bus} value={bus}>{bus}</option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="space-y-3 group">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                    className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 placeholder-gray-400 hover:border-[#FF5722]/30"
                  />
                </div>

                <div className="space-y-3 group">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your email"
                    className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 placeholder-gray-400 hover:border-[#FF5722]/30"
                  />
                </div>

                <div className="space-y-3 group">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 placeholder-gray-400 hover:border-[#FF5722]/30"
                  />
                </div>

                {/* Date and Passengers */}
                <div className="space-y-3 group">
                  <label htmlFor="date" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Travel Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    required
                    className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 hover:border-[#FF5722]/30"
                  />
                </div>

                <div className="space-y-3 group">
                  <label htmlFor="passengers" className="block text-sm font-medium text-gray-600 group-hover:text-gray-800 transition-colors duration-200">
                    Number of Passengers
                  </label>
                  <div className="relative">
                    <select
                      id="passengers"
                      name="passengers"
                      value={formData.passengers}
                      onChange={handleInputChange}
                      required
                      className="w-full rounded-xl bg-white border-2 border-gray-100 text-gray-700 px-4 py-3 focus:border-[#FF5722] focus:ring-[#FF5722]/20 transition-all duration-200 appearance-none hover:border-[#FF5722]/30"
                    >
                      {[...Array(50)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>
                          {i + 1} {i === 0 ? 'Passenger' : 'Passengers'}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Display */}
              {message.text && (
                <div className={`p-4 rounded-xl border-2 ${
                  message.type === 'success' 
                    ? 'bg-green-50 border-green-200 text-green-600' 
                    : 'bg-red-50 border-red-200 text-red-600'
                }`}>
                  {message.text}
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-6 py-3 border-2 border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 transition-all duration-200 hover:border-gray-300 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="group px-6 py-3 bg-gradient-to-r from-[#FF5722] to-orange-600 text-white rounded-xl transition-all duration-200 hover:shadow-[0_0_20px_rgba(255,87,34,0.3)] hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Request</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        .animate-progress {
          animation: progress 2s ease-out;
        }
      `}</style>
    </div>
  )
}

export default App
