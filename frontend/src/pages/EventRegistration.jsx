import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PaymentQR from '../assets/payment-qr.png';

const EventRegistration = () => {
  const [formData, setFormData] = useState({
    action: 'register_event', // Important: Tells script this is an event!
    Name: '',
    Institute: '',
    Designation: 'PG student',
    City: '',
    Mobile: '',
    Email: '',
    IsMember: 'No',
    RegType: 'Only Workshop 27 Feb 2026',
    PaymentMode: 'UPI',
    TransactionID: '',
    TransactionDate: '',
    screenshot: null
  });

  const [status, setStatus] = useState(null);
  const [errors, setErrors] = useState({}); // State for Validation Errors

  // UPDATE THIS WITH YOUR GOOGLE SCRIPT URL
  const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzxqhFFViFMnIy3bSgS3TOUCKj9Pn2L4q1TAw-8wr_wXEwFpq0fn8Kcx4VqQu9WV83/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size
      if (file.size > 10 * 1024 * 1024) { // 10MB Limit
        setErrors({ ...errors, screenshot: "File size must be less than 10MB" });
        e.target.value = ''; // Clear the input
        return;
      }
      
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        setErrors({ ...errors, screenshot: "Only image files (JPG, PNG, GIF) or PDF are allowed" });
        e.target.value = ''; // Clear the input
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, screenshot: { data: reader.result, type: file.type } });
        if (errors.screenshot) setErrors({ ...errors, screenshot: null });
      };
      reader.onerror = () => {
        setErrors({ ...errors, screenshot: "Error reading file. Please try again." });
      };
      reader.readAsDataURL(file);
    }
  };

  // --- VALIDATION FUNCTION ---
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Name validation - must contain only letters, spaces, and common name characters
    if (!formData.Name.trim()) { 
      tempErrors.Name = "Name is required"; 
      isValid = false; 
    } else if (formData.Name.trim().length < 3) {
      tempErrors.Name = "Name must be at least 3 characters";
      isValid = false;
    } else if (!/^[a-zA-Z\s.'-]+$/.test(formData.Name)) {
      tempErrors.Name = "Name can only contain letters, spaces, and basic punctuation";
      isValid = false;
    }

    // Institute validation
    if (!formData.Institute.trim()) { 
      tempErrors.Institute = "Institute is required"; 
      isValid = false; 
    } else if (formData.Institute.trim().length < 3) {
      tempErrors.Institute = "Institute name must be at least 3 characters";
      isValid = false;
    }

    // City validation
    if (!formData.City.trim()) { 
      tempErrors.City = "City is required"; 
      isValid = false; 
    } else if (formData.City.trim().length < 2) {
      tempErrors.City = "City name must be at least 2 characters";
      isValid = false;
    } else if (!/^[a-zA-Z\s.-]+$/.test(formData.City)) {
      tempErrors.City = "City name can only contain letters and basic punctuation";
      isValid = false;
    }
    
    // Mobile validation - must be exactly 10 digits
    if (!formData.Mobile.trim()) {
      tempErrors.Mobile = "Mobile number is required";
      isValid = false;
    } else {
      const cleanMobile = formData.Mobile.replace(/\D/g, '');
      if (cleanMobile.length !== 10) {
        tempErrors.Mobile = "Mobile number must be exactly 10 digits";
        isValid = false;
      } else if (!/^[6-9]/.test(cleanMobile)) {
        tempErrors.Mobile = "Invalid mobile number (must start with 6-9)";
        isValid = false;
      }
    }

    // Email validation
    if (!formData.Email.trim()) {
      tempErrors.Email = "Email is required";
      isValid = false;
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.Email)) {
      tempErrors.Email = "Please enter a valid email address";
      isValid = false;
    }

    // Transaction ID validation - must not be just numbers or too short
    if (!formData.TransactionID.trim()) { 
      tempErrors.TransactionID = "Transaction ID is required"; 
      isValid = false; 
    } else if (formData.TransactionID.trim().length < 6) {
      tempErrors.TransactionID = "Transaction ID must be at least 6 characters";
      isValid = false;
    } else if (!/[a-zA-Z0-9]/.test(formData.TransactionID)) {
      tempErrors.TransactionID = "Please enter a valid transaction ID";
      isValid = false;
    }

    // Transaction Date validation - cannot be future date
    if (!formData.TransactionDate) { 
      tempErrors.TransactionDate = "Transaction date is required"; 
      isValid = false; 
    } else {
      const selectedDate = new Date(formData.TransactionDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate > today) {
        tempErrors.TransactionDate = "Transaction date cannot be in the future";
        isValid = false;
      }
      
      // Check if date is too old (more than 1 year)
      const oneYearAgo = new Date();
      oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
      if (selectedDate < oneYearAgo) {
        tempErrors.TransactionDate = "Transaction date seems too old (more than 1 year)";
        isValid = false;
      }
    }
    
    // Screenshot validation
    if (!formData.screenshot) {
      tempErrors.screenshot = "Payment screenshot is required";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('submitting');

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setStatus('success');
      // Reset form (optional)
    } catch (error) {
      console.error("Error:", error);
      setStatus('error');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
      className="container mx-auto px-4 py-12"
    >
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden">
        
        <div className="bg-secondary text-primary p-8 text-center">
          <h1 className="text-3xl font-bold font-display">1st Annual CME Registration</h1>
          <p className="mt-2 font-semibold">SGIHPBPs of India | Feb 27-28, 2026 | GB Pant Hospital GIPMER, New Delhi</p>
        </div>

        <div className="grid lg:grid-cols-3">
          
          {/* LEFT SIDE: Payment Details */}
          <div className="lg:col-span-1 p-8 bg-gray-50 dark:bg-gray-700 border-r border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-bold text-primary dark:text-white mb-6 flex items-center">
              <span className="material-symbols-outlined mr-2">payments</span>
              Registration Fees
            </h3>
            
            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300 mb-6">
              <div className="p-4 bg-white dark:bg-gray-600 rounded border border-gray-200 dark:border-gray-500">
                 <p className="font-bold text-primary dark:text-white mb-2">Early Bird (Till 31 Dec 2025)</p>
                 <ul className="space-y-1">
                   <li><strong>Workshop Only:</strong> ₹2000 (For Members) / ₹2500 (Non-Members)</li>
                   <li><strong>CME Only:</strong> ₹2000 (For Members) / ₹2500 (Non-Members)</li>
                   <li><strong>Both:</strong> ₹3500 (For Members) / ₹4000 (Non-Members)</li>
                 </ul>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-600 p-5 rounded-lg shadow-sm border border-gray-200 dark:border-gray-500 text-center">
               <p className="font-bold text-left mb-2">Bank Transfer</p>
               <p className="text-xs text-left mb-4">
                 Account: SGIHPBPs<br/>
                 Bank: Bank of Baroda<br/>
                 A/c No: 26020100024967<br/>
                 IFSC: BARB0RAMEEL (5th is Zero)
               </p>
               
               <img src={PaymentQR} className="w-32 h-32 mx-auto border rounded mb-2"/>
               <p className="text-xs">Scan to Pay</p>
            </div>
          </div>

          {/* RIGHT SIDE: Form */}
          <div className="lg:col-span-2 p-8">
            {status === 'success' ? (
              <div className="text-center py-12">
                <span className="material-symbols-outlined text-6xl text-green-500 mb-4">check_circle</span>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Registration Submitted!</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Thank you for registering for the Annual CME. We have received your details and payment screenshot.
                </p>
                <button onClick={() => window.location.reload()} className="mt-8 bg-secondary text-primary px-6 py-2 rounded font-bold">
                  Register Another Person
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-bold text-primary dark:text-white border-b pb-2">Details</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Full Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="Name" 
                          value={formData.Name} 
                          onChange={handleChange} 
                          className={`form-input ${errors.Name ? 'border-red-500' : ''}`} 
                          maxLength="100"
                          placeholder="Enter your full name"
                        />
                        {errors.Name && <p className="text-red-500 text-xs mt-1">{errors.Name}</p>}
                    </div>
                    <div>
                        <label className="form-label">Designation <span className="text-red-500">*</span></label>
                        <select name="Designation" value={formData.Designation} onChange={handleChange} className="form-input">
                            <option>PG student</option>
                            <option>Senior Resident / Fellow</option>
                            <option>Consultant/ Faculty</option>
                        </select>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                     <div>
                        <label className="form-label">Institute Name <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="Institute" 
                          value={formData.Institute} 
                          onChange={handleChange} 
                          className={`form-input ${errors.Institute ? 'border-red-500' : ''}`} 
                          maxLength="200"
                          placeholder="Your institution name"
                        />
                        {errors.Institute && <p className="text-red-500 text-xs mt-1">{errors.Institute}</p>}
                    </div>
                    <div>
                        <label className="form-label">City <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="City" 
                          value={formData.City} 
                          onChange={handleChange} 
                          className={`form-input ${errors.City ? 'border-red-500' : ''}`} 
                          maxLength="100"
                          placeholder="Your city"
                        />
                        {errors.City && <p className="text-red-500 text-xs mt-1">{errors.City}</p>}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Mobile Number <span className="text-red-500">*</span></label>
                        <input 
                          type="tel" 
                          name="Mobile" 
                          value={formData.Mobile} 
                          onChange={handleChange} 
                          className={`form-input ${errors.Mobile ? 'border-red-500' : ''}`} 
                          maxLength="15"
                          placeholder="10-digit mobile number"
                          pattern="[0-9]*"
                        />
                        {errors.Mobile && <p className="text-red-500 text-xs mt-1">{errors.Mobile}</p>}
                    </div>
                    <div>
                        <label className="form-label">Email ID <span className="text-red-500">*</span></label>
                        <input 
                          type="email" 
                          name="Email" 
                          value={formData.Email} 
                          onChange={handleChange} 
                          className={`form-input ${errors.Email ? 'border-red-500' : ''}`} 
                          maxLength="100"
                          placeholder="your.email@example.com"
                        />
                        {errors.Email && <p className="text-red-500 text-xs mt-1">{errors.Email}</p>}
                    </div>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                    <label className="form-label mb-2">Are you a Member of SGIHPBPs? <span className="text-red-500">*</span></label>
                    <div className="flex gap-6">
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="IsMember" value="Yes" checked={formData.IsMember === 'Yes'} onChange={handleChange} className="mr-2" /> Yes
                        </label>
                        <label className="flex items-center cursor-pointer">
                            <input type="radio" name="IsMember" value="No" checked={formData.IsMember === 'No'} onChange={handleChange} className="mr-2" /> No
                        </label>
                    </div>
                </div>

                <div>
                    <label className="form-label">Registration Category (Early Bird) <span className="text-red-500">*</span></label>
                    <select name="RegType" value={formData.RegType} onChange={handleChange} className="form-input bg-yellow-50 dark:bg-gray-800 border-yellow-200">
                        <option value="Only Workshop 27 Feb 2026">Only Workshop 27 Feb (2000 For Members / 2500 Non-Members)</option>
                        <option value="Only CME 28 Feb 2026">Only CME 28 Feb (2000 For Members / 2500 Non-Members)</option>
                        <option value="Both Workshop+CME">Both Workshop+CME (3500 For Members / 4000 Non-Members)</option>
                    </select>
                </div>

                <h3 className="text-xl font-bold text-primary dark:text-white border-b pb-2 mt-8">Payment Details</h3>

                <div className="grid md:grid-cols-2 gap-6">
                    <div>
                        <label className="form-label">Transaction ID <span className="text-red-500">*</span></label>
                        <input 
                          type="text" 
                          name="TransactionID" 
                          value={formData.TransactionID} 
                          onChange={handleChange} 
                          className={`form-input ${errors.TransactionID ? 'border-red-500' : ''}`} 
                          placeholder="UPI Ref / UTR No." 
                          maxLength="50"
                        />
                        {errors.TransactionID && <p className="text-red-500 text-xs mt-1">{errors.TransactionID}</p>}
                    </div>
                    <div>
                        <label className="form-label">Transaction Date <span className="text-red-500">*</span></label>
                        <input 
                          type="date" 
                          name="TransactionDate" 
                          value={formData.TransactionDate} 
                          onChange={handleChange} 
                          className={`form-input ${errors.TransactionDate ? 'border-red-500' : ''}`} 
                          max={new Date().toISOString().split('T')[0]}
                        />
                        {errors.TransactionDate && <p className="text-red-500 text-xs mt-1">{errors.TransactionDate}</p>}
                    </div>
                </div>

                <div>
                    <label className="form-label">Transaction Screenshot (Max 10MB) <span className="text-red-500">*</span></label>
                    <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-secondary file:text-primary hover:file:bg-yellow-500"/>
                    {errors.screenshot && <p className="text-red-500 text-xs mt-1">{errors.screenshot}</p>}
                </div>

                <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="w-full bg-primary text-white font-bold py-4 rounded-lg hover:bg-blue-900 transition-colors shadow-lg disabled:opacity-50 text-lg mt-4"
                >
                  {status === 'submitting' ? 'Submitting Registration...' : 'Submit Registration'}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
      <style>{`
        .form-label { display: block; font-size: 0.875rem; font-weight: 600; color: #4B5563; margin-bottom: 0.25rem; }
        .dark .form-label { color: #D1D5DB; }
        .form-input { width: 100%; padding: 0.5rem 1rem; border-radius: 0.375rem; border: 1px solid #D1D5DB; background-color: white; color: #111827; }
        .dark .form-input { background-color: #374151; border-color: #4B5563; color: white; }
      `}</style>
    </motion.div>
  );
};

export default EventRegistration;