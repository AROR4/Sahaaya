import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  Users, 
  CheckCircle, 
  DollarSign, 
  Heart,
  ArrowLeft,
  Target,
  TrendingUp
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

const CampaignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [donating, setDonating] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [selectedGoal, setSelectedGoal] = useState('');
  const [upiId, setUpiId] = useState('');
  const [showUpi, setShowUpi] = useState(false);

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        setLoading(true);
        const headers = user ? { 
          Authorization: `Bearer ${user.token}` 
        } : {};
        
        const { data } = await axios.get(`http://localhost:5152/api/campaigns/${id}`, { headers });
        setCampaign(data);
      } catch (error) {
        console.error('Failed to fetch campaign:', error);
        alert('Failed to fetch campaign details');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCampaign();
    }
  }, [id, user]);

  const handleJoin = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (campaign.isJoined) {
      return;
    }

    try {
      setJoining(true);
      await axios.post(
        `http://localhost:5152/api/campaigns/${id}/join`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      
      setCampaign(prev => ({
        ...prev,
        isJoined: true,
        participants: [...prev.participants, user]
      }));
      
      alert('Successfully joined the campaign!');
    } catch (error) {
      console.error('Join error:', error);
      alert(error.response?.data?.message || 'Failed to join campaign');
    } finally {
      setJoining(false);
    }
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login');
      return;
    }

    if (!donationAmount || parseFloat(donationAmount) <= 0) {
      alert('Please enter a valid donation amount');
      return;
    }

    if (!upiId) {
      alert('Please enter your UPI ID');
      return;
    }

    try {
      setDonating(true);
      await axios.post(
        `http://localhost:5152/api/campaigns/${id}/donate`,
        {
          amount: parseFloat(donationAmount),
          goalId: selectedGoal || undefined,
          upiId
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        }
      );
      setShowUpi(true);
    } catch (error) {
      console.error('Donate error:', error);
      alert(error.response?.data?.message || 'Failed to record donation');
    } finally {
      setDonating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Campaign not found</h1>
          <button
            onClick={() => navigate('/discover')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Back to Discover
          </button>
        </div>
      </div>
    );
  }

  const progressPercentage = Math.round(
    (campaign.participants.length / campaign.targetParticipants) * 100
  );

  const totalDonated = (campaign.donations || [])
    .filter(d => d.status === 'received')
    .reduce((sum, donation) => sum + donation.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/discover')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Discover
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Campaign Image */}
            <div className="relative mb-6">
              <img
                src={campaign.image_url}
                alt={campaign.title}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  campaign.category === 'Environment' ? 'bg-green-100 text-green-800' :
                  campaign.category === 'Education' ? 'bg-blue-100 text-blue-800' :
                  campaign.category === 'Animal Welfare' ? 'bg-purple-100 text-purple-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {campaign.category}
                </span>
              </div>
            </div>

            {/* Campaign Info */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{campaign.title}</h1>
                {campaign.verified && (
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 ml-4" />
                )}
              </div>

              <p className="text-gray-600 text-lg mb-6">{campaign.description}</p>

              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">About this campaign</h3>
                <p className="text-gray-700 leading-relaxed">{campaign.about}</p>
              </div>
            </div>

            {/* Goals */}
            {campaign.goals && campaign.goals.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                  <Target className="w-5 h-5 mr-2" />
                  Campaign Goals
                </h3>
                <div className="space-y-4">
                  {campaign.goals.map((goal, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{goal.description}</h4>
                        <span className="text-sm text-gray-600">
                          ₹{goal.collectedAmount.toLocaleString()} / ₹{goal.targetAmount.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-600 to-emerald-600 h-2 rounded-full transition-all duration-300"
                          style={{ 
                            width: `${Math.min((goal.collectedAmount / goal.targetAmount) * 100, 100)}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {Math.round((goal.collectedAmount / goal.targetAmount) * 100)}% funded
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Participants */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Participants ({campaign.participants.length})
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {campaign.participants.map((participant, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <img
                      src={participant.picture || '/default-avatar.png'}
                      alt={participant.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{participant.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Campaign Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Stats</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Participants</span>
                  <span className="font-semibold">{campaign.participants.length} / {campaign.targetParticipants}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Donated (received)</span>
                  <span className="font-semibold">₹{totalDonated.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated Budget</span>
                  <span className="font-semibold">₹{campaign.estimatedBudget?.toLocaleString()}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{progressPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-emerald-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Take Action</h3>
              
              {/* Join Button */}
              <button
                onClick={handleJoin}
                disabled={joining || campaign.isJoined}
                className={`w-full mb-4 px-4 py-3 rounded-lg font-medium transition-colors ${
                  campaign.isJoined
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } ${joining ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {joining ? 'Joining...' : campaign.isJoined ? 'Joined ✓' : 'Join Campaign'}
              </button>

              {/* Donate Form */}
              <form onSubmit={handleDonate} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Donation Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1"
                    step="1"
                  />
                </div>

                {campaign.goals && campaign.goals.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select Goal (Optional)
                    </label>
                    <select
                      value={selectedGoal}
                      onChange={(e) => setSelectedGoal(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">General donation</option>
                      {campaign.goals.map((goal, index) => (
                        <option key={index} value={goal._id}>
                          {goal.description}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your UPI ID
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="example@upi"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <button
                  type="submit"
                  disabled={donating}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Proceed to Pay by UPI
                </button>

                {showUpi && (
                  <div className="p-4 border rounded-lg bg-emerald-50 text-emerald-800">
                    <p className="text-sm mb-2">Use any UPI app and pay to:</p>
                    <div className="font-semibold">sahaaya@upi</div>
                    <div className="text-sm mt-2">Amount: ₹{parseFloat(donationAmount).toLocaleString()}</div>
                    <div className="text-sm">Note: Campaign #{campaign._id}</div>
                    <div className="text-xs text-emerald-700 mt-2">Your donation is recorded as pending; admin will mark as received after verification.</div>
                  </div>
                )}
              </form>
            </div>

            {/* Campaign Details */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Details</h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-3" />
                  <span>{campaign.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span>{new Date(campaign.date).toLocaleDateString('en-IN', { 
                    day: 'numeric', 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>
                
                {campaign.contact?.email && (
                  <div className="flex items-center text-gray-600">
                    <span className="w-4 h-4 mr-3">📧</span>
                    <span>{campaign.contact.email}</span>
                  </div>
                )}
                
                {campaign.contact?.phone && (
                  <div className="flex items-center text-gray-600">
                    <span className="w-4 h-4 mr-3">📞</span>
                    <span>{campaign.contact.phone}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
