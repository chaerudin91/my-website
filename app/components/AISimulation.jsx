'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Loader2, Sparkles, FileText, Globe, DollarSign, Ship, AlertCircle, Settings, Trash2, Copy, Download, X } from 'lucide-react';

const AISimulation = () => {
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
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyModal, setShowApiKeyModal] = useState(false);
  const [apiKeyConfigured, setApiKeyConfigured] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Check if API key exists in localStorage
    const savedApiKey = localStorage.getItem('gemini_api_key');
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setApiKeyConfigured(true);
    } else {
      setShowApiKeyModal(true);
    }
  }, []);

  const scenarios = [
    {
      id: 'documentation',
      title: 'Export Documentation',
      icon: <FileText className="w-5 h-5" />,
      prompt: 'What are the essential documents required for exporting goods internationally? Please provide a comprehensive list with explanations.'
    },
    {
      id: 'customs',
      title: 'Customs Clearance',
      icon: <AlertCircle className="w-5 h-5" />,
      prompt: 'Explain the customs clearance process step by step and common issues exporters face. Include tips to avoid delays.'
    },
    {
      id: 'logistics',
      title: 'Shipping & Logistics',
      icon: <Ship className="w-5 h-5" />,
      prompt: 'What are the different international shipping methods (air, sea, land) and how do I choose the best one for my export business?'
    },
    {
      id: 'payment',
      title: 'Payment Terms',
      icon: <DollarSign className="w-5 h-5" />,
      prompt: 'Explain international payment terms like Letter of Credit (L/C), Telegraphic Transfer (T/T), and Documents against Payment (D/P) for export transactions.'
    },
    {
      id: 'compliance',
      title: 'Trade Compliance',
      icon: <Globe className="w-5 h-5" />,
      prompt: 'What are the key compliance requirements and regulations for international trade that exporters must follow?'
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
    'What is export credit insurance?'
  ];

  const callGeminiAPI = async (userMessage) => {
    try {
      // Updated to use gemini-1.5-flash model
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
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
            },
            safetySettings: [
              {
                category: "HARM_CATEGORY_HARASSMENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_HATE_SPEECH",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              },
              {
                category: "HARM_CATEGORY_DANGEROUS_CONTENT",
                threshold: "BLOCK_MEDIUM_AND_ABOVE"
              }
            ]
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
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key not valid')) {
        return 'Error: Your API key appears to be invalid. Please check your API key configuration and try again.\n\nMake sure you have:\n1. Created an API key at https://aistudio.google.com/app/apikey\n2. Copied the entire key including "AIza..."\n3. Enabled the Generative Language API in your Google Cloud Console';
      } else if (error.message.includes('QUOTA_EXCEEDED') || error.message.includes('quota')) {
        return 'Error: API quota exceeded. Please check your Gemini API usage limits or try again later.';
      } else if (error.message.includes('not found')) {
        return 'Error: Model not found. The API is using gemini-1.5-flash model. Please ensure your API key has access to this model.';
      }
      return `I apologize, but I encountered an error: ${error.message}.\n\nPlease try again or check your API key configuration.`;
    }
  };

  const handleSendMessage = async (e, customMessage = null) => {
    e?.preventDefault();
    const messageToSend = customMessage || chatInput.trim();
    
    if (!messageToSend) return;

    if (!apiKey || !apiKeyConfigured) {
      setShowApiKeyModal(true);
      return;
    }

    // Add user message
    const userMessage = {
      type: 'user',
      text: messageToSend,
      timestamp: new Date()
    };
    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setIsLoading(true);

    // Get AI response
    const aiResponse = await callGeminiAPI(messageToSend);

    // Add bot response
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

  const handleSaveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey);
      setApiKeyConfigured(true);
      setShowApiKeyModal(false);
      setChatMessages([{
        type: 'bot',
        text: '✅ API Key configured successfully! I\'m now ready to assist you with all your export-related questions. What would you like to know?',
        timestamp: new Date()
      }]);
    } else {
      alert('Please enter a valid API key.');
    }
  };

  const handleClearChat = () => {
    if (confirm('Are you sure you want to clear all chat messages?')) {
      setChatMessages([{
        type: 'bot',
        text: 'Chat cleared. How can I help you today?',
        timestamp: new Date()
      }]);
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
    <div>
      {/* API Key Configuration Modal */}
      {showApiKeyModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold" style={{ color: '#000' }}>Configure Gemini AI</h3>
              {apiKeyConfigured && (
                <button onClick={() => setShowApiKeyModal(false)} className="text-gray-500 hover:text-gray-700">
                  <X className="w-6 h-6" />
                </button>
              )}
            </div>
            
            <p className="text-sm mb-4" style={{ color: '#000' }}>
              To use the AI Export Assistant, you need a free Gemini API key from Google.
            </p>
            
            <div className="bg-gray-50 border-2 border-gray-200 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold mb-2" style={{ color: '#000' }}>How to get your API key:</p>
              <ol className="text-sm space-y-1 ml-4 list-decimal" style={{ color: '#000' }}>
                <li>Visit <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="font-semibold underline" style={{ color: '#bc1823' }}>Google AI Studio</a></li>
                <li>Sign in with your Google account</li>
                <li>Click "Create API Key"</li>
                <li>Copy the entire key (starts with AIza...)</li>
                <li>Paste it below</li>
              </ol>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2" style={{ color: '#000' }}>
                Gemini API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza... (paste your full API key)"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
              />
            </div>

            <button
              onClick={handleSaveApiKey}
              className="w-full px-6 py-3 rounded-lg text-white font-semibold"
              style={{ backgroundColor: '#bc1823' }}
            >
              Save & Continue
            </button>

            <p className="text-xs text-gray-500 mt-4 text-center">
              Your API key is stored locally in your browser and never sent to our servers
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#000' }}>
            AI Virtual Export Simulation
          </h1>
          <p className="flex items-center gap-2" style={{ color: '#000' }}>
            <Sparkles className="w-4 h-4" style={{ color: '#bc1823' }} />
            <span className="font-semibold">Powered by Gemini 1.5 Flash</span>
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowApiKeyModal(true)}
            className="px-4 py-2 rounded-lg border-2 font-semibold text-sm flex items-center gap-2"
            style={{ borderColor: '#bc1823', color: '#bc1823' }}
          >
            <Settings className="w-4 h-4" />
            <span className="hidden sm:inline">Settings</span>
          </button>
          <button
            onClick={handleClearChat}
            className="px-4 py-2 rounded-lg border-2 font-semibold text-sm flex items-center gap-2"
            style={{ borderColor: '#bc1823', color: '#bc1823' }}
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
          <button
            onClick={handleExportChat}
            className="px-4 py-2 rounded-lg text-white font-semibold text-sm flex items-center gap-2"
            style={{ backgroundColor: '#bc1823' }}
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-3 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col" style={{ height: '650px', border: '2px solid #f0f0f0' }}>
          <div className="p-4 border-b-2" style={{ backgroundColor: '#bc1823' }}>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Bot className="w-6 h-6" />
              AI Export Assistant
            </h2>
            <p className="text-sm text-white opacity-90 mt-1">
              {apiKeyConfigured ? 'Ask me anything about international trade' : 'Please configure your API key to start'}
            </p>
          </div>
          
          {/* Messages Container - NO AUTO SCROLL */}
          <div 
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50"
          >
            {chatMessages.map((message, index) => (
              <div key={index} className="group">
                <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className="relative max-w-2xl">
                    <div className={`px-4 py-3 rounded-lg shadow-sm ${
                      message.type === 'user' 
                        ? 'text-white' 
                        : 'bg-white border-2 border-gray-100'
                    }`} style={message.type === 'user' ? { backgroundColor: '#bc1823' } : {}}>
                      <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: message.type === 'user' ? '#fff' : '#000' }}>
                        {formatMessage(message.text)}
                      </div>
                      <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-white opacity-70' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    
                    {/* Copy button */}
                    <button
                      onClick={() => handleCopyMessage(message.text)}
                      className="absolute -right-8 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-gray-100"
                      title="Copy message"
                    >
                      <Copy className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border-2 border-gray-100 px-4 py-3 rounded-lg shadow-sm">
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-5 h-5 animate-spin" style={{ color: '#bc1823' }} />
                    <span className="text-sm" style={{ color: '#000' }}>AI is analyzing your question...</span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="p-4 border-t-2 bg-white" style={{ borderColor: '#f0f0f0' }}>
            <div className="flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder={apiKeyConfigured ? "Ask about export procedures, documentation, regulations..." : "Please configure your API key first"}
                className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-black focus:outline-none"
                style={{ color: '#000' }}
                disabled={isLoading || !apiKeyConfigured}
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-lg text-white font-semibold flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ backgroundColor: '#bc1823' }}
                disabled={isLoading || !apiKeyConfigured}
              >
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
          </form>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Simulation Scenarios */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#f0f0f0' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#000' }}>
              Simulation Scenarios
            </h3>
            <div className="space-y-2">
              {scenarios.map((scenario) => (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioClick(scenario)}
                  className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-red-600 bg-red-50'
                      : 'border-gray-200 hover:border-red-600'
                  }`}
                  style={{ color: '#000' }}
                  disabled={isLoading || !apiKeyConfigured}
                >
                  <div className="flex items-center gap-3">
                    <div style={{ color: selectedScenario === scenario.id ? '#bc1823' : '#000' }}>
                      {scenario.icon}
                    </div>
                    <p className="font-semibold text-sm">
                      {scenario.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Questions */}
          <div className="bg-white rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#f0f0f0' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#000' }}>
              Quick Questions
            </h3>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-all text-sm"
                  style={{ color: '#000' }}
                  disabled={isLoading || !apiKeyConfigured}
                >
                  💡 {question}
                </button>
              ))}
            </div>
          </div>

          {/* Pro Tips */}
          <div className="bg-red-50 rounded-xl p-6 shadow-lg border-2" style={{ borderColor: '#bc1823' }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: '#bc1823' }}>
              Pro Tips
            </h3>
            <div className="space-y-3 text-sm" style={{ color: '#000' }}>
              <p className="flex items-start gap-2">
                <span>🎯</span>
                <span>Be specific with your questions for better AI responses</span>
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
                <span>Use the Export button to save important conversations</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AISimulation;
