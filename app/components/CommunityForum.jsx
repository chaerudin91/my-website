import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Eye, MessageCircle, Search, TrendingUp, Users, Award, Clock, Send, Filter, Plus, Star, ChevronDown, User, Calendar } from 'lucide-react';

const CommunityForum = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const posts = [
    {
      id: 1,
      title: 'Best practices for exporting to European markets?',
      author: 'Sarah Johnson',
      authorRole: 'Export Manager',
      replies: 24,
      views: 156,
      likes: 45,
      category: 'Market Entry',
      time: '2 hours ago',
      content: 'I am planning to expand my business to European markets. What are the key considerations and best practices I should be aware of? Any documentation or certification requirements?',
      solved: true,
      trending: true
    },
    {
      id: 2,
      title: 'How to handle customs delays in Asia?',
      author: 'Michael Chen',
      authorRole: 'Logistics Specialist',
      replies: 18,
      views: 203,
      likes: 32,
      category: 'Logistics',
      time: '5 hours ago',
      content: 'Has anyone experienced significant customs delays when shipping to Asian markets? What strategies have worked for you to minimize these delays?',
      solved: false,
      trending: true
    },
    {
      id: 3,
      title: 'Payment terms negotiation tips for new exporters',
      author: 'Emily Roberts',
      authorRole: 'Finance Director',
      replies: 32,
      views: 289,
      likes: 67,
      category: 'Finance',
      time: '1 day ago',
      content: 'Looking for advice on negotiating favorable payment terms with international buyers. What are the standard practices and how can I protect my interests?',
      solved: true,
      trending: false
    },
    {
      id: 4,
      title: 'Required certifications for food product exports',
      author: 'David Martinez',
      authorRole: 'Food Industry Expert',
      replies: 15,
      views: 178,
      likes: 28,
      category: 'Documentation',
      time: '2 days ago',
      content: 'Can someone guide me through the essential certifications needed for exporting organic food products to North America?',
      solved: false,
      trending: false
    },
    {
      id: 5,
      title: 'Success story: First container shipped to Australia!',
      author: 'Jennifer Lee',
      authorRole: 'Business Owner',
      replies: 42,
      views: 512,
      likes: 156,
      category: 'Success Stories',
      time: '3 days ago',
      content: 'Excited to share that we just completed our first export deal to Australia! Here is what worked for us and lessons learned along the way.',
      solved: false,
      trending: true
    },
    {
      id: 6,
      title: 'Understanding INCOTERMS 2024 - Complete guide',
      author: 'Robert Kim',
      authorRole: 'Trade Consultant',
      replies: 28,
      views: 421,
      likes: 89,
      category: 'Regulations',
      time: '4 days ago',
      content: 'A comprehensive breakdown of INCOTERMS 2024 and how to choose the right terms for your export transactions.',
      solved: true,
      trending: false
    },
    {
      id: 7,
      title: 'Best shipping insurance providers for exports?',
      author: 'Amanda Wright',
      authorRole: 'Risk Manager',
      replies: 19,
      views: 234,
      likes: 41,
      category: 'Logistics',
      time: '5 days ago',
      content: 'Looking for recommendations on reliable shipping insurance providers that cover international cargo. What has been your experience?',
      solved: false,
      trending: false
    },
    {
      id: 8,
      title: 'Tax implications of cross-border trade',
      author: 'Thomas Anderson',
      authorRole: 'Tax Advisor',
      replies: 21,
      views: 345,
      likes: 53,
      category: 'Finance',
      time: '1 week ago',
      content: 'What are the main tax considerations when starting export operations? Any tips on optimizing tax efficiency legally?',
      solved: true,
      trending: false
    }
  ];

  const categories = [
    { name: 'All', icon: MessageSquare, count: 847 },
    { name: 'Market Entry', icon: TrendingUp, count: 156 },
    { name: 'Logistics', icon: MessageCircle, count: 234 },
    { name: 'Documentation', icon: Award, count: 189 },
    { name: 'Finance', icon: Users, count: 142 },
    { name: 'Regulations', icon: Filter, count: 98 },
    { name: 'Success Stories', icon: Star, count: 28 }
  ];

  const topContributors = [
    { name: 'Sarah Johnson', posts: 156, reputation: 2847 },
    { name: 'Michael Chen', posts: 142, reputation: 2341 },
    { name: 'Emily Roberts', posts: 128, reputation: 2156 },
    { name: 'David Martinez', posts: 98, reputation: 1876 }
  ];

  const filteredPosts = posts.filter(post => {
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'recent') return 0;
    if (sortBy === 'popular') return b.views - a.views;
    if (sortBy === 'mostReplies') return b.replies - a.replies;
    if (sortBy === 'mostLiked') return b.likes - a.likes;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <MessageSquare className="w-12 h-12 mr-3" style={{ color: '#bc1823' }} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#bc1823] to-[#ffa629] bg-clip-text text-transparent">
              Export Community Forum
            </h1>
          </div>
          <p className="text-xl font-medium" style={{ color: '#3d3d3d' }}>
            Connect, learn, and share knowledge with fellow exporters worldwide
          </p>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-lg text-center border-t-4" style={{ borderColor: '#bc1823' }}>
            <MessageSquare className="w-8 h-8 mx-auto mb-2" style={{ color: '#bc1823' }} />
            <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>500</p>
            <p className="text-sm font-bold" style={{ color: '#bc1823' }}>Total Discussions</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg text-center border-t-4" style={{ borderColor: '#ffa629' }}>
            <Users className="w-8 h-8 mx-auto mb-2" style={{ color: '#ffa629' }} />
            <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>39</p>
            <p className="text-sm font-bold" style={{ color: '#ffa629' }}>Active Members</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg text-center border-t-4" style={{ borderColor: '#bc1823' }}>
            <MessageCircle className="w-8 h-8 mx-auto mb-2" style={{ color: '#bc1823' }} />
            <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>1000</p>
            <p className="text-sm font-bold" style={{ color: '#bc1823' }}>Total Replies</p>
          </div>
          <div className="bg-white rounded-xl p-5 shadow-lg text-center border-t-4" style={{ borderColor: '#ffa629' }}>
            <TrendingUp className="w-8 h-8 mx-auto mb-2" style={{ color: '#ffa629' }} />
            <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>80%</p>
            <p className="text-sm font-bold" style={{ color: '#ffa629' }}>Response Rate</p>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl p-6 shadow-xl mb-8 border-2" style={{ borderColor: '#bc1823' }}>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2" style={{ color: '#bc1823' }} />
              <input
                type="text"
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none font-medium"
                style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none font-medium"
              style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
            >
              <option value="recent">Most Recent</option>
              <option value="popular">Most Viewed</option>
              <option value="mostReplies">Most Replies</option>
              <option value="mostLiked">Most Liked</option>
            </select>
            <button 
              onClick={() => setShowNewPostModal(true)}
              className="px-6 py-3 rounded-lg text-white font-bold hover:shadow-lg transition-all flex items-center justify-center"
              style={{ backgroundColor: '#bc1823' }}
            >
              <Plus className="w-5 h-5 mr-2" />
              New Discussion
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#bc1823' }}>
                <Filter className="w-5 h-5 mr-2" />
                Categories
              </h3>
              <div className="space-y-2">
                {categories.map((cat) => {
                  const Icon = cat.icon;
                  return (
                    <button
                      key={cat.name}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
                        selectedCategory === cat.name ? 'shadow-md' : 'hover:bg-red-50'
                      }`}
                      style={{
                        backgroundColor: selectedCategory === cat.name ? '#bc1823' : 'transparent'
                      }}
                    >
                      <div className="flex items-center">
                        <Icon className="w-4 h-4 mr-2" style={{ color: selectedCategory === cat.name ? 'white' : '#bc1823' }} />
                        <p className="font-bold text-sm" style={{ color: selectedCategory === cat.name ? 'white' : '#3d3d3d' }}>
                          {cat.name}
                        </p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                        selectedCategory === cat.name ? 'bg-white' : 'bg-red-100'
                      }`} style={{ color: selectedCategory === cat.name ? '#bc1823' : '#3d3d3d' }}>
                        {cat.count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Top Contributors */}
            <div className="bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#e5e7eb' }}>
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#ffa629' }}>
                <Award className="w-5 h-5 mr-2" />
                Top Contributors
              </h3>
              <div className="space-y-3">
                {topContributors.map((contributor, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white mr-3" style={{ backgroundColor: index === 0 ? '#bc1823' : '#ffa629' }}>
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#3d3d3d' }}>{contributor.name}</p>
                        <p className="text-xs font-semibold" style={{ color: '#bc1823' }}>{contributor.posts} posts</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Star className="w-4 h-4 inline fill-current" style={{ color: '#ffa629' }} />
                      <p className="text-xs font-bold" style={{ color: '#3d3d3d' }}>{contributor.reputation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-3 space-y-4">
            {sortedPosts.length === 0 ? (
              <div className="bg-white rounded-xl p-12 shadow-lg text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4" style={{ color: '#bc1823' }} />
                <h3 className="text-2xl font-bold mb-2" style={{ color: '#3d3d3d' }}>No discussions found</h3>
                <p className="font-medium mb-6" style={{ color: '#3d3d3d' }}>Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('All');
                  }}
                  className="px-6 py-3 rounded-lg text-white font-bold"
                  style={{ backgroundColor: '#bc1823' }}
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              sortedPosts.map((post) => (
                <div key={post.id} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer border-2 hover:border-[#bc1823]" style={{ borderColor: '#e5e7eb' }} onClick={() => setSelectedPost(post)}>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: post.id % 2 === 0 ? '#bc1823' : '#ffa629' }}>
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-xl" style={{ color: '#3d3d3d' }}>{post.title}</h3>
                            {post.trending && (
                              <span className="px-2 py-1 rounded-full text-xs font-bold bg-red-100 flex items-center" style={{ color: '#bc1823' }}>
                                <TrendingUp className="w-3 h-3 mr-1" />
                                Trending
                              </span>
                            )}
                            {post.solved && (
                              <span className="px-2 py-1 rounded-full text-xs font-bold bg-green-100 flex items-center" style={{ color: '#3d3d3d' }}>
                                ✓ Solved
                              </span>
                            )}
                          </div>
                          <p className="font-medium text-sm mb-2" style={{ color: '#3d3d3d' }}>{post.content}</p>
                        </div>
                        <span className="px-3 py-1 rounded-full text-xs font-bold ml-4 flex-shrink-0" style={{ backgroundColor: '#ffa629', color: 'white' }}>
                          {post.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" style={{ color: '#bc1823' }} />
                            <span className="text-sm font-bold" style={{ color: '#3d3d3d' }}>{post.author}</span>
                            <span className="text-xs font-medium ml-2 px-2 py-1 rounded bg-red-50" style={{ color: '#bc1823' }}>
                              {post.authorRole}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" style={{ color: '#ffa629' }} />
                            <span className="text-sm font-semibold" style={{ color: '#3d3d3d' }}>{post.time}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="flex items-center px-3 py-1 bg-red-50 rounded-lg">
                            <MessageCircle className="w-4 h-4 mr-1" style={{ color: '#bc1823' }} />
                            <span className="text-sm font-bold" style={{ color: '#3d3d3d' }}>{post.replies}</span>
                          </div>
                          <div className="flex items-center px-3 py-1 bg-orange-50 rounded-lg">
                            <Eye className="w-4 h-4 mr-1" style={{ color: '#ffa629' }} />
                            <span className="text-sm font-bold" style={{ color: '#3d3d3d' }}>{post.views}</span>
                          </div>
                          <div className="flex items-center px-3 py-1 bg-red-50 rounded-lg">
                            <ThumbsUp className="w-4 h-4 mr-1" style={{ color: '#bc1823' }} />
                            <span className="text-sm font-bold" style={{ color: '#3d3d3d' }}>{post.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* New Post Modal */}
        {showNewPostModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50" onClick={() => setShowNewPostModal(false)}>
            <div className="bg-white rounded-2xl p-8 max-w-3xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
              <h2 className="text-3xl font-bold mb-6" style={{ color: '#bc1823' }}>
                Start a New Discussion
              </h2>
              
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block font-bold mb-2" style={{ color: '#3d3d3d' }}>Discussion Title</label>
                  <input
                    type="text"
                    placeholder="Enter a clear and descriptive title..."
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none font-medium"
                    style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
                  />
                </div>
                
                <div>
                  <label className="block font-bold mb-2" style={{ color: '#3d3d3d' }}>Category</label>
                  <select
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none font-medium"
                    style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
                  >
                    <option>Select a category...</option>
                    {categories.slice(1).map((cat) => (
                      <option key={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block font-bold mb-2" style={{ color: '#3d3d3d' }}>Description</label>
                  <textarea
                    placeholder="Describe your question or topic in detail..."
                    rows={6}
                    className="w-full px-4 py-3 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none font-medium resize-none"
                    style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1 py-3 rounded-lg font-bold text-lg border-2 hover:shadow-lg transition-all"
                  style={{ color: '#bc1823', borderColor: '#bc1823', backgroundColor: 'white' }}
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    alert('Discussion posted successfully!');
                    setShowNewPostModal(false);
                  }}
                  className="flex-1 py-3 rounded-lg text-white font-bold text-lg hover:shadow-lg transition-all flex items-center justify-center"
                  style={{ backgroundColor: '#ffa629' }}
                >
                  <Send className="w-5 h-5 mr-2" />
                  Post Discussion
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Post Detail Modal */}
        {selectedPost && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto" onClick={() => setSelectedPost(null)}>
            <div className="bg-white rounded-2xl p-8 max-w-4xl w-full shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
              <div className="flex items-start justify-between mb-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>{selectedPost.title}</h2>
                    {selectedPost.trending && (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-100 flex items-center" style={{ color: '#bc1823' }}>
                        <TrendingUp className="w-4 h-4 mr-1" />
                        Trending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" style={{ color: '#bc1823' }} />
                      <span className="font-bold" style={{ color: '#3d3d3d' }}>{selectedPost.author}</span>
                      <span className="text-sm font-medium ml-2 px-2 py-1 rounded bg-red-50" style={{ color: '#bc1823' }}>
                        {selectedPost.authorRole}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" style={{ color: '#ffa629' }} />
                      <span className="text-sm font-semibold" style={{ color: '#3d3d3d' }}>{selectedPost.time}</span>
                    </div>
                    <span className="px-3 py-1 rounded-full text-sm font-bold" style={{ backgroundColor: '#ffa629', color: 'white' }}>
                      {selectedPost.category}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl mb-6 border-2" style={{ borderColor: '#ffa629' }}>
                <p className="font-medium text-lg" style={{ color: '#3d3d3d' }}>{selectedPost.content}</p>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <button className="flex items-center px-4 py-2 rounded-lg font-bold hover:shadow-lg transition-all" style={{ backgroundColor: '#bc1823', color: 'white' }}>
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  Like ({selectedPost.likes})
                </button>
                <div className="flex items-center px-4 py-2 bg-red-50 rounded-lg">
                  <MessageCircle className="w-4 h-4 mr-2" style={{ color: '#bc1823' }} />
                  <span className="font-bold" style={{ color: '#3d3d3d' }}>{selectedPost.replies} Replies</span>
                </div>
                <div className="flex items-center px-4 py-2 bg-orange-50 rounded-lg">
                  <Eye className="w-4 h-4 mr-2" style={{ color: '#ffa629' }} />
                  <span className="font-bold" style={{ color: '#3d3d3d' }}>{selectedPost.views} Views</span>
                </div>
              </div>

              <div className="border-t-2 pt-6" style={{ borderColor: '#e5e7eb' }}>
                <h3 className="text-xl font-bold mb-4" style={{ color: '#bc1823' }}>Add Your Reply</h3>
                <textarea
                  placeholder="Share your thoughts and insights..."
                  rows={4}
                  className="w-full px-4 py-3 border-2 rounded-lg focus:border-[#bc1823] focus:outline-none font-medium resize-none mb-4"
                  style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => setSelectedPost(null)}
                    className="px-6 py-3 rounded-lg font-bold border-2 hover:shadow-lg transition-all"
                    style={{ color: '#bc1823', borderColor: '#bc1823', backgroundColor: 'white' }}
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      alert('Reply posted successfully!');
                      setSelectedPost(null);
                    }}
                    className="px-6 py-3 rounded-lg text-white font-bold hover:shadow-lg transition-all flex items-center"
                    style={{ backgroundColor: '#ffa629' }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Post Reply
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


export default CommunityForum;
