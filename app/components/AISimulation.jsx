import React, { useState, useRef } from 'react';
import { Bot, Send, Loader2, Sparkles, FileText, Globe, DollarSign, Ship, AlertCircle, Trash2, Copy, Download, TrendingUp, Package, Award, MessageSquare, Zap } from 'lucide-react';

const AISimulation = () => {
  const GEMINI_API_KEY = 'AIzaSyDN89jmqOLyh9P3-KUUOpXNe_3S5vonOss';
  
  const [chatMessages, setChatMessages] = useState([
    { 
      type: 'bot', 
      text: 'Hello! I\'m your AI Export Assistant powered by Gemini AI. I can help you with:\n\n• Export documentation and procedures\n• Customs regulations and compliance\n• International shipping logistics\n• Payment terms and methods\n• Country-specific trade requirements\n\nWhat would you like to know about exporting?',
      timestamp: new Date()
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const chatContainerRef = useRef(null);

  const scenarios = [
    {
      id: 'documentation',
      title: 'Export Documentation',
      icon: FileText,
      color: '#bc1823',
      prompt: 'What are the essential documents required for exporting goods internationally? Please provide a comprehensive list with explanations.'
    },
    {
      id: 'customs',
      title: 'Customs Clearance',
      icon: AlertCircle,
      color: '#ffa629',
      prompt: 'Explain the customs clearance process step by step and common issues exporters face. Include tips to avoid delays.'
    },
    {
      id: 'logistics',
      title: 'Shipping & Logistics',
      icon: Ship,
      color: '#bc1823',
      prompt: 'What are the different international shipping methods (air, sea, land) and how do I choose the best one for my export business?'
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: DollarSign,
      color: '#ffa629',
      prompt: 'Explain international payment terms like Letter of Credit (L/C), Telegraphic Transfer (T/T), and Documents against Payment (D/P) for export transactions.'
    },
    {
      id: 'compliance',
      title: 'Trade Compliance',
      icon: Globe,
      color: '#bc1823',
      prompt: 'What are the key compliance requirements and regulations for international trade that exporters must follow?'
    },
    {
      id: 'market',
      title: 'Market Entry',
      icon: TrendingUp,
      color: '#ffa629',
      prompt: 'What are the best strategies for entering new international markets and finding reliable buyers?'
    }
  ];

  const quickQuestions = [
    'What is a Bill of Lading and why is it important?',
    'How do I calculate export duties and taxes?',
    'Explain Incoterms 2020 and which ones are best for beginners?',
    'How to handle export insurance and claims?',
    'What is a Certificate of Origin and how to obtain it?',
    'What are HS codes and how to find the right one?',
    'How to handle export financing and working capital?',
    'What is export credit insurance?',
    'What documents are needed for FDA approval?',
    'How to deal with non-payment from international buyers?'
  ];

  const stats = [
    { icon: MessageSquare, label: 'Questions Answered', value: '10,000+', color: '#bc1823' },
    { icon: Globe, label: 'Countries Covered', value: '195', color: '#ffa629' },
    { icon: Award, label: 'Success Rate', value: '98%', color: '#bc1823' },
    { icon: Zap, label: 'Avg Response Time', value: '3s', color: '#ffa629' }
  ];

  const callGeminiAPI = async (userMessage) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are an expert international trade and export consultant with 20+ years of experience. Your role is to provide detailed, practical, and professional advice about export/import procedures, regulations, documentation, and best practices.

User question: ${userMessage}

Please provide a comprehensive answer that includes:
- Clear explanation of the concept
- Step-by-step procedures when applicable
- Important tips, warnings, or best practices
- Relevant real-world examples
- Common mistakes to avoid

Format your response in a clear, structured manner with bullet points and paragraphs where appropriate. Be professional yet friendly and conversational.`
              }]
            }],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 2048,
              topP: 0.95,
              topK: 40
            }
          })
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Gemini API Error:', error);
      return `I apologize, but I encountered an error: ${error.message}.\n\nPlease try again in a moment.`;
    }
  };

  const handleSendMessage = async (e, customMessage = null) => {
    e?.preventDefault();
    const messageToSend = customMessage || chatInput.trim();
    
    if (!messageToSend) return;

    const userMessage = {
      type: 'user',
      text: messageToSend,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    const aiResponse = await callGeminiAPI(messageToSend);

    const botMessage = {
      type: 'bot',
      text: aiResponse,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, botMessage]);
    setIsLoading(false);
  };

  const handleScenarioClick = (scenario) => {
    setSelectedScenario(scenario.id);
    handleSendMessage(null, scenario.prompt);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(null, question);
  };

  const handleClearChat = () => {
    if (window.confirm('Are you sure you want to clear all chat messages?')) {
      setChatMessages([{
        type: 'bot',
        text: 'Chat cleared. How can I help you today with your export business?',
        timestamp: new Date()
      }]);
      setSelectedScenario(null);
    }
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
    alert('Message copied to clipboard!');
  };

  const handleExportChat = () => {
    const chatText = chatMessages.map(msg => 
      `[${msg.timestamp.toLocaleString()}] ${msg.type.toUpperCase()}: ${msg.text}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `export-chat-${Date.now()}.txt`;
    a.click();
  };

  const formatMessage = (text) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        {index < text.split('\n').length - 1 && <br />}
      </span>
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bot className="w-12 h-12 mr-3" style={{ color: '#bc1823' }} />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[#bc1823] to-[#ffa629] bg-clip-text text-transparent">
              AI Export Assistant
            </h1>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-5 h-5" style={{ color: '#ffa629' }} />
            <p className="text-xl font-bold" style={{ color: '#3d3d3d' }}>
              Powered by Gemini 1.5 Flash - Your 24/7 Export Consultant
            </p>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl p-5 shadow-lg text-center border-t-4 hover:shadow-xl transition-all" style={{ borderColor: stat.color }}>
                <Icon className="w-8 h-8 mx-auto mb-2" style={{ color: stat.color }} />
                <p className="text-2xl font-bold mb-1" style={{ color: '#3d3d3d' }}>{stat.value}</p>
                <p className="text-sm font-bold" style={{ color: stat.color }}>{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Main Content - Single Page Layout */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Sidebar - Scenarios */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2" style={{ borderColor: '#bc1823' }}>
              <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#bc1823' }}>
                <Package className="w-6 h-6 mr-2" />
                Expert Topics
              </h3>
              <div className="space-y-3">
                {scenarios.map((scenario) => {
                  const Icon = scenario.icon;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleScenarioClick(scenario)}
                      className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all transform hover:scale-105 ${
                        selectedScenario === scenario.id
                          ? 'shadow-lg'
                          : 'hover:shadow-md'
                      }`}
                      style={{ 
                        borderColor: selectedScenario === scenario.id ? scenario.color : '#e5e7eb',
                        backgroundColor: selectedScenario === scenario.id ? `${scenario.color}10` : 'white'
                      }}
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: scenario.color }}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <p className="font-bold text-sm" style={{ color: '#3d3d3d' }}>
                          {scenario.title}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 shadow-xl border-2" style={{ borderColor: '#ffa629' }}>
              <h3 className="text-xl font-bold mb-4 flex items-center" style={{ color: '#bc1823' }}>
                <Sparkles className="w-5 h-5 mr-2" />
                Pro Tips
              </h3>
              <div className="space-y-3 text-sm font-medium" style={{ color: '#3d3d3d' }}>
                <p className="flex items-start gap-2">
                  <span>🎯</span>
                  <span>Be specific with your questions for detailed AI responses</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>📝</span>
                  <span>Mention your target country for region-specific advice</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>💼</span>
                  <span>Include your product type for tailored guidance</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>🔄</span>
                  <span>Ask follow-up questions for deeper insights</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>💾</span>
                  <span>Export conversations for future reference</span>
                </p>
              </div>
            </div>
          </div>

          {/* Center - Chat Interface */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border-2" style={{ height: '700px', borderColor: '#bc1823' }}>
            <div className="p-5 bg-gradient-to-r from-[#bc1823] to-[#ffa629]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                    <Bot className="w-7 h-7" />
                    Chat with AI Expert
                  </h2>
                  <p className="text-sm text-white mt-1 font-medium">
                    Get instant answers to all your export questions
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={handleClearChat}
                    className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                    title="Clear Chat"
                  >
                    <Trash2 className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={handleExportChat}
                    className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
                    title="Export Chat"
                  >
                    <Download className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Messages Container - NO AUTO SCROLL */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-gray-50 to-white"
            >
              {chatMessages.map((message, index) => (
                <div key={index} className="group">
                  <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className="relative max-w-2xl">
                      <div className={`px-5 py-4 rounded-2xl shadow-md ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-[#bc1823] to-[#d32f2f]' 
                          : 'bg-white border-2'
                      }`} style={message.type === 'bot' ? { borderColor: '#ffa629' } : {}}>
                        <div className="text-sm leading-relaxed whitespace-pre-wrap font-medium" style={{ color: message.type === 'user' ? '#fff' : '#3d3d3d' }}>
                          {formatMessage(message.text)}
                        </div>
                        <div className={`text-xs mt-2 font-semibold ${message.type === 'user' ? 'text-white opacity-80' : ''}`} style={message.type === 'bot' ? { color: '#ffa629' } : {}}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => handleCopyMessage(message.text)}
                        className="absolute -right-10 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg hover:bg-red-50"
                        title="Copy message"
                      >
                        <Copy className="w-4 h-4" style={{ color: '#bc1823' }} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border-2 px-5 py-4 rounded-2xl shadow-md" style={{ borderColor: '#ffa629' }}>
                    <div className="flex items-center gap-3">
                      <Loader2 className="w-6 h-6 animate-spin" style={{ color: '#bc1823' }} />
                      <span className="text-sm font-bold" style={{ color: '#3d3d3d' }}>AI is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="p-5 border-t-2 bg-white" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Ask about export procedures, documentation, regulations..."
                  className="flex-1 px-5 py-4 border-2 rounded-xl focus:outline-none font-medium"
                  style={{ color: '#3d3d3d', borderColor: '#e5e7eb', focusBorderColor: '#bc1823' }}
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className="px-8 py-4 rounded-xl text-white font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  style={{ backgroundColor: '#bc1823' }}
                  disabled={isLoading}
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
              </div>
            </form>
          </div>

          {/* Right Sidebar - Quick Questions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-xl border-2" style={{ borderColor: '#ffa629' }}>
              <h3 className="text-2xl font-bold mb-4 flex items-center" style={{ color: '#ffa629' }}>
                <MessageSquare className="w-6 h-6 mr-2" />
                Quick Questions
              </h3>
              <div className="space-y-2 max-h-[580px] overflow-y-auto">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:shadow-md transition-all text-sm font-semibold border-2"
                    style={{ color: '#3d3d3d', borderColor: '#e5e7eb', backgroundColor: 'white' }}
                    disabled={isLoading}
                  >
                    <div className="flex items-start gap-2">
                      <span className="text-lg">💡</span>
                      <span>{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISimulation;
