import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter } from 'lucide-react';
import NGOCard from '../../components/NGOCard';
import ngosData from '../../data/ngos.json';

const NGODiscovery = () => {
  const [ngos, setNgos] = useState([]);
  const [filteredNgos, setFilteredNgos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');

  const categories = ['All', 'Environment', 'Education', 'Animal Welfare'];
  const locations = ['All', 'Chennai', 'Sonipat', 'Bangalore', 'Gurgaon', 'Mumbai'];

  useEffect(() => {
    // Simulate API call
    setNgos(ngosData);
    setFilteredNgos(ngosData);
  }, []);

  useEffect(() => {
    let filtered = ngos.filter(ngo => {
      const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || ngo.category === selectedCategory;
      const matchesLocation = selectedLocation === 'All' || ngo.location === selectedLocation;
      
      return matchesSearch && matchesCategory && matchesLocation;
    });

    // Sort by number of volunteers (descending)
    filtered.sort((a, b) => b.volunteers - a.volunteers);

    setFilteredNgos(filtered);
  }, [ngos, searchTerm, selectedCategory, selectedLocation]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            NGO Discovery
          </h1>
          <p className="text-lg text-gray-600">
            Connect with verified NGOs making a difference in communities across India
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="lg:col-span-2 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search NGOs..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Location Filter */}
            <select
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold">{filteredNgos.length}</span> verified NGOs
          </p>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Filters applied: {[
              selectedCategory !== 'All' ? selectedCategory : '',
              selectedLocation !== 'All' ? selectedLocation : '',
              searchTerm ? `"${searchTerm}"` : ''
            ].filter(Boolean).join(', ') || 'None'}</span>
          </div>
        </div>

        {/* NGO Grid */}
        {filteredNgos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNgos.map(ngo => (
              <NGOCard key={ngo.id} ngo={ngo} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No NGOs found</h3>
            <p className="text-gray-600">Try adjusting your search filters to see more results.</p>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Want to list your NGO?
            </h2>
            <p className="text-gray-600 mb-6">
              Join our platform to reach more volunteers and donors. Get verified and showcase your impact to our community.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Apply for NGO Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGODiscovery;