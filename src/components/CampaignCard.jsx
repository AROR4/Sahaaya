import React, { useState } from 'react';
import { MapPin, Calendar, Users, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CampaignCard = ({ campaign, featured = false, currentUser }) => {
  const navigate = useNavigate();

  if (!campaign || !Array.isArray(campaign.participants) || typeof campaign.targetParticipants !== 'number') {
    return <div className="p-4 text-red-500">Invalid Campaign Data</div>;
  }

  const progressPercentage = Math.round((campaign.participants.length / campaign.targetParticipants) * 100);
  const creatorName = campaign.creator?.name || campaign.creator?.email || 'Unknown';
  const isAdmin = currentUser?.role === 'admin';

  const handleCardClick = () => navigate(`/campaign/${campaign._id}`);
  const handleCreatorClick = (e) => {
    e.stopPropagation();
    if (isAdmin) navigate('/admin');
  };

  return (
    <div 
      className={`bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-pointer ${featured ? 'ring-2 ring-blue-500' : ''}`}
      onClick={handleCardClick}
    >
      {featured && (
        <div className="bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-4 py-2 text-sm font-medium">⭐ Featured Campaign</div>
      )}

      <div className="relative">
        <img src={campaign.image_url} alt={campaign.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            campaign.category === 'Environment' ? 'bg-green-100 text-green-800' :
            campaign.category === 'Education' ? 'bg-blue-100 text-blue-800' :
            campaign.category === 'Animal Welfare' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>{campaign.category}</span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">{campaign.title}</h3>
          {campaign.verified && <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 ml-2" />}
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{campaign.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500"><MapPin className="w-4 h-4 mr-2" /><span>{campaign.location}</span></div>
          <div className="flex items-center text-sm text-gray-500"><Calendar className="w-4 h-4 mr-2" /><span>{new Date(campaign.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span></div>
          <div className="flex items-center text-sm text-gray-500"><Users className="w-4 h-4 mr-2" /><span>{campaign.participants.length} / {campaign.targetParticipants} participants</span></div>
        </div>

        <div className="flex items-center justify-between">
          <button onClick={handleCreatorClick} className={`text-sm ${isAdmin ? 'text-blue-600 hover:underline' : 'text-gray-500'}`} title={isAdmin ? 'Go to Admin' : ''}>
            by {creatorName}
          </button>
          <button onClick={handleCardClick} className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-600 hover:bg-blue-700 text-white">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
