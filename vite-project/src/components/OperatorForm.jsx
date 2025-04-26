import React, { useState } from 'react';
import CustomDropdown from './CustomDropdown';

const OperatorForm = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [openDropdown, setOpenDropdown] = useState('');
  const [formData, setFormData] = useState({
    // Step 1
    fullName: '',
    mobileNumber: '',
    email: '',
    address: '',
    
    // Step 2
    companyName: '',
    businessType: '',
    gstNumber: '',
    
    // Step 3
    gstCertificate: [],
    bankDetails: {
      accountNumber: '',
      ifscCode: '',
      bankName: '',
      accountHolderName: '',
      documents: []
    },
    panCard: [],
    aadharCard: [],
    photo: []
  });

  const businessTypes = ['Sole Proprietorship', 'Partnership', 'Private Limited', 'Public Limited'];

  const validateStep = (currentStep) => {
    const newErrors = {};
    
    if (currentStep === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (formData.email && !emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
      
      // Mobile validation (10 digits)
      const mobileRegex = /^\d{10}$/;
      if (formData.mobileNumber && !mobileRegex.test(formData.mobileNumber)) {
        newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number';
      }
    }
    
    if (currentStep === 2) {
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.businessType) newErrors.businessType = 'Business type is required';
      if (!formData.gstNumber.trim()) newErrors.gstNumber = 'GST number is required';
    }
    
    if (currentStep === 3) {
      if (!formData.bankDetails.accountNumber) newErrors['bankDetails.accountNumber'] = 'Account number is required';
      if (!formData.bankDetails.ifscCode) newErrors['bankDetails.ifscCode'] = 'IFSC code is required';
      if (!formData.bankDetails.bankName) newErrors['bankDetails.bankName'] = 'Bank name is required';
      if (!formData.bankDetails.accountHolderName) newErrors['bankDetails.accountHolderName'] = 'Account holder name is required';
      if (formData.panCard.length === 0) newErrors.panCard = 'PAN card is required';
      if (formData.aadharCard.length === 0) newErrors.aadharCard = 'Aadhar card is required';
      if (formData.photo.length === 0) newErrors.photo = 'Photo is required';
      
      // IFSC code validation
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
      if (formData.bankDetails.ifscCode && !ifscRegex.test(formData.bankDetails.ifscCode)) {
        newErrors['bankDetails.ifscCode'] = 'Please enter a valid IFSC code';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });

    if (files) {
      setFormData(prev => ({
        ...prev,
        [name]: [...prev[name], ...Array.from(files)]
      }));
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleDropdownChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[name];
      return newErrors;
    });
    setOpenDropdown('');
  };

  const handleFileButtonClick = (inputId) => {
    const input = document.getElementById(inputId);
    if (input) {
      input.click();
    }
  };

  const handleRemoveFile = (field, index) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: prev[parent][child].filter((_, i) => i !== index)
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: prev[field].filter((_, i) => i !== index)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(3)) {
      console.log(formData);
      onClose();
    }
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => setStep(prev => prev - 1);

  const renderError = (fieldName) => {
    return errors[fieldName] && (
      <p className="text-red-500 text-sm mt-1">{errors[fieldName]}</p>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto animate-scaleUp">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[#FF5722] to-[#3B4B96] bg-clip-text text-transparent">
              Operator Registration
            </h2>
            <p className="text-gray-500">Join our network of trusted operators</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center text-sm mb-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FF5722] text-white flex items-center justify-center font-medium">
                {step}
              </span>
              <span className="font-medium text-gray-700">Step {step} of 3</span>
            </div>
            <span className="text-[#FF5722] font-medium">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#FF5722] to-[#3B4B96] rounded-full transition-all duration-500 ease-out"
              style={{ width: `${(step / 3) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 && (
            <div className="animate-fadeIn">
              <div className="bg-gray-50 p-6 rounded-2xl">
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
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                      placeholder="Enter your full name"
                      required
                    />
                    {renderError('fullName')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                      placeholder="Enter your email"
                      required
                    />
                    {renderError('email')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                      placeholder="Enter your phone number"
                      required
                    />
                    {renderError('mobileNumber')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200 resize-none min-h-[100px]"
                      placeholder="Enter your address"
                      required
                    />
                    {renderError('address')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-fadeIn">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="p-1.5 bg-[#3B4B96]/10 rounded-lg">
                    <svg className="w-5 h-5 text-[#3B4B96]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </span>
                  Business Details
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                      placeholder="Enter company name"
                      required
                    />
                    {renderError('companyName')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Business Type *
                    </label>
                    <CustomDropdown
                      options={businessTypes}
                      value={formData.businessType}
                      onChange={(value) => handleDropdownChange('businessType', value)}
                      placeholder="Select business type"
                      isOpen={openDropdown === 'businessType'}
                      onOpen={() => setOpenDropdown('businessType')}
                      onClose={() => setOpenDropdown('')}
                    />
                    {renderError('businessType')}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      GST Number *
                    </label>
                    <input
                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                      placeholder="Enter GST number"
                      required
                    />
                    {renderError('gstNumber')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-fadeIn">
              <div className="bg-gray-50 p-6 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                  <span className="p-1.5 bg-[#FF5722]/10 rounded-lg">
                    <svg className="w-5 h-5 text-[#FF5722]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </span>
                  Document Upload
                </h3>

                <div className="space-y-6">
                  {/* GST Certificate Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      GST Certificate *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="gstCertificate"
                        name="gstCertificate"
                        onChange={handleChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        multiple
                      />
                      <button
                        type="button"
                        onClick={() => handleFileButtonClick('gstCertificate')}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:text-[#FF5722] hover:border-[#FF5722] transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload GST Certificate
                      </button>
                    </div>
                    {formData.gstCertificate.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.gstCertificate.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100">
                            <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile('gstCertificate', index)}
                              className="text-red-500 hover:text-red-700 ml-2 p-1 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {renderError('gstCertificate')}
                  </div>

                  {/* Bank Details Section */}
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Bank Details</h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Account Number *
                      </label>
                      <input
                        type="text"
                        name="bankDetails.accountNumber"
                        value={formData.bankDetails.accountNumber}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                        placeholder="Enter account number"
                        required
                      />
                      {renderError('bankDetails.accountNumber')}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        IFSC Code *
                      </label>
                      <input
                        type="text"
                        name="bankDetails.ifscCode"
                        value={formData.bankDetails.ifscCode}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                        placeholder="Enter IFSC code"
                        required
                      />
                      {renderError('bankDetails.ifscCode')}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Bank Name *
                      </label>
                      <input
                        type="text"
                        name="bankDetails.bankName"
                        value={formData.bankDetails.bankName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                        placeholder="Enter bank name"
                        required
                      />
                      {renderError('bankDetails.bankName')}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Account Holder Name *
                      </label>
                      <input
                        type="text"
                        name="bankDetails.accountHolderName"
                        value={formData.bankDetails.accountHolderName}
                        onChange={handleChange}
                        className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-900 focus:outline-none focus:border-[#FF5722] focus:ring-2 focus:ring-[#FF5722]/10 hover:border-[#FF5722] transition-colors duration-200"
                        placeholder="Enter account holder name"
                        required
                      />
                      {renderError('bankDetails.accountHolderName')}
                    </div>
                  </div>

                  {/* PAN Card Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      PAN Card *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="panCard"
                        name="panCard"
                        onChange={handleChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        multiple
                      />
                      <button
                        type="button"
                        onClick={() => handleFileButtonClick('panCard')}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:text-[#FF5722] hover:border-[#FF5722] transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload PAN Card
                      </button>
                    </div>
                    {formData.panCard.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.panCard.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100">
                            <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile('panCard', index)}
                              className="text-red-500 hover:text-red-700 ml-2 p-1 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {renderError('panCard')}
                  </div>

                  {/* Aadhar Card Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Aadhar Card *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="aadharCard"
                        name="aadharCard"
                        onChange={handleChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png,.pdf"
                        multiple
                      />
                      <button
                        type="button"
                        onClick={() => handleFileButtonClick('aadharCard')}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:text-[#FF5722] hover:border-[#FF5722] transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Aadhar Card
                      </button>
                    </div>
                    {formData.aadharCard.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.aadharCard.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100">
                            <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile('aadharCard', index)}
                              className="text-red-500 hover:text-red-700 ml-2 p-1 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {renderError('aadharCard')}
                  </div>

                  {/* Photo Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Photo *
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        id="photo"
                        name="photo"
                        onChange={handleChange}
                        className="hidden"
                        accept=".jpg,.jpeg,.png"
                        multiple
                      />
                      <button
                        type="button"
                        onClick={() => handleFileButtonClick('photo')}
                        className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-gray-600 hover:text-[#FF5722] hover:border-[#FF5722] transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Upload Photo
                      </button>
                    </div>
                    {formData.photo.length > 0 && (
                      <div className="mt-2 space-y-2">
                        {formData.photo.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-white p-2 rounded-lg border border-gray-100">
                            <span className="text-sm text-gray-600 truncate flex-1">{file.name}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile('photo', index)}
                              className="text-red-500 hover:text-red-700 ml-2 p-1 hover:bg-red-50 rounded-full transition-colors"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {renderError('photo')}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-6 mt-8 border-t border-gray-100">
            {step > 1 && (
              <button
                type="button"
                onClick={prevStep}
                className="px-6 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition-colors duration-200 flex items-center gap-2 group"
              >
                <svg className="w-4 h-4 transition-transform duration-200 transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>
            )}
            {step < 3 ? (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FF5722] to-[#3B4B96] rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 group ml-auto"
              >
                Next
                <svg className="w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-[#FF5722] to-[#3B4B96] rounded-xl hover:opacity-90 transition-opacity duration-200 flex items-center gap-2 group ml-auto"
              >
                Submit
                <svg className="w-4 h-4 transition-transform duration-200 transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </button>
            )}
          </div>
        </form>
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
          .animate-scaleUp {
            animation: scaleUp 0.3s ease-out forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.4s ease-out forwards;
          }
          .overflow-y-auto::-webkit-scrollbar {
            width: 6px;
          }
          .overflow-y-auto::-webkit-scrollbar-track {
            background: transparent;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.5);
            border-radius: 3px;
          }
          .overflow-y-auto::-webkit-scrollbar-thumb:hover {
            background-color: rgba(156, 163, 175, 0.7);
          }
        `}
      </style>
    </div>
  );
};

export default OperatorForm; 