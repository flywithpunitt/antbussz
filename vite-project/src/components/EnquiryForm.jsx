import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EnquiryForm = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    destination: '',
    package: '',
    busType: '',
    bus: '',
    travelDate: null,
    pickupLocations: [''],
    dropLocations: [''],
    dropDate: null,
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [packageOptions, setPackageOptions] = useState([]);
  const [busTypeOptions, setBusTypeOptions] = useState([]);
  const [busOptions, setBusOptions] = useState([]);
  const [openDropdown, setOpenDropdown] = useState('');

  useEffect(() => {
    // Reset bus type and bus when destination changes
    setFormData(prev => ({
      ...prev,
      busType: '',
      bus: ''
    }));

    // Set package options based on destination
    if (formData.destination === 'Local Run') {
      setPackageOptions([
        '4hr/40km', '8hr/80km', '12hr/120km',
        '16hr/160km', '24hr/200km'
      ]);
      setBusTypeOptions(['AC Deluxe Buses', 'AC Luxury Buses', 'AC Sleeper Buses']);
    } else if (formData.destination === 'Outstation Run') {
      setPackageOptions(['One Way', 'Roundtrip']);
      setBusTypeOptions(['AC Deluxe Buses', 'AC Luxury Buses', 'AC Sleeper Buses']);
    } else if (formData.destination === 'Chardham Yatra') {
      setPackageOptions([
        'Complete Chardham Yatra', 'Do dham yatra',
        'Yamunotri Dham', 'Gangotri Dham',
        'Kedarnath Dham', 'Badrinath Dham'
      ]);
      setBusTypeOptions(['AC Deluxe']);
    } else {
      setPackageOptions([]);
      setBusTypeOptions([]);
    }
  }, [formData.destination]);

  useEffect(() => {
    // Reset bus when bus type changes
    setFormData(prev => ({
      ...prev,
      bus: ''
    }));

    // Set bus options based on destination and bus type
    if (formData.destination === 'Chardham Yatra') {
      setBusOptions([
        '40 seater (3+2)',
        '32 seater (2+2)',
        '27 seater (2+2)',
        '21 seater (2+1)'
      ]);
    } else {
      // Original bus options for other destinations
      if (formData.busType === 'AC Deluxe Buses') {
        setBusOptions([
          'AC Deluxe Bus 21 Seater (2+1)',
          'AC Deluxe Bus 27 Seater (2+2)',
          'AC Deluxe Bus 35 Seater (2+2)',
          'AC Deluxe Bus 41 Seater (2+2)'
        ]);
      } else if (formData.busType === 'AC Luxury Buses') {
        setBusOptions([
          'AC Luxury Bus 25 Seater (2+1)',
          'AC Luxury Bus 31 Seater (2+2)',
          'AC Luxury Bus 41 Seater (2+2)'
        ]);
      } else if (formData.busType === 'AC Sleeper Buses') {
        setBusOptions(['AC Seater Sleeper Bus (2+2)']);
      } else {
        setBusOptions([]);
      }
    }
  }, [formData.destination, formData.busType]);

  const handleDropdownClick = (name) => {
    setOpenDropdown(openDropdown === name ? '' : name);
  };

  const handleOptionSelect = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setOpenDropdown('');
  };

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addLocation = (type) => {
    const field = type === 'pickup' ? 'pickupLocations' : 'dropLocations';
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };

  const removeLocation = (type, index) => {
    const field = type === 'pickup' ? 'pickupLocations' : 'dropLocations';
    if (formData[field].length > 1) {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const updateLocation = (type, index, value) => {
    const field = type === 'pickup' ? 'pickupLocations' : 'dropLocations';
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((loc, i) => i === index ? value : loc)
    }));
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 3));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.destination) newErrors.destination = 'Please select a destination';
      if (!formData.package) newErrors.package = 'Please select a package';
      if (!formData.busType) newErrors.busType = 'Please select a bus type';
      if (!formData.bus) newErrors.bus = 'Please select a bus';
    }

    if (step === 2) {
      if (!formData.travelDate) newErrors.travelDate = 'Please select travel date and time';
      if (!formData.pickupLocations[0]) newErrors.pickupLocation = 'Please enter pickup location';
      if (!formData.dropLocations[0]) newErrors.dropLocation = 'Please enter drop-off location';
      if (!formData.dropDate) newErrors.dropDate = 'Please select drop-off date and time';
      
      // Validate that drop date is after travel date
      if (formData.travelDate && formData.dropDate && formData.dropDate <= formData.travelDate) {
        newErrors.dropDate = 'Drop-off date must be after travel date';
      }
    }

    if (step === 3) {
      if (!formData.name) newErrors.name = 'Please enter your name';
      if (!formData.email) newErrors.email = 'Please enter your email';
      if (!formData.phone) newErrors.phone = 'Please enter your phone number';
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }

      // Phone validation (10 digits)
      const phoneRegex = /^\d{10}$/;
      if (formData.phone && !phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid 10-digit phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(3)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(formData);
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    const hasData = Object.values(formData).some(value => {
      if (Array.isArray(value)) return value.some(v => v !== '');
      return value !== '' && value !== null;
    });

    if (hasData) {
      if (window.confirm('Are you sure you want to close? Any unsaved changes will be lost.')) {
        onClose();
      }
    } else {
      onClose();
    }
  };

  const renderError = (field) => {
    return errors[field] && (
      <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] backdrop-blur-sm overflow-hidden">
      <div className="bg-white rounded-3xl w-full max-w-2xl mx-4 animate-scaleUp max-h-[90vh] flex flex-col">
        {/* Header - Fixed */}
        <div className="relative">
          {/* Header Pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF5722]/5 to-[#3B4B96]/5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #FF5722 1px, transparent 0)`,
              backgroundSize: '20px 20px',
              opacity: 0.1
            }}></div>
          </div>

          {/* Header Content */}
          <div className="p-8 relative">
            <div className="flex justify-between items-start">
              <div className="space-y-3">
                <div className="flex items-center gap-3 animate-fadeInSlide">
                  {/* Bus Icon */}
                  <div className="p-2.5 bg-gradient-to-br from-[#FF5722] to-[#3B4B96] rounded-xl shadow-lg transform -rotate-12">
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0v8a2 2 0 01-2 2H6a2 2 0 01-2-2V7m16 0l-3-3H7L4 7m0 0h16M4 7v8m0 0v2m16-2v2m-8-6h.01M8 13h.01" />
                    </svg>
                  </div>
                  <h2 className="text-3xl font-bold">
                    <span className="bg-gradient-to-r from-[#FF5722] to-[#3B4B96] bg-clip-text text-transparent">
                      Bus Hire
                    </span>
                  </h2>
                </div>
                <div className="pl-1 animate-fadeInSlideDelay">
                  <p className="text-gray-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF5722]"></span>
                    Submit Your Details
                  </p>
                </div>
              </div>

              {/* Close Button */}
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-all p-2 hover:bg-gray-100 rounded-full relative group animate-fadeIn"
              >
                <span className="absolute -inset-2 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <svg className="w-5 h-5 relative" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 pt-0">
          <div className="mt-8">
            <div className="flex justify-between items-center text-sm mb-2">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-medium">
                  {currentStep}
                </span>
                <span className="font-medium text-gray-700">Step {currentStep} of 3</span>
              </div>
              <span className="text-[#FF5722] font-medium">{Math.round((currentStep / 3) * 100)}% Complete</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#FF5722] to-[#3B4B96] rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Form Content */}
          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {currentStep === 1 && (
                <div className="animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="p-1.5 bg-[#FF5722]/10 rounded-lg">
                      <svg className="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    Bus Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Select Destination
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => handleDropdownClick('destination')}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-left text-gray-900 hover:border-[#FF5722] transition-colors duration-200 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10"
                        >
                          {formData.destination || 'Select Destination'}
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-[#FF5722]">
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </button>
                        {openDropdown === 'destination' && (
                          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-auto animate-fadeIn">
                            <div className="py-1">
                              {['Local Run', 'Outstation Run', 'Chardham Yatra'].map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 hover:text-[#FF5722] transition-colors duration-200"
                                  onClick={() => handleOptionSelect('destination', option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {formData.destination && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Select Package
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={() => handleDropdownClick('package')}
                            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-left text-gray-900 hover:border-[#FF5722] transition-colors duration-200 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10"
                          >
                            {formData.package || 'Select Package'}
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400 group-hover:text-[#FF5722]">
                              <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none">
                                <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            </span>
                          </button>
                          {openDropdown === 'package' && (
                            <div className="absolute z-10 w-full mt-2 bg-white border border-gray-100 rounded-xl shadow-lg max-h-60 overflow-auto animate-fadeIn">
                              <div className="py-1">
                                {packageOptions.map((option) => (
                                  <button
                                    key={option}
                                    type="button"
                                    className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 hover:text-[#FF5722] transition-colors duration-200"
                                    onClick={() => handleOptionSelect('package', option)}
                                  >
                                    {option}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Select Bus Type
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => handleDropdownClick('busType')}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-left text-gray-900 focus:outline-none hover:border-[#FF5722]"
                        >
                          {formData.busType || 'Select Bus Type'}
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" viewBox="0 0 20 20" fill="none">
                              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </button>
                        {openDropdown === 'busType' && (
                          <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg max-h-60 overflow-auto">
                            <div className="py-1">
                              {busTypeOptions.map((option) => (
                                <button
                                  key={option}
                                  type="button"
                                  className="w-full px-4 py-2 text-left hover:bg-gray-50 text-gray-900"
                                  onClick={() => handleOptionSelect('busType', option)}
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Select Bus
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => handleDropdownClick('bus')}
                          className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-left text-gray-900 hover:border-[#FF5722] transition-colors duration-200 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10"
                        >
                          {formData.bus || 'Select Bus'}
                          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                            <svg className="w-5 h-5 transition-transform duration-200" style={{ transform: openDropdown === 'bus' ? 'rotate(180deg)' : 'rotate(0deg)' }} viewBox="0 0 20 20" fill="none">
                              <path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        </button>
                      </div>
                      {openDropdown === 'bus' && (
                        <div className="w-full mt-1 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden animate-expandDown">
                          <div className="max-h-[200px] overflow-y-auto">
                            {busOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-gray-700 hover:text-[#FF5722] transition-colors duration-200"
                                onClick={() => handleOptionSelect('bus', option)}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="p-1.5 bg-[#3B4B96]/10 rounded-lg">
                      <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </span>
                    Journey Details
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Travel Date & Time
                      </label>
                      <DatePicker
                        selected={formData.travelDate}
                        onChange={(date) => setFormData(prev => ({ ...prev, travelDate: date }))}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none hover:border-[#FF5722]"
                        placeholderText="Select date and time"
                        required
                      />
                    </div>

                    {formData.pickupLocations.map((location, index) => (
                      <div key={`pickup-${index}`}>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-sm font-medium text-gray-700">
                            {index === 0 ? 'Pickup Location' : `Additional Pickup ${index + 1}`}
                          </label>
                          <div className="flex gap-2">
                            {formData.pickupLocations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeLocation('pickup', index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                            {index === formData.pickupLocations.length - 1 && (
                              <button
                                type="button"
                                onClick={() => addLocation('pickup')}
                                className="text-[#FF5722] hover:text-[#FF7043] transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => updateLocation('pickup', index, e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none hover:border-[#FF5722]"
                          placeholder="Enter pickup location"
                          required
                        />
                      </div>
                    ))}

                    {formData.dropLocations.map((location, index) => (
                      <div key={`drop-${index}`}>
                        <div className="flex justify-between items-center mb-1.5">
                          <label className="block text-sm font-medium text-gray-700">
                            {index === 0 ? 'Drop-off Location' : `Additional Drop-off ${index + 1}`}
                          </label>
                          <div className="flex gap-2">
                            {formData.dropLocations.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeLocation('drop', index)}
                                className="text-red-500 hover:text-red-700 transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                            )}
                            {index === formData.dropLocations.length - 1 && (
                              <button
                                type="button"
                                onClick={() => addLocation('drop')}
                                className="text-[#FF5722] hover:text-[#FF7043] transition-colors"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => updateLocation('drop', index, e.target.value)}
                          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none hover:border-[#FF5722]"
                          placeholder="Enter drop-off location"
                          required
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Drop-off Date & Time
                      </label>
                      <DatePicker
                        selected={formData.dropDate}
                        onChange={(date) => setFormData(prev => ({ ...prev, dropDate: date }))}
                        showTimeSelect
                        dateFormat="MMMM d, yyyy h:mm aa"
                        className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-gray-900 focus:outline-none hover:border-[#FF5722]"
                        placeholderText="Select date and time"
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="animate-fadeIn">
                  <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <span className="p-1.5 bg-[#FF5722]/10 rounded-lg">
                      <svg className="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </span>
                    Personal Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                        placeholder="Enter your name"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                        placeholder="Enter your email"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Message
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200 resize-none min-h-[100px]"
                        placeholder="Enter your message"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Buttons - Fixed at bottom */}
              <div className="sticky bottom-0 bg-white pt-6 mt-8 border-t border-gray-100">
                <div className="flex justify-between">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={isSubmitting}
                      className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors duration-200 flex items-center gap-2 group disabled:opacity-50"
                    >
                      <svg className="w-4 h-4 transition-transform duration-200 transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Previous
                    </button>
                  )}
                  <button
                    type={currentStep === 3 ? 'submit' : 'button'}
                    onClick={currentStep === 3 ? undefined : handleNext}
                    disabled={isSubmitting}
                    className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FF5722] to-[#3B4B96] rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 group ml-auto disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    ) : currentStep === 3 ? (
                      <>
                        Submit
                        <svg className="w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </>
                    ) : (
                      <>
                        Next
                        <svg className="w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scaleUp {
            from { transform: scale(0.95); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeInSlide {
            from { 
              opacity: 0; 
              transform: translateX(-20px); 
            }
            to { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          @keyframes fadeInSlideDelay {
            0% { 
              opacity: 0; 
              transform: translateX(-20px); 
            }
            50% { 
              opacity: 0; 
              transform: translateX(-20px); 
            }
            100% { 
              opacity: 1; 
              transform: translateX(0); 
            }
          }
          .animate-scaleUp {
            animation: scaleUp 0.3s ease-out forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }
          .animate-fadeInSlide {
            animation: fadeInSlide 0.5s ease-out forwards;
          }
          .animate-fadeInSlideDelay {
            animation: fadeInSlideDelay 0.8s ease-out forwards;
          }
          /* Custom DatePicker Styles */
          .react-datepicker-wrapper {
            width: 100%;
          }
          .react-datepicker__input-container input {
            width: 100%;
            padding: 0.625rem 1rem;
            border-radius: 0.75rem;
            border: 1px solid #e5e7eb;
            font-size: 0.875rem;
            color: #1f2937;
            background-color: white;
            transition: all 0.2s;
          }
          .react-datepicker__input-container input:hover {
            border-color: #FF5722;
          }
          .react-datepicker__input-container input:focus {
            outline: none;
            border-color: #FF5722;
            box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.1);
          }
          /* Custom Scrollbar for Dropdowns */
          .max-h-[200px] {
            scrollbar-width: thin;
            scrollbar-color: #FF5722 #f3f4f6;
          }
          
          .max-h-[200px]::-webkit-scrollbar {
            width: 6px;
          }
          
          .max-h-[200px]::-webkit-scrollbar-track {
            background: #f3f4f6;
            border-radius: 10px;
          }
          
          .max-h-[200px]::-webkit-scrollbar-thumb {
            background-color: #FF5722;
            border-radius: 10px;
            border: 2px solid #f3f4f6;
          }

          /* Expand Down Animation */
          @keyframes expandDown {
            from {
              opacity: 0;
              transform: scaleY(0);
              transform-origin: top;
            }
            to {
              opacity: 1;
              transform: scaleY(1);
              transform-origin: top;
            }
          }

          .animate-expandDown {
            animation: expandDown 0.2s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
};

export default EnquiryForm;