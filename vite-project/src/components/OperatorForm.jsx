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
    bankDetails: null,
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
      <div className="fixed top-0 left-0 right-0 z-50 bg-[#3B4B96] text-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="py-6">
            <h1 className="text-2xl sm:text-3xl font-bold">Bus Operator Registration Form</h1>
            <p className="mt-2 text-white/80">Please share the following details for us to onboard you.</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-32 pb-8 mb-12">
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
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Operator Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Enter company name"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Emails */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Addresses</label>
              {formData.emails.map((emails, index) => (
                <div key={index} className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <input
                      type="email"
                      value={emails.email}
                      onChange={e => handleEmailChange(index, 'email', e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      value={emails.alternate}
                      onChange={e => handleEmailChange(index, 'alternate', e.target.value)}
                      placeholder="Enter alternate email address"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                    />
                  </div>
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addEmail}
                      className="px-3 py-2.5 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeEmail(index)}
                      className="px-3 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Phone Numbers */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Contact Numbers</label>
              {formData.phoneNumbers.map((phones, index) => (
                <div key={index} className="flex gap-4 mb-3">
                  <div className="flex-1">
                    <input
                      type="tel"
                      value={phones.primary}
                      onChange={(e) => handlePhoneChange(index, 'primary', e.target.value)}
                      placeholder="Enter primary number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      value={phones.alternate}
                      onChange={(e) => handlePhoneChange(index, 'alternate', e.target.value)}
                      placeholder="Enter alternate number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                      required
                    />
                  </div>
                  {index === 0 ? (
                    <button
                      type="button"
                      onClick={addPhoneNumber}
                      className="px-3 py-2.5 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removePhoneNumber(index)}
                      className="px-3 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
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
          </div>

          {/* Vehicle Details Section */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Details</h2>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6">
              <p className="text-gray-700 mb-6">
                Please mention below the vehicles owned by you which you wish to place on Bus Hire
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-1">
                    Sedans & SUVs <span className="font-normal text-gray-500">(4 - 7 seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="sedans"
                    value={formData.sedans}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-lg"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-1">
                    Tempo Travellers <span className="font-normal text-gray-500">(9 - 20 seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="tempoTravellers"
                    value={formData.tempoTravellers}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-lg"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-1">
                    Mini Buses <span className="font-normal text-gray-500">(20 - 30 seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="miniBuses"
                    value={formData.miniBuses}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-lg"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-gray-900 mb-1">
                    Large Buses <span className="font-normal text-gray-500">(40+ seaters)</span>
                  </label>
                  <input
                    type="number"
                    name="largeBuses"
                    value={formData.largeBuses}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent text-lg"
                  />
                </div>
              </div>
              {/* Bus Type and Model Dropdowns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bus Type</label>
                  <CustomDropdown
                    options={busTypeOptions}
                    value={formData.busType}
                    onChange={handleBusTypeSelect}
                    placeholder="Select Bus Type"
                    isOpen={showBusTypeDropdown}
                    onOpen={() => setShowBusTypeDropdown(true)}
                    onClose={() => setShowBusTypeDropdown(false)}
                  />
                </div>
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bus Model</label>
                  <CustomDropdown
                    options={formData.busType ? busModelOptions[formData.busType] : []}
                    value={formData.busModel}
                    onChange={handleBusModelSelect}
                    placeholder="Select Bus Model"
                    isOpen={showBusModelDropdown}
                    onOpen={() => setShowBusModelDropdown(true)}
                    onClose={() => setShowBusModelDropdown(false)}
                    disabled={!formData.busType}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* GSTIN Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-6 mt-8">
            <label className="block text-base font-semibold text-gray-900 mb-2">Do you have GSTIN?</label>
            <div className="flex items-center gap-6 mb-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasGSTIN"
                  value="yes"
                  checked={formData.hasGSTIN === 'yes'}
                  onChange={() => setFormData(prev => ({ ...prev, hasGSTIN: 'yes' }))}
                  className="form-radio h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96]"
                />
                <span className="text-lg font-medium">Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="hasGSTIN"
                  value="no"
                  checked={formData.hasGSTIN === 'no'}
                  onChange={() => setFormData(prev => ({ ...prev, hasGSTIN: 'no', gstinNumber: '', gstinFile: null }))}
                  className="form-radio h-5 w-5 text-[#3B4B96] border-gray-300 focus:ring-[#3B4B96]"
                />
                <span className="text-lg font-medium">No</span>
              </label>
            </div>
            {formData.hasGSTIN === 'yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Enter GSTIN Number</label>
                  <input
                    type="text"
                    name="gstinNumber"
                    value={formData.gstinNumber}
                    onChange={handleChange}
                    placeholder="Enter your GSTIN number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3B4B96] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">&nbsp;</label>
                  <label className="flex items-center gap-3 cursor-pointer border border-[#3B4B96] rounded-lg px-4 py-2.5 hover:bg-[#f3f4f6] transition-colors">
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={e => setFormData(prev => ({ ...prev, gstinFile: e.target.files[0] }))}
                      className="hidden"
                    />
                    <span className="text-[#3B4B96] font-medium">+ attach GSTIN document</span>
                    <span className="text-xs text-gray-500">Format:image/pdf</span>
                  </label>
                  {formData.gstinFile && (
                    <div className="mt-2 text-xs text-gray-600">Selected: {formData.gstinFile.name}</div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* KYC Section */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 space-y-8 mt-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">KYC Documents</h2>
            {/* GST Certificate */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">GST Certificate</label>
              <div className="flex flex-wrap gap-4 items-center">
                {formData.gstCertificates.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-4 py-2.5 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('gstCertificates', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-[#3B4B96] font-medium">{file ? file.name : '+ attach GST certificate'}</span>
                    </label>
                    {formData.gstCertificates.length > 1 && (
                      <button type="button" onClick={() => removeFile('gstCertificates', idx)} className="text-red-500 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addFile('gstCertificates')} className="px-3 py-2.5 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
            </div>
            {/* Bank Details */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Bank Details</label>
              <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-4 py-2.5 hover:bg-[#f3f4f6] transition-colors w-fit">
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={e => setFormData(prev => ({ ...prev, bankDetails: e.target.files[0] }))}
                  className="hidden"
                />
                <span className="text-[#3B4B96] font-medium">{formData.bankDetails ? formData.bankDetails.name : '+ attach bank document'}</span>
              </label>
            </div>
            {/* PAN Card */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">PAN Card</label>
              <div className="flex flex-wrap gap-4 items-center">
                {formData.panCards.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-4 py-2.5 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('panCards', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-[#3B4B96] font-medium">{file ? file.name : '+ attach PAN card'}</span>
                    </label>
                    {formData.panCards.length > 1 && (
                      <button type="button" onClick={() => removeFile('panCards', idx)} className="text-red-500 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addFile('panCards')} className="px-3 py-2.5 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
            </div>
            {/* Aadhar Card */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Aadhar Card</label>
              <div className="flex flex-wrap gap-4 items-center">
                {formData.aadharCards.map((file, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-4 py-2.5 hover:bg-[#f3f4f6] transition-colors">
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        onChange={e => handleFileChange('aadharCards', idx, e.target.files[0])}
                        className="hidden"
                      />
                      <span className="text-[#3B4B96] font-medium">{file ? file.name : '+ attach Aadhar card'}</span>
                    </label>
                    {formData.aadharCards.length > 1 && (
                      <button type="button" onClick={() => removeFile('aadharCards', idx)} className="text-red-500 hover:text-red-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={() => addFile('aadharCards')} className="px-3 py-2.5 bg-[#3B4B96] text-white rounded-lg hover:bg-[#2C3A7D] transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                </button>
              </div>
            </div>
            {/* Photos */}
            <div>
              <label className="block text-base font-semibold text-gray-900 mb-2">Photos</label>
              <div className="flex flex-wrap gap-4 items-center">
                <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-4 py-2.5 hover:bg-[#f3f4f6] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setFormData(prev => ({ ...prev, photo1: e.target.files[0] }))}
                    className="hidden"
                  />
                  <span className="text-[#3B4B96] font-medium">{formData.photo1 ? formData.photo1.name : '+ attach Photo 1'}</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer border border-[#3B4B96] rounded-lg px-4 py-2.5 hover:bg-[#f3f4f6] transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setFormData(prev => ({ ...prev, photo2: e.target.files[0] }))}
                    className="hidden"
                  />
                  <span className="text-[#3B4B96] font-medium">{formData.photo2 ? formData.photo2.name : '+ attach Photo 2'}</span>
                </label>
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