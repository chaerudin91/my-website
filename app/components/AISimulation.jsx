import React, { useState, useRef } from 'react';
import { Bot, Send, Loader2, Sparkles, FileText, Globe, DollarSign, Ship, AlertCircle, Trash2, Copy, Download, TrendingUp, Package, Award, MessageSquare, Zap, Menu, X } from 'lucide-react';

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
  const [showSidebar, setShowSidebar] = useState(false);
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

  const callGeminiAPI = async (userMessage) => {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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

  const handleSendMessage = async (customMessage = null) => {
    const messageToSend = customMessage || chatInput.trim();
    
    if (!messageToSend || isLoading) return;

    const userMessage = {
      type: 'user',
      text: messageToSend,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);
    setShowSidebar(false);

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
    handleSendMessage(scenario.prompt);
  };

  const handleQuickQuestion = (question) => {
    handleSendMessage(question);
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
    const lines = text.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('•') || line.startsWith('-')) {
        return (
          <div key={index} className="flex gap-2 my-1">
            <span style={{ color: '#bc1823' }}>•</span>
            <span>{line.substring(1).trim()}</span>
          </div>
        );
      }
      return (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      );
    });
  };

  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Header */}
      <div className="flex-shrink-0 border-b-2 bg-gradient-to-r from-[#bc1823] to-[#ffa629] px-4 py-4" style={{ borderColor: '#e5e7eb' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="lg:hidden p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <Bot className="w-8 h-8 text-white" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-white">AI Export Assistant</h1>
              <p className="text-xs text-white opacity-90 hidden sm:block">Powered by Gemini AI</p>
            </div>
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

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Mobile Overlay */}
        {showSidebar && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setShowSidebar(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:relative inset-y-0 left-0 z-50
          w-80 bg-white border-r-2 overflow-y-auto
          transform transition-transform duration-300 ease-in-out
          ${showSidebar ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `} style={{ borderColor: '#e5e7eb' }}>
          <div className="p-4 space-y-4">
            {/* Close button for mobile */}
            <div className="lg:hidden flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold" style={{ color: '#bc1823' }}>Menu</h3>
              <button onClick={() => setShowSidebar(false)}>
                <X className="w-6 h-6" style={{ color: '#bc1823' }} />
              </button>
            </div>

            {/* Expert Topics */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center" style={{ color: '#bc1823' }}>
                <Package className="w-5 h-5 mr-2" />
                Expert Topics
              </h3>
              <div className="space-y-2">
                {scenarios.map((scenario) => {
                  const Icon = scenario.icon;
                  return (
                    <button
                      key={scenario.id}
                      onClick={() => handleScenarioClick(scenario)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border-2 transition-all ${
                        selectedScenario === scenario.id ? 'shadow-md' : ''
                      }`}
                      style={{ 
                        borderColor: selectedScenario === scenario.id ? scenario.color : '#e5e7eb',
                        backgroundColor: selectedScenario === scenario.id ? `${scenario.color}10` : 'white'
                      }}
                      disabled={isLoading}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: scenario.color }}>
                          <Icon className="w-4 h-4 text-white" />
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

            {/* Quick Questions */}
            <div>
              <h3 className="text-lg font-bold mb-3 flex items-center" style={{ color: '#ffa629' }}>
                <MessageSquare className="w-5 h-5 mr-2" />
                Quick Questions
              </h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {quickQuestions.slice(0, 6).map((question, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickQuestion(question)}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 transition-all text-xs font-semibold border"
                    style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
                    disabled={isLoading}
                  >
                    <div className="flex items-start gap-2">
                      <span>💡</span>
                      <span>{question}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Pro Tips */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border-2" style={{ borderColor: '#ffa629' }}>
              <h3 className="text-sm font-bold mb-3 flex items-center" style={{ color: '#bc1823' }}>
                <Sparkles className="w-4 h-4 mr-2" />
                Pro Tips
              </h3>
              <div className="space-y-2 text-xs font-medium" style={{ color: '#3d3d3d' }}>
                <p className="flex items-start gap-2">
                  <span>🎯</span>
                  <span>Be specific for detailed responses</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>📝</span>
                  <span>Mention target country</span>
                </p>
                <p className="flex items-start gap-2">
                  <span>💼</span>
                  <span>Include product type</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Messages Container */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto px-4 py-6"
          >
            <div className="max-w-4xl mx-auto space-y-6">
              {chatMessages.map((message, index) => (
                <div key={index} className="group">
                  <div className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-gradient-to-r from-[#bc1823] to-[#d32f2f]' : 'bg-gradient-to-r from-[#ffa629] to-[#ffb84d]'
                      }`}>
                        {message.type === 'user' ? (
                          <span className="text-white text-sm font-bold">U</span>
                        ) : (
                          <Bot className="w-5 h-5 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className={`inline-block max-w-full rounded-2xl px-4 py-3 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-[#bc1823] to-[#d32f2f] text-white' 
                          : 'bg-gray-100'
                      }`}>
                        <div className={`text-sm leading-relaxed whitespace-pre-wrap break-words ${
                          message.type === 'user' ? 'text-white' : ''
                        }`} style={message.type === 'bot' ? { color: '#3d3d3d' } : {}}>
                          {formatMessage(message.text)}
                        </div>
                      </div>
                      
                      {/* Timestamp and Actions */}
                      <div className="flex items-center gap-2 mt-1 px-1">
                        <span className="text-xs font-medium" style={{ color: '#ffa629' }}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <button
                          onClick={() => handleCopyMessage(message.text)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
                          title="Copy"
                        >
                          <Copy className="w-3 h-3" style={{ color: '#bc1823' }} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-[#ffa629] to-[#ffb84d]">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="inline-block rounded-2xl px-4 py-3 bg-gray-100">
                      <div className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#bc1823' }} />
                        <span className="text-sm font-medium" style={{ color: '#3d3d3d' }}>Thinking...</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Input Area */}
          <div className="flex-shrink-0 border-t-2 bg-white p-4" style={{ borderColor: '#e5e7eb' }}>
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask about export procedures, regulations..."
                  className="flex-1 px-4 py-3 border-2 rounded-xl focus:outline-none font-medium text-sm md:text-base"
                  style={{ color: '#3d3d3d', borderColor: '#e5e7eb' }}
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="px-6 py-3 rounded-xl text-white font-bold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all"
                  style={{ backgroundColor: '#bc1823' }}
                  disabled={isLoading || !chatInput.trim()}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISimulation;
