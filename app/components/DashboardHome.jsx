import React from 'react';
import { BookOpen, UserCheck, Bot, GraduationCap, MessageSquare } from 'lucide-react';

export default function DashboardHome({ setActiveMenu }) {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-6" style={{ color: '#3d3d3d' }}>
        Welcome to INekspor Dashboard
      </h1>
      
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: '#3d3d3d' }}>Active Courses</h3>
            <BookOpen className="w-8 h-8" style={{ color: '#bc1823' }} />
          </div>
          <p className="text-3xl font-bold" style={{ color: '#bc1823' }}>12</p>
          <p className="text-sm text-gray-600 mt-2">Currently enrolled</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: '#3d3d3d' }}>Matched Buyers</h3>
            <UserCheck className="w-8 h-8" style={{ color: '#ffa629' }} />
          </div>
          <p className="text-3xl font-bold" style={{ color: '#ffa629' }}>8</p>
          <p className="text-sm text-gray-600 mt-2">Potential connections</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold" style={{ color: '#3d3d3d' }}>AI Simulations</h3>
            <Bot className="w-8 h-8" style={{ color: '#3d3d3d' }} />
          </div>
          <p className="text-3xl font-bold" style={{ color: '#3d3d3d' }}>5</p>
          <p className="text-sm text-gray-600 mt-2">Completed scenarios</p>
        </div>
      </div>
      
      <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#3d3d3d' }}>Quick Actions</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => setActiveMenu('education')}
            className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#bc1823] transition-all text-left"
          >
            <GraduationCap className="w-6 h-6 mb-2" style={{ color: '#bc1823' }} />
            <h3 className="font-semibold mb-1" style={{ color: '#3d3d3d' }}>Start Learning</h3>
            <p className="text-sm text-gray-600">Access courses and mentors</p>
          </button>
          
          <button 
            onClick={() => setActiveMenu('matchmaking')}
            className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#ffa629] transition-all text-left"
          >
            <UserCheck className="w-6 h-6 mb-2" style={{ color: '#ffa629' }} />
            <h3 className="font-semibold mb-1" style={{ color: '#3d3d3d' }}>Find Buyers</h3>
            <p className="text-sm text-gray-600">Connect with potential buyers</p>
          </button>
          
          <button 
            onClick={() => setActiveMenu('simulation')}
            className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#3d3d3d] transition-all text-left"
          >
            <Bot className="w-6 h-6 mb-2" style={{ color: '#3d3d3d' }} />
            <h3 className="font-semibold mb-1" style={{ color: '#3d3d3d' }}>AI Simulation</h3>
            <p className="text-sm text-gray-600">Practice export scenarios</p>
          </button>
          
          <button 
            onClick={() => setActiveMenu('forum')}
            className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#bc1823] transition-all text-left"
          >
            <MessageSquare className="w-6 h-6 mb-2" style={{ color: '#bc1823' }} />
            <h3 className="font-semibold mb-1" style={{ color: '#3d3d3d' }}>Join Forum</h3>
            <p className="text-sm text-gray-600">Connect with community</p>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#bc1823' }}>Recent Activities</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#bc1823' }}></div>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#3d3d3d' }}>Completed Export Fundamentals Course</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3 border-b border-gray-100">
              <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#ffa629' }}></div>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#3d3d3d' }}>New buyer match from Singapore</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 pb-3">
              <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: '#3d3d3d' }}></div>
              <div>
                <p className="font-semibold text-sm" style={{ color: '#3d3d3d' }}>Joined community discussion</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#bc1823' }}>Upcoming Events</h2>
          <div className="space-y-4">
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#fef3e2' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: '#3d3d3d' }}>Webinar: Export Documentation Masterclass</p>
              <p className="text-xs text-gray-600">Tomorrow, 2:00 PM</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#fee2e2' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: '#3d3d3d' }}>Mentor Session: Trade Compliance</p>
              <p className="text-xs text-gray-600">Oct 25, 10:00 AM</p>
            </div>
            <div className="p-3 rounded-lg" style={{ backgroundColor: '#e5e7eb' }}>
              <p className="font-semibold text-sm mb-1" style={{ color: '#3d3d3d' }}>Virtual Trade Fair: ASEAN Markets</p>
              <p className="text-xs text-gray-600">Oct 28, All Day</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
