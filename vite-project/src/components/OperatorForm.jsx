import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomDropdown from './CustomDropdown';

const statesData = {
  "Uttarakhand": ["Dehradun", "Haridwar", "Rishikesh", "Nainital", "Mussoorie", "Almora", "Haldwani"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Agra", "Varanasi", "Allahabad", "Noida", "Ghaziabad", "Meerut"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Thane", "Navi Mumbai"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot", "Gandhinagar", "Bhavnagar"],
  "Rajasthan": ["Jaipur", "Udaipur", "Jodhpur", "Ajmer", "Kota", "Bikaner", "Pushkar"],
  "Punjab": ["Chandigarh", "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Mohali"],
  "Himachal Pradesh": ["Shimla", "Manali", "Dharamshala", "Kullu", "Dalhousie", "McLeodganj"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Rohtak"]
};

const busTypeOptions = [
  "AC Deluxe",
  "AC Luxury",
  "AC Sleeper"
];

const busModelOptions = {
  "AC Deluxe": [
    "AC Deluxe Bus 21 Seater (2+1)",
    "AC Deluxe Bus 27 Seater (2+2)",
    "AC Deluxe Bus 35 Seater (2+2)",
    "AC Deluxe Bus 41 Seater (2+2)",
    "AC Deluxe Bus 45 Seater (2+2)",
    "AC Deluxe Bus 49 Seater (2+2)",
    "AC Deluxe Bus 60 Seater (3+2)"
  ],
  "AC Luxury": [
    "AC Luxury Bus 25 Seater (2+1)",
    "AC Luxury Bus 31 Seater (2+2)",
    "AC Luxury Bus 41 Seater (2+2)",
    "AC Luxury Bus 45 Seater (2+2)",
    "AC Luxury Bus 49 Seater (2+2)",
    "AC Luxury Bus 55 Seater (2+2)"
  ],
  "AC Sleeper": [
    "AC Seater Sleeper Bus (2+2)",
    "AC Sleeper Bus (2+1)"
  ]
};

const OperatorForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    emails: [{ email: '', alternate: '' }],
    phoneNumbers: [{ primary: '', alternate: '' }],
    state: '',
    city: '',
    address: '',
    sedans: '',
    tempoTravellers: '',
    miniBuses: '',
    largeBuses: '',
    busType: '',
    busModel: '',
    hasGSTIN: 'no',
    gstinNumber: '',
    gstinFile: null,
    gstCertificates: [null],
    bankDetails: [null],
    panCards: [null],
    aadharCards: [null],
    photo1: null,
    photo2: null
  });

  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showBusTypeDropdown, setShowBusTypeDropdown] = useState(false);
  const [showBusModelDropdown, setShowBusModelDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhoneChange = (index, type, value) => {
    const newPhoneNumbers = [...formData.phoneNumbers];
    newPhoneNumbers[index] = {
      ...newPhoneNumbers[index],
      [type]: value
    };
    setFormData(prev => ({
      ...prev,
      phoneNumbers: newPhoneNumbers
    }));
  };

  const addPhoneNumber = () => {
    setFormData(prev => ({
      ...prev,
      phoneNumbers: [...prev.phoneNumbers, { primary: '', alternate: '' }]
    }));
  };

  const removePhoneNumber = (index) => {
    if (formData.phoneNumbers.length > 1) {
      const newPhoneNumbers = formData.phoneNumbers.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        phoneNumbers: newPhoneNumbers
      }));
    }
  };

  const handleEmailChange = (index, type, value) => {
    const newEmails = [...formData.emails];
    newEmails[index] = {
      ...newEmails[index],
      [type]: value
    };
    setFormData(prev => ({
      ...prev,
      emails: newEmails
    }));
  };

  const addEmail = () => {
    setFormData(prev => ({
      ...prev,
      emails: [...prev.emails, { email: '', alternate: '' }]
    }));
  };

  const removeEmail = (index) => {
    if (formData.emails.length > 1) {
      const newEmails = formData.emails.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        emails: newEmails
      }));
    }
  };

  const handleStateSelect = (state) => {
    setFormData(prev => ({
      ...prev,
      state,
      city: ''
    }));
    setShowStateDropdown(false);
  };

  const handleCitySelect = (city) => {
    setFormData(prev => ({
      ...prev,
      city
    }));
    setShowCityDropdown(false);
  };

  const handleBusTypeSelect = (busType) => {
    setFormData(prev => ({
      ...prev,
      busType,
      busModel: ''
    }));
    setShowBusTypeDropdown(false);
  };

  const handleBusModelSelect = (busModel) => {
    setFormData(prev => ({
      ...prev,
      busModel
    }));
    setShowBusModelDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleFileChange = (field, idx, file) => {
    setFormData(prev => {
      const arr = [...prev[field]];
      arr[idx] = file;
      return { ...prev, [field]: arr };
    });
  };

  const addFile = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], null]
    }));
  };

  const removeFile = (field, idx) => {
    setFormData(prev => {
      const arr = [...prev[field]];
      arr.splice(idx, 1);
      return { ...prev, [field]: arr };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fixed Header */}
      <div className="fixed top-0 left-0 right-0 z-50 shadow-lg">
        <div className="relative w-full bg-gradient-to-br from-[#3B4B96] via-[#4F5FA8] to-[#2C3A7D] text-white overflow-hidden">
          <div className="max-w-4xl mx-auto px-4 flex flex-col items-center justify-center py-4 sm:py-5 animate-fade-in">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-7 h-7 sm:w-9 sm:h-9 text-[#FF5722] drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="3" y="7" width="18" height="10" rx="3" fill="#FF5722" stroke="white" strokeWidth="2"/>
                <circle cx="7" cy="18" r="2" fill="white" />
                <circle cx="17" cy="18" r="2" fill="white" />
                <rect x="7" y="10" width="10" height="2" rx="1" fill="white" />
              </svg>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight drop-shadow-lg">Bus Operator Registration Form</h1>
            </div>
            <p className="mt-0.5 sm:mt-1 text-white/90 text-sm sm:text-base font-medium animate-fade-in delay-100">Please share the following details for us to onboard you.</p>
          </div>
          {/* Curved SVG bottom edge */}
          
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8 mb-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-8 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-8">
          {/* Personal Details Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Personal Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Operator Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  required
                />
              </div>
            </div>

            {/* Emails */}
            <div className="mt-4 sm:mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Addresses</label>
              {formData.emails.map((emails, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-3">
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={emails.email}
                      onChange={e => handleEmailChange(index, 'email', e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="email"
                      value={emails.alternate}
                      onChange={e => handleEmailChange(index, 'alternate', e.target.value)}
                      placeholder="Enter alternate email address"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                    />
                  </div>
                  <div className="flex gap-2 col-span-1 sm:col-span-2">
                    {index === 0 ? (
                      <button
                        type="button"
                        onClick={addEmail}
                        className="px-3 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors duration-300 flex items-center gap-2 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Another Email
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removeEmail(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Remove Email
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Phone Numbers */}
            <div className="mt-4 sm:mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Numbers</label>
              {formData.phoneNumbers.map((phones, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-3">
                  <div className="space-y-2">
                    <input
                      type="tel"
                      value={phones.primary}
                      onChange={(e) => handlePhoneChange(index, 'primary', e.target.value)}
                      placeholder="Enter primary number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <input
                      type="tel"
                      value={phones.alternate}
                      onChange={(e) => handlePhoneChange(index, 'alternate', e.target.value)}
                      placeholder="Enter alternate number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                      required
                    />
                  </div>
                  <div className="flex gap-2 col-span-1 sm:col-span-2">
                    {index === 0 ? (
                      <button
                        type="button"
                        onClick={addPhoneNumber}
                        className="px-3 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors duration-300 flex items-center gap-2 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Add Another Number
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => removePhoneNumber(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-300 flex items-center gap-2 text-sm"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Remove Number
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* State and City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <CustomDropdown
                options={Object.keys(statesData)}
                value={formData.state}
                onChange={handleStateSelect}
                placeholder="Select State"
                isOpen={showStateDropdown}
                onOpen={() => setShowStateDropdown(true)}
                onClose={() => setShowStateDropdown(false)}
              />
            </div>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <CustomDropdown
                options={formData.state ? statesData[formData.state] : []}
                value={formData.city}
                onChange={handleCitySelect}
                placeholder="Select City"
                isOpen={showCityDropdown}
                onOpen={() => setShowCityDropdown(true)}
                onClose={() => setShowCityDropdown(false)}
                disabled={!formData.state}
              />
            </div>
          </div>

          {/* Address */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              placeholder="Enter your full office address"
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
              required
            ></textarea>
          </div>

          {/* Vehicle Details Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
              Vehicle Details
            </h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-4 sm:space-y-6">
              <p className="text-sm sm:text-base text-gray-700">
                Please mention below the vehicles owned by you which you wish to place on Bus Hire
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900">
                    Sedans & SUVs <span className="font-normal text-gray-500">(4 - 7 seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="sedans"
                    value={formData.sedans}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900">
                    Tempo Travellers <span className="font-normal text-gray-500">(9 - 20 seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="tempoTravellers"
                    value={formData.tempoTravellers}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900">
                    Mini Buses <span className="font-normal text-gray-500">(20 - 30 seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="miniBuses"
                    value={formData.miniBuses}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm sm:text-base font-semibold text-gray-900">
                    Large Buses <span className="font-normal text-gray-500">(40+ seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="largeBuses"
                    value={formData.largeBuses}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                  />
                </div>
              </div>
              {/* Bus Type and Model Dropdowns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Bus Type</label>
                  <CustomDropdown
                    options={busTypeOptions}
                    value={formData.busType}
                    onChange={handleBusTypeSelect}
                    placeholder="Select Bus Type"
                    isOpen={showBusTypeDropdown}
                    onOpen={() => setShowBusTypeDropdown(true)}
                    onClose={() => setShowBusTypeDropdown(false)}
                    className="w-full text-sm sm:text-base"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Bus Model</label>
                  <CustomDropdown
                    options={formData.busType ? busModelOptions[formData.busType] : []}
                    value={formData.busModel}
                    onChange={handleBusModelSelect}
                    placeholder="Select Bus Model"
                    isOpen={showBusModelDropdown}
                    onOpen={() => setShowBusModelDropdown(true)}
                    onClose={() => setShowBusModelDropdown(false)}
                    disabled={!formData.busType}
                    className="w-full text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* GSTIN Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              GSTIN Details
            </h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-4 sm:space-y-6">
              <div className="space-y-4">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Do you have GSTIN?</label>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasGSTIN"
                      value="yes"
                      checked={formData.hasGSTIN === 'yes'}
                      onChange={() => setFormData(prev => ({ ...prev, hasGSTIN: 'yes' }))}
                      className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96]"
                    />
                    <span className="text-sm sm:text-base font-medium">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="hasGSTIN"
                      value="no"
                      checked={formData.hasGSTIN === 'no'}
                      onChange={() => setFormData(prev => ({ ...prev, hasGSTIN: 'no', gstinNumber: '', gstinFile: null }))}
                      className="form-radio h-4 w-4 sm:h-5 sm:w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96]"
                    />
                    <span className="text-sm sm:text-base font-medium">No</span>
                  </label>
                </div>
              </div>
              {formData.hasGSTIN === 'yes' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">GSTIN Number</label>
                    <input
                      type="text"
                      name="gstinNumber"
                      value={formData.gstinNumber}
                      onChange={handleChange}
                      placeholder="Enter your GSTIN number"
                      className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent transition-all duration-300 hover:border-[#3B4B96]/50 text-sm sm:text-base"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">GSTIN Document</label>
                    <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => setFormData(prev => ({ ...prev, gstinFile: e.target.files[0] }))}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium">
                        {formData.gstinFile ? formData.gstinFile.name : '+ Attach GSTIN document'}
                      </span>
                      <span className="text-xs text-gray-500">(image/pdf)</span>
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* KYC Section */}
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              KYC Documents
            </h2>
            <div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-gray-200 space-y-8">
              {/* GST Certificate */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">GST Certificate</label>
                {formData.gstCertificates.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 shadow-sm">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('gstCertificates', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {file ? file.name : '+ Attach GST certificate'}
                      </span>
                    </label>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {formData.gstCertificates.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeFile('gstCertificates', idx)} 
                          className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {idx === formData.gstCertificates.length - 1 && (
                        <button 
                          type="button" 
                          onClick={() => addFile('gstCertificates')} 
                          className="px-4 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] flex items-center gap-2 h-12"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="hidden sm:inline">Add More</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Bank Details */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Bank Details</label>
                {formData.bankDetails.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 shadow-sm">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('bankDetails', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {file ? file.name : '+ Attach bank document'}
                      </span>
                    </label>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {formData.bankDetails.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeFile('bankDetails', idx)} 
                          className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {idx === formData.bankDetails.length - 1 && (
                        <button 
                          type="button" 
                          onClick={() => addFile('bankDetails')} 
                          className="px-4 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] flex items-center gap-2 h-12"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="hidden sm:inline">Add More</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* PAN Card */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">PAN Card</label>
                {formData.panCards.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 shadow-sm">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('panCards', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {file ? file.name : '+ Attach PAN card'}
                      </span>
                    </label>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {formData.panCards.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeFile('panCards', idx)} 
                          className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {idx === formData.panCards.length - 1 && (
                        <button 
                          type="button" 
                          onClick={() => addFile('panCards')} 
                          className="px-4 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] flex items-center gap-2 h-12"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="hidden sm:inline">Add More</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Aadhar Card */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Aadhar Card</label>
                {formData.aadharCards.map((file, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-white border border-gray-200 rounded-lg p-2 sm:p-3 shadow-sm">
                    <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('aadharCards', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                        {file ? file.name : '+ Attach Aadhar card'}
                      </span>
                    </label>
                    <div className="flex gap-2 mt-2 sm:mt-0">
                      {formData.aadharCards.length > 1 && (
                        <button 
                          type="button" 
                          onClick={() => removeFile('aadharCards', idx)} 
                          className="text-red-500 hover:text-red-700 flex items-center justify-center h-12 w-12 border border-red-200 rounded-lg bg-white"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                      {idx === formData.aadharCards.length - 1 && (
                        <button 
                          type="button" 
                          onClick={() => addFile('aadharCards')} 
                          className="px-4 py-2 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] flex items-center gap-2 h-12"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span className="hidden sm:inline">Add More</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Photos */}
              <div className="space-y-2">
                <label className="block text-sm sm:text-base font-semibold text-gray-900">Photos</label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setFormData(prev => ({ ...prev, photo1: e.target.files[0] }))}
                      className="hidden"
                    />
                    <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                      {formData.photo1 ? formData.photo1.name : '+ Attach Photo 1'}
                    </span>
                  </label>
                  <label className="flex-1 flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-3 py-2 h-12 sm:h-12 hover:bg-[#f3f4f6] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setFormData(prev => ({ ...prev, photo2: e.target.files[0] }))}
                      className="hidden"
                    />
                    <span className="text-sm sm:text-base text-[#3B4B96] font-medium truncate">
                      {formData.photo2 ? formData.photo2.name : '+ Attach Photo 2'}
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors duration-300 flex items-center gap-2"
            >
              Submit
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperatorForm;

<style>
{`
@keyframes fade-in {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.8s cubic-bezier(0.4,0,0.2,1) both;
}
`}
</style> 