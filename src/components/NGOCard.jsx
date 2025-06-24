import React from 'react';
import { MapPin, Users, CheckCircle, Mail } from 'lucide-react';

const NGOCard = ({ ngo }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 p-6 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900 mr-2">{ngo.name}</h3>
            {ngo.verified && (
              <CheckCircle className="w-5 h-5 text-green-500" />
            )}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
            ngo.category === 'Environment' ? 'bg-green-100 text-green-800' :
            ngo.category === 'Education' ? 'bg-blue-100 text-blue-800' :
            ngo.category === 'Animal Welfare' ? 'bg-purple-100 text-purple-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {ngo.category}
          </span>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4">
        {ngo.description}
      </p>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-4 h-4 mr-2" />
          <span>{ngo.location}</span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Users className="w-4 h-4 mr-2" />
          <span>{ngo.volunteers} volunteers</span>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-sm font-medium text-gray-900 mb-1">Impact</p>
        <p className="text-sm text-gray-600">{ngo.impact}</p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Founded {ngo.founded}</span>
        <div className="flex space-x-2">
          <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
            Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default NGOCard;