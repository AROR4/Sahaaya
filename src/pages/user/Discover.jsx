import React, { useState, useEffect } from "react";
import { Search, Filter } from "lucide-react";
import CampaignCard from "../../components/CampaignCard";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Discover = () => {
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [loading, setLoading] = useState(false);

  const handleJoin = (campaignId) => {
    setCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign._id === campaignId 
          ? { ...campaign, isJoined: true, participants: [...campaign.participants, user] }
          : campaign
      )
    );
    setFilteredCampaigns(prevCampaigns => 
      prevCampaigns.map(campaign => 
        campaign._id === campaignId 
          ? { ...campaign, isJoined: true, participants: [...campaign.participants, user] }
          : campaign
      )
    );
  };

  const categories = [
    "All",
    "Environment",
    "Education",
    "Animal Welfare",
    "Healthcare",
    "Other",
  ];
  const [locations, setLocations] = useState(["All"]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const headers = user ? { 
          Authorization: `Bearer ${user.token}` 
        } : {};
        
        const { data } = await axios.get("http://localhost:5152/api/campaigns", { headers });
        const approved = data.filter(
          (campaign) => campaign.status === "approved"
        );
        setCampaigns(approved);
        setFilteredCampaigns(approved);

        const citySet = new Set();
        approved.forEach((c) => {
          const city = c.location?.split(",")[0].trim(); // Get city before comma
          if (city) citySet.add(city);
        });

        const cityList = ["All", ...Array.from(citySet).sort()];
        setLocations(cityList);
      } catch (error) {
        console.error("Failed to fetch campaigns:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, [user]);

  useEffect(() => {
    let filtered = campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || campaign.category === selectedCategory;

      const matchesLocation =
        selectedLocation === "All" ||
        campaign.location
          .toLowerCase()
          .startsWith(selectedLocation.toLowerCase());

      return matchesSearch && matchesCategory && matchesLocation;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "popularity":
          return b.popularity_score - a.popularity_score;
        case "date":
          return new Date(a.date) - new Date(b.date);
        case "participants":
          return (b.participants?.length || 0) - (a.participants?.length || 0);
        default:
          return 0;
      }
    });

    setFilteredCampaigns(filtered);
  }, [campaigns, searchTerm, selectedCategory, selectedLocation, sortBy]);

  const featuredCampaign = filteredCampaigns.find(
    (c) => c.popularity_score >= 90
  );
  const regularCampaigns = filteredCampaigns.filter(
    (c) => c._id !== featuredCampaign?._id
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Campaigns
          </h1>
          <p className="text-lg text-gray-600">
            Find meaningful campaigns and make a difference in your community
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search campaigns..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Location Filter */}

            <select
              className="px-4 py-3 border border-gray-300 rounded-lg"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="popularity">Most Popular</option>
              <option value="date">Upcoming</option>
              <option value="participants">Most Participants</option>
            </select>
          </div>
        </div>

        {/* Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found{" "}
            <span className="font-semibold">{filteredCampaigns.length}</span>{" "}
            campaigns
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>
              Filters applied:{" "}
              {[
                selectedCategory !== "All" ? selectedCategory : "",
                selectedLocation !== "All" ? selectedLocation : "",
                searchTerm ? `"${searchTerm}"` : "",
              ]
                .filter(Boolean)
                .join(", ") || "None"}
            </span>
          </div>
        </div>

        {/* Featured Campaign */}
        {featuredCampaign && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Featured Campaign
            </h2>
            <CampaignCard campaign={featuredCampaign} featured currentUser={user} />
          </div>
        )}

        {/* Other Campaigns */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            All Campaigns
          </h2>
          {regularCampaigns.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularCampaigns.map((campaign) => (
                <CampaignCard 
                  key={campaign._id} 
                  campaign={campaign}
                  currentUser={user}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Search className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No campaigns found
              </h3>
              <p className="text-gray-600">
                Try adjusting your search filters to see more results.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Discover;
