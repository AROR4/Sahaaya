import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, MessageCircle, Heart, Users, Zap, ArrowRight, Star } from 'lucide-react';

const Home = () => {
  const stats = [
    { label: 'Active Campaigns', value: '500+', icon: Zap },
    { label: 'Volunteers', value: '10K+', icon: Users },
    { label: 'Donations Raised', value: '₹10L+', icon: Heart },
  ];

  const steps = [
    {
      step: '1',
      title: 'Discover',
      description: 'Browse campaigns and NGOs near you or based on your interests',
      icon: Search,
      color: 'blue'
    },
    {
      step: '2',
      title: 'Join or Create',
      description: 'Participate in existing campaigns or start your own initiative',
      icon: Plus,
      color: 'emerald'
    },
    {
      step: '3',
      title: 'Track & Share',
      description: 'Monitor your impact and share your journey with others',
      icon: Star,
      color: 'purple'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Empowering{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                Changemakers
              </span>
              , One Campaign at a Time
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
              Join a community of passionate individuals making a positive impact. Discover campaigns, 
              create initiatives, and track your contribution to society.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/discover"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group"
              >
                <Search className="w-5 h-5 mr-2" />
                Discover Campaigns
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/create"
                className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 flex items-center justify-center"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Campaign
              </Link>
              <Link
                to="/chat"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Get Guidance
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-emerald-600 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Sahaaya
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Sahaaya is more than just a platform—it's a movement. We connect passionate individuals 
              with meaningful causes, verified NGOs, and social campaigns that create lasting impact. 
              Whether you want to volunteer, donate, or start your own initiative, we provide the tools 
              and community to make it happen.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
              <p className="text-gray-600 mb-6">
                To democratize social impact by making it easy for anyone to contribute to causes they 
                care about. We believe that collective action, no matter how small, can create profound change.
              </p>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  Verified campaigns and NGOs for transparency
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full mr-3"></div>
                  AI-powered guidance for maximum impact
                </li>
                <li className="flex items-center text-gray-600">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mr-3"></div>
                  Real-time tracking of your contributions
                </li>
              </ul>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="People volunteering"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-gray-600">
              Get started with your social impact journey in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="relative">
                  <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center">
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-gradient-to-br ${
                      step.color === 'blue' ? 'from-blue-500 to-blue-600' :
                      step.color === 'emerald' ? 'from-emerald-500 to-emerald-600' :
                      'from-purple-500 to-purple-600'
                    }`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className={`text-2xl font-bold mb-2 ${
                      step.color === 'blue' ? 'text-blue-600' :
                      step.color === 'emerald' ? 'text-emerald-600' :
                      'text-purple-600'
                    }`}>
                      Step {step.step}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-gray-300" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of changemakers who are already creating positive impact in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/discover"
              className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center group"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/chat"
              className="bg-transparent hover:bg-white/10 text-white px-8 py-4 rounded-xl font-semibold border-2 border-white/30 hover:border-white/50 transition-all duration-300 flex items-center justify-center"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Get Personalized Guidance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;