import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar, 
  MapPin, 
  User, 
  Mail, 
  Phone,
  FileText,
  DollarSign,
  Users,
  Clock,
  Download,
  ExternalLink
} from 'lucide-react';
import adminData from '../../data/adminData.json';

const CampaignApprovals = () => {
  const [pendingCampaigns, setPendingCampaigns] = useState([]);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Simulate API call to fetch pending campaigns
    const fetchPendingCampaigns = async () => {
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/admin/pending-campaigns');
        // const data = await response.json();
        
        // Using placeholder data
        setPendingCampaigns(adminData.pendingCampaigns);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pending campaigns:', error);
        setLoading(false);
      }
    };

    fetchPendingCampaigns();
  }, []);

  const handleApprove = async (campaignId) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/campaigns/${campaignId}/approve`, { method: 'POST' });
      
      // Update local state
      setPendingCampaigns(prev => prev.filter(c => c.id !== campaignId));
      setSelectedCampaign(null);
      
      // Show success message
      alert('Campaign approved successfully!');
    } catch (error) {
      console.error('Error approving campaign:', error);
      alert('Error approving campaign. Please try again.');
    }
  };

  const handleReject = async (campaignId, reason) => {
    try {
      // TODO: Replace with actual API call
      // await fetch(`/api/admin/campaigns/${campaignId}/reject`, { 
      //   method: 'POST',
      //   body: JSON.stringify({ reason })
      // });
      
      // Update local state
      setPendingCampaigns(prev => prev.filter(c => c.id !== campaignId));
      setSelectedCampaign(null);
      
      // Show success message
      alert('Campaign rejected successfully!');
    } catch (error) {
      console.error('Error rejecting campaign:', error);
      alert('Error rejecting campaign. Please try again.');
    }
  };

  const filteredCampaigns = pendingCampaigns.filter(campaign => {
    if (filter === 'all') return true;
    return campaign.category.toLowerCase() === filter;
  });

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow-sm">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-20 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Approvals</h1>
          <p className="text-gray-600 mt-1">Review and approve pending campaign submissions</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="education">Education</option>
            <option value="environment">Environment</option>
            <option value="healthcare">Healthcare</option>
            <option value="animal welfare">Animal Welfare</option>
          </select>
          <div className="bg-white px-4 py-2 rounded-lg shadow-sm border">
            <span className="text-sm text-gray-600">
              {filteredCampaigns.length} pending campaigns
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Campaign List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className={`bg-white rounded-xl shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
                selectedCampaign?.id === campaign.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => setSelectedCampaign(campaign)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {campaign.location}
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(campaign.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(campaign.submittedDate).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                    {campaign.description}
                  </p>
                </div>
                <div className="ml-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    campaign.category === 'Environment' ? 'bg-green-100 text-green-800' :
                    campaign.category === 'Education' ? 'bg-blue-100 text-blue-800' :
                    campaign.category === 'Healthcare' ? 'bg-red-100 text-red-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {campaign.category}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    {campaign.creator}
                  </div>
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    Target: {campaign.targetParticipants}
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    ₹{campaign.estimatedBudget?.toLocaleString()}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {campaign.idVerified && (
                    <CheckCircle className="w-5 h-5 text-green-500" title="ID Verified" />
                  )}
                  <Eye className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}

          {filteredCampaigns.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No pending campaigns</h3>
              <p className="text-gray-600">All campaigns have been reviewed.</p>
            </div>
          )}
        </div>

        {/* Campaign Details Panel */}
        <div className="lg:col-span-1">
          {selectedCampaign ? (
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
              <div className="mb-6">
                <img
                  src={selectedCampaign.image_url}
                  alt={selectedCampaign.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {selectedCampaign.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {selectedCampaign.description}
                </p>
              </div>

              {/* Campaign Details */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Category</span>
                  <span className="text-sm text-gray-900">{selectedCampaign.category}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Location</span>
                  <span className="text-sm text-gray-900">{selectedCampaign.location}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Date</span>
                  <span className="text-sm text-gray-900">
                    {new Date(selectedCampaign.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Target Participants</span>
                  <span className="text-sm text-gray-900">{selectedCampaign.targetParticipants}</span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-gray-100">
                  <span className="text-sm font-medium text-gray-600">Estimated Budget</span>
                  <span className="text-sm text-gray-900">₹{selectedCampaign.estimatedBudget?.toLocaleString()}</span>
                </div>
              </div>

              {/* Creator Details */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Creator Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <User className="w-4 h-4 mr-2" />
                    {selectedCampaign.creator}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Mail className="w-4 h-4 mr-2" />
                    {selectedCampaign.creatorEmail}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Phone className="w-4 h-4 mr-2" />
                    {selectedCampaign.creatorPhone}
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Documents</h4>
                <div className="space-y-2">
                  {selectedCampaign.documents?.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                      <div className="flex items-center text-sm text-gray-600">
                        <FileText className="w-4 h-4 mr-2" />
                        {doc}
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => handleApprove(selectedCampaign.id)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Approve Campaign
                </button>
                <button
                  onClick={() => {
                    const reason = prompt('Please provide a reason for rejection:');
                    if (reason) {
                      handleReject(selectedCampaign.id, reason);
                    }
                  }}
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center"
                >
                  <XCircle className="w-5 h-5 mr-2" />
                  Reject Campaign
                </button>
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Contact Creator
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 text-center">
              <Eye className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Campaign</h3>
              <p className="text-gray-600">Click on a campaign from the list to view details and take action.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignApprovals;