import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar, 
  Users, 
  DollarSign,
  Filter,
  Search
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminCampaigns = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/not-authorized');
      return;
    }

    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('http://localhost:5152/api/admin/campaigns', {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
        setCampaigns(data);
        setFilteredCampaigns(data);
      } catch (error) {
        console.error('Failed to fetch campaigns:', error);
        alert('Failed to fetch campaigns');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user, navigate]);

  useEffect(() => {
    let filtered = campaigns;

    if (filter !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === filter);
    }

    if (searchTerm) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (campaign.creator?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredCampaigns(filtered);
  }, [campaigns, filter, searchTerm]);

  const handleMarkReceived = async (campaignId, donationId, goalId) => {
    try {
      setActionLoading(`${campaignId}:${donationId}`);
      await axios.put(
        `http://localhost:5152/api/admin/campaigns/${campaignId}/donations/${donationId}/received`,
        { goalId },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );

      setCampaigns(prev => prev.map(c => {
        if (c._id !== campaignId) return c;
        return {
          ...c,
          donations: c.donations.map(d => d._id === donationId ? { ...d, status: 'received' } : d)
        };
      }));

      alert('Donation marked as received');
    } catch (err) {
      console.error(err);
      alert('Failed to update donation');
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and header same as before */}

        <div className="space-y-6">
          {filteredCampaigns.map((campaign) => (
            <div key={campaign._id} className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">{campaign.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'approved' ? 'bg-green-100 text-green-800' :
                      campaign.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-3">{campaign.description}</p>
                </div>
              </div>

              {/* Donations Management */}
              {campaign.donations && campaign.donations.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Donations</h4>
                  <div className="space-y-3">
                    {campaign.donations.map((d) => (
                      <div key={d._id} className="flex items-center justify-between text-sm p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <span>₹{d.amount.toLocaleString()}</span>
                          <span className="text-gray-600">UPI: {d.upiId || '—'}</span>
                          <span className="text-gray-600">By: {d.user?.name || d.user?.email}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs ${d.status === 'received' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>{d.status}</span>
                        </div>
                        {d.status === 'pending' && (
                          <button
                            onClick={() => handleMarkReceived(campaign._id, d._id, campaign.goals?.[0]?._id)}
                            disabled={actionLoading === `${campaign._id}:${d._id}`}
                            className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 disabled:opacity-50"
                          >
                            {actionLoading === `${campaign._id}:${d._id}` ? 'Updating…' : 'Mark Received'}
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminCampaigns;
