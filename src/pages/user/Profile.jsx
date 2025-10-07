import React, { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Calendar, 
  DollarSign, 
  Heart, 
  Edit3, 
  CheckCircle,
  Users,
  Target
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    picture: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5152/api/user/profile', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setProfile(data);
        setEditForm({
          name: data.name || '',
          picture: data.picture || ''
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        alert('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
    setEditForm({
      name: profile.name || '',
      picture: profile.picture || ''
    });
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put('http://localhost:5152/api/user/profile', editForm, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });
      
      setProfile(data);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile not found</h1>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            My Profile
          </h1>
          <p className="text-lg text-gray-600">
            Manage your profile and view your campaign activity
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="text-center mb-6">
                <img
                  src={profile.picture || '/default-avatar.png'}
                  alt={profile.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
                <p className="text-gray-600">{profile.email}</p>
                {profile.isGovtIdVerified && (
                  <div className="flex items-center justify-center mt-2 text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-sm">Verified</span>
                  </div>
                )}
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-4 h-4 mr-3" />
                  <span>{profile.email}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-3" />
                  <span>Joined {new Date(profile.createdAt).toLocaleDateString('en-IN', { 
                    month: 'long', 
                    year: 'numeric' 
                  })}</span>
                </div>

                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-4 h-4 mr-3" />
                  <span>Total Donated: ₹{profile.totalDonated?.toLocaleString() || 0}</span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={editing ? handleSave : handleEdit}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  {editing ? 'Save Changes' : 'Edit Profile'}
                </button>
                
                {editing && (
                  <button
                    onClick={handleCancel}
                    className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                )}

                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Campaign Activity */}
          <div className="lg:col-span-2 space-y-6">
            {/* Edit Form */}
            {editing && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Edit Profile</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Profile Picture URL
                    </label>
                    <input
                      type="url"
                      value={editForm.picture}
                      onChange={(e) => setEditForm({ ...editForm, picture: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Created Campaigns */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Created Campaigns ({profile.createdCampaigns?.length || 0})
              </h3>
              
              {profile.createdCampaigns && profile.createdCampaigns.length > 0 ? (
                <div className="space-y-4">
                  {profile.createdCampaigns.map((campaign) => (
                    <div key={campaign._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{campaign.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              campaign.status === 'approved' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {campaign.status}
                            </span>
                            <span>{campaign.category}</span>
                            <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/campaign/${campaign._id}`)}
                          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No campaigns created yet</p>
                  <button
                    onClick={() => navigate('/create')}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Create Your First Campaign
                  </button>
                </div>
              )}
            </div>

            {/* Joined Campaigns */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Joined Campaigns ({profile.joinedCampaigns?.length || 0})
              </h3>
              
              {profile.joinedCampaigns && profile.joinedCampaigns.length > 0 ? (
                <div className="space-y-4">
                  {profile.joinedCampaigns.map((campaign) => (
                    <div key={campaign._id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{campaign.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{campaign.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              campaign.status === 'approved' ? 'bg-green-100 text-green-800' :
                              campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {campaign.status}
                            </span>
                            <span>{campaign.category}</span>
                            <span>{new Date(campaign.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => navigate(`/campaign/${campaign._id}`)}
                          className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          View
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No campaigns joined yet</p>
                  <button
                    onClick={() => navigate('/discover')}
                    className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Discover Campaigns
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
