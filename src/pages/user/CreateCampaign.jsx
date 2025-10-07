import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { isLoggedIn,getUser } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { uploadFile } from '../../utils/upload';

import { Upload, AlertCircle, CheckCircle, Calendar, MapPin, Type, Image, Tag } from 'lucide-react';

const CreateCampaign = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [idVerified, setIdVerified] = useState(false);
  const [idFile, setIdFile] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
  title: '',
  description: '',
  about: '',
  category: '',
  location: '',
  date: '',
  targetParticipants: '',
  estimatedBudget: '',
  phone: '',
  email: '',
  image: null,
  isNgoAffiliated: false,
  ngoName: '',            // <- make sure these are initialized
  ngoLocation: '',
  documents: [],          // <- and this is an empty array
});


  const handleDocumentUpload = (e) => {
  const files = Array.from(e.target.files);
  setFormData((prev) => ({
    ...prev,
    documents: files
  }));
};


  const categories = [
    'Environment',
    'Education',
    'Animal Welfare',
    'Healthcare',
    'Community Development',
    'Disaster Relief'
  ];

   useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return ;
    }
    const userData = getUser();
    if (userData) {
      setUser(userData);

    }
  
    if (userData.isGovtIdVerified === true) {
      setIdVerified(true);
      setCurrentStep(2); 
    }

  }, [navigate]);

  

useEffect(() => {
  if (user) {
    console.log("User is now available:", user);
  }
}, [user]);


const handleIdUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  setIdFile(file);
  setIsVerifying(true);

  try {
    const token = user?.token; // Ensure you have the token from user data
    if (!token) throw new Error('Token not available');
    const govtIdUrl = await uploadFile(file, token);

    const verifyRes = await axios.put(
      'http://localhost:5152/api/user/verify-id',
      { govtIdUrl },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsVerifying(false);
    setIdVerified(true);
  } catch (error) {
    console.error('ID verification failed:', error.message);
    setIsVerifying(false);
    alert('Failed to verify ID. Please try again.');
  }
};

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = user?.token;
    if (!token) throw new Error("User token not found.");

    // 1. Upload campaign image
    let imageUrl = '';
    if (formData.image) {
      imageUrl = await uploadFile(formData.image, token); // handles single image upload
    }

    // 2. Upload supporting documents (if any)
    let uploadedDocumentUrls = [];
    if (formData.documents?.length > 0) {
      const docUploadPromises = formData.documents.map((file) => uploadFile(file, token));
      uploadedDocumentUrls = await Promise.all(docUploadPromises);
    }

    // 3. Prepare payload
    const payload = {
      title: formData.title,
      description: formData.description,
      about: formData.about,
      category: formData.category,
      location: formData.location,
      date: formData.date,
      image_url: imageUrl,
      estimatedBudget: formData.estimatedBudget,
      targetParticipants: formData.targetParticipants,
      contact: {
        phone: formData.phone,
        email: formData.email,
      },
      documents: uploadedDocumentUrls,
      isNgoAffiliated: formData.isNgoAffiliated,
      ngoDetails: formData.isNgoAffiliated
        ? {
            name: formData.ngoName || '',
            location: formData.ngoLocation || '',
          }
        : {},
    };

    // 4. Send to backend
    const response = await axios.post('http://localhost:5152/api/campaigns', payload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 201) {
      alert('Campaign created successfully!');
      // optionally: resetForm(), navigate, etc.
    }
  } catch (error) {
    console.error('Campaign submission failed:', error);
    alert('Failed to create campaign. Please try again.');
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Create Campaign
          </h1>
          <p className="text-lg text-gray-600">
            Start your own social impact initiative and mobilize your community
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center">
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              1
            </div>
            <div className={`flex-1 h-1 mx-4 ${
              currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'
            }`}></div>
            <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
              currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'
            }`}>
              2
            </div>
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-sm text-gray-600">ID Verification</span>
            <span className="text-sm text-gray-600">Campaign Details</span>
          </div>
        </div>

        {/* Step 1: ID Verification */}
        {currentStep === 1 && (
          <div className="bg-white rounded-xl shadow-sm p-8">
            <div className="text-center mb-8">
              <Upload className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Identity</h2>
              <p className="text-gray-600">
                Upload a government-issued ID to verify your identity and create trusted campaigns
              </p>
            </div>

            {!idVerified ? (
              <div className="max-w-md mx-auto">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    name="govtId"
                    accept="image/*"
                    onChange={handleIdUpload}
                    className="hidden"
                    id="id-upload"
                  />
                  <label htmlFor="id-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium text-gray-900 mb-2">
                      Upload Government ID
                    </p>
                    <p className="text-sm text-gray-600">
                      Aadhaar Card, PAN Card, or Driver's License
                    </p>
                  </label>
                </div>

                {isVerifying && (
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mr-3"></div>
                      <span className="text-blue-800">Verifying your ID...</span>
                    </div>
                  </div>
                )}

                <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                    <div className="text-sm text-yellow-800">
                      <p className="font-medium mb-1">Why do we need ID verification?</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>Ensures campaign authenticity</li>
                        <li>Protects community trust</li>
                        <li>Prevents fraudulent activities</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="p-6 bg-green-50 rounded-lg text-center">
                  <CheckCircle className="w-12 h-12 mx-auto mb-4 text-green-600" />
                  <h3 className="text-lg font-semibold text-green-900 mb-2">ID Verified Successfully!</h3>
                  <p className="text-green-700">Your identity has been verified. You can now create campaigns.</p>
                </div>
                
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                >
                  Continue to Campaign Details
                </button>
              </div>
            )}
          </div>
        )}

        {currentStep === 2 && (
  <div className="bg-white rounded-xl shadow-sm p-8">
    <div className="mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Campaign Details</h2>
      <p className="text-gray-600">Fill in the details about your campaign</p>
    </div>

    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Campaign Title *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Description */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Description *</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* About */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">About *</label>
        <textarea
          name="about"
          value={formData.about}
          onChange={handleInputChange}
          required
          rows={5}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Category & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Category *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          >
            <option value="">Select category</option>
            {['Environment', 'Education', 'Animal Welfare', 'Healthcare', 'Other'].map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Date */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-2 block">Campaign Date *</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg"
        />
      </div>

      {/* Target Participants & Budget */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Target Participants *</label>
          <input
            type="number"
            name="targetParticipants"
            value={formData.targetParticipants}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Estimated Budget (INR) *</label>
          <input
            type="number"
            name="estimatedBudget"
            value={formData.estimatedBudget}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg"
          />
        </div>
      </div>

      {/* Image Upload */}
     {/* Campaign Image Upload */}
<div className="mb-6">
  <label className="block text-sm font-medium text-gray-700 mb-2">Campaign Image</label>

  <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
    <input
      type="file"
      accept="image/*"
      id="image-upload"
      onChange={handleImageUpload}
      className="hidden"
    />

    <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center justify-center">
      <svg
        className="w-10 h-10 mb-2 text-blue-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8m6 4a4 4 0 10-8 0 4 4 0 008 0z" />
      </svg>
      <p className="text-gray-600 text-sm">
        Click to upload image <br />(Accepted: JPG, PNG)
      </p>
    </label>
  </div>

  {formData.image && (
    <p className="mt-2 text-sm text-green-600 font-medium">{formData.image.name}</p>
  )}
</div>

{/* NGO Affiliation */}
      <div>
        <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
          <input
            type="checkbox"
            name="isNgoAffiliated"
            checked={formData.isNgoAffiliated}
            onChange={(e) =>
              setFormData({ ...formData, isNgoAffiliated: e.target.checked })
            }
          />
          Is this campaign affiliated with an NGO?
        </label>
      </div>

      {/* NGO Details if checked */}
      {formData.isNgoAffiliated && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 block">NGO Name</label>
            <input
              type="text"
              name="ngoName"
              value={formData.ngoName}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 block">NGO Location</label>
            <input
              type="text"
              name="ngoLocation"
              value={formData.ngoLocation}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      )}

{/* Supporting Documents Upload */}
<div className="mb-6">
   <label className="block text-sm font-medium text-gray-700 mb-1">
    Supporting Documents
  </label>

  <p className="text-xs text-gray-500 mb-2">
    <span className="font-medium text-red-600">*</span> If you are affiliated with an NGO, uploading NGO-related documents (like registration certificate, NGO ID card, etc.) is mandatory for verification.
  </p>

  <div className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
    <input
      type="file"
      accept="application/pdf,image/*"
      multiple
      id="document-upload"
      onChange={handleDocumentUpload}
      className="hidden"
    />

    <label htmlFor="document-upload" className="cursor-pointer flex flex-col items-center justify-center">
      <svg
        className="w-10 h-10 mb-2 text-purple-500"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0 0V8m0 4h4m-4 0H8m6 4a4 4 0 10-8 0 4 4 0 008 0z" />
      </svg>
      <p className="text-gray-600 text-sm">
        Upload multiple supporting documents <br />(PDFs, images)
      </p>
    </label>
  </div>

  {formData.documents?.length > 0 && (
    <ul className="mt-3 list-disc list-inside text-sm text-gray-700">
      {formData.documents.map((file, idx) => (
        <li key={idx}>{file.name}</li>
      ))}
    </ul>
  )}
</div>
      

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold"
      >
        Create Campaign
      </button>
    </form>
  </div>
)}


      </div>
    </div>
  );
};

export default CreateCampaign;