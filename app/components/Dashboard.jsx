import React, { useState } from 'react';
import { LogOut, TrendingUp, GraduationCap, UserCheck, Bot, MessageSquare, TrendingUp as Export } from 'lucide-react';
import DashboardHome from './DashboardHome';
import EducationMentor from './EducationMentor';
import BuyerMatchmaking from './BuyerMatchmaking';
import AISimulation from './AISimulation';
import CommunityForum from './CommunityForum';
import ExportProcess from './ExportProcess';

export default function Dashboard({ onLogout }) {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <TrendingUp className="w-5 h-5" />, component: DashboardHome },
    { id: 'education', name: 'Education & Mentor', icon: <GraduationCap className="w-5 h-5" />, component: EducationMentor },
    { id: 'matchmaking', name: 'Buyer Matchmaking', icon: <UserCheck className="w-5 h-5" />, component: BuyerMatchmaking },
    { id: 'simulation', name: 'AI Export Simulation', icon: <Bot className="w-5 h-5" />, component: AISimulation },
    { id: 'forum', name: 'Community Forum', icon: <MessageSquare className="w-5 h-5" />, component: CommunityForum },
    { id: 'process', name: 'Export Process', icon: <Export className="w-5 h-5" />, component: ExportProcess },
  ];

  const ActiveComponent = menuItems.find(item => item.id === activeMenu)?.component;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold" style={{ color: '#bc1823' }}>INekspor</h1>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#bc1823' }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        <aside className="w-64 bg-white h-screen sticky top-16 shadow-lg">
          <div className="p-4">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveMenu(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    activeMenu === item.id
                      ? 'text-white font-semibold'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  style={activeMenu === item.id ? { backgroundColor: '#bc1823' } : {}}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {ActiveComponent && <ActiveComponent setActiveMenu={setActiveMenu} />}
          </div>
        </main>
      </div>
    </div>
  );
}
