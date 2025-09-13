import React, { useState, useEffect } from 'react';
import { Heart, TrendingUp, Calendar, BarChart3, Smile, Sun, Moon, Activity, Award, Target, BookOpen, Brain, Zap, Coffee, Music, Users, MessageCircle, Bell, Settings, Plus, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

const MindfulApp = () => {
  const [currentMood, setCurrentMood] = useState(5);
  const [moodNote, setMoodNote] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [streakCount, setStreakCount] = useState(12);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [moodData, setMoodData] = useState([
    { date: '2024-09-07', mood: 7, note: 'Great start to the week!', category: 'work', activities: ['exercise', 'meditation'] },
    { date: '2024-09-08', mood: 6, note: 'Productive day at work', category: 'work', activities: ['work'] },
    { date: '2024-09-09', mood: 8, note: 'Had an amazing workout session', category: 'health', activities: ['exercise', 'social'] },
    { date: '2024-09-10', mood: 5, note: 'Feeling balanced today', category: 'personal', activities: ['meditation'] },
    { date: '2024-09-11', mood: 9, note: 'Wonderful time with friends!', category: 'social', activities: ['social', 'entertainment'] },
    { date: '2024-09-12', mood: 4, note: 'Bit overwhelmed with deadlines', category: 'work', activities: ['work'] },
    { date: '2024-09-13', mood: 7, note: 'Relaxing weekend vibes', category: 'personal', activities: ['relaxation'] }
  ]);

  const moodEmojis = {
    1: '😭', 2: '😢', 3: '😔', 4: '🙁', 5: '😐',
    6: '🙂', 7: '😊', 8: '😄', 9: '😁', 10: '🤩'
  };

  const categories = [
    { id: 'all', label: 'All', color: 'bg-gray-500' },
    { id: 'work', label: 'Work', color: 'bg-blue-500' },
    { id: 'health', label: 'Health', color: 'bg-green-500' },
    { id: 'social', label: 'Social', color: 'bg-pink-500' },
    { id: 'personal', label: 'Personal', color: 'bg-purple-500' }
  ];

  const activities = [
    { id: 'exercise', label: 'Exercise', icon: Activity, color: 'bg-green-100 text-green-800' },
    { id: 'meditation', label: 'Meditation', icon: Brain, color: 'bg-purple-100 text-purple-800' },
    { id: 'social', label: 'Social', icon: Users, color: 'bg-pink-100 text-pink-800' },
    { id: 'work', label: 'Work', icon: Coffee, color: 'bg-blue-100 text-blue-800' },
    { id: 'relaxation', label: 'Relaxation', icon: Moon, color: 'bg-indigo-100 text-indigo-800' },
    { id: 'entertainment', label: 'Fun', icon: Music, color: 'bg-yellow-100 text-yellow-800' }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getMoodColor = (mood) => {
    if (mood <= 3) return 'from-red-400 to-red-600';
    if (mood <= 5) return 'from-amber-400 to-orange-500';
    if (mood <= 7) return 'from-cyan-400 to-blue-500';
    return 'from-emerald-400 to-green-500';
  };

  const analyzeSentiment = (note) => {
    const positiveWords = ['great', 'amazing', 'wonderful', 'fantastic', 'excellent', 'good', 'happy', 'excited', 'productive', 'relaxing', 'balanced'];
    const negativeWords = ['bad', 'terrible', 'awful', 'stressed', 'overwhelmed', 'anxious', 'worried', 'sad', 'tired', 'frustrated'];
    
    const words = note.toLowerCase().split(' ');
    const positiveCount = words.filter(word => positiveWords.some(pw => word.includes(pw))).length;
    const negativeCount = words.filter(word => negativeWords.some(nw => word.includes(nw))).length;
    
    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  };

  const getPersonalizedRecommendations = () => {
    const recentMoods = moodData.slice(-5).map(d => d.mood);
    const avgMood = recentMoods.reduce((a, b) => a + b, 0) / recentMoods.length;
    const timeOfDay = currentTime.getHours();
    
    let recommendations = [];
    
    if (avgMood <= 4) {
      recommendations = [
        { icon: <Sun className="w-5 h-5" />, title: "Sunlight Therapy", desc: "Step outside for 15 minutes of natural light", color: "bg-yellow-100 text-yellow-800", priority: "high" },
        { icon: <Brain className="w-5 h-5" />, title: "Mindfulness Break", desc: "Try a 5-minute breathing exercise", color: "bg-purple-100 text-purple-800", priority: "high" },
        { icon: <MessageCircle className="w-5 h-5" />, title: "Connect", desc: "Reach out to a friend or family member", color: "bg-pink-100 text-pink-800", priority: "medium" },
        { icon: <Music className="w-5 h-5" />, title: "Uplifting Music", desc: "Listen to your favorite energizing playlist", color: "bg-blue-100 text-blue-800", priority: "low" }
      ];
    } else if (avgMood <= 6) {
      recommendations = [
        { icon: <Activity className="w-5 h-5" />, title: "Light Movement", desc: "Take a gentle walk or do some stretching", color: "bg-green-100 text-green-800", priority: "high" },
        { icon: <Target className="w-5 h-5" />, title: "Small Win", desc: "Complete one small task to build momentum", color: "bg-blue-100 text-blue-800", priority: "medium" },
        { icon: <BookOpen className="w-5 h-5" />, title: "Gratitude Practice", desc: "Write down 3 things you appreciate today", color: "bg-purple-100 text-purple-800", priority: "medium" },
        { icon: <Coffee className="w-5 h-5" />, title: "Self Care", desc: "Enjoy a warm drink and take a moment", color: "bg-amber-100 text-amber-800", priority: "low" }
      ];
    } else {
      recommendations = [
        { icon: <Award className="w-5 h-5" />, title: "Celebrate!", desc: "Acknowledge your positive energy today", color: "bg-emerald-100 text-emerald-800", priority: "high" },
        { icon: <Users className="w-5 h-5" />, title: "Share Joy", desc: "Spread positivity with those around you", color: "bg-pink-100 text-pink-800", priority: "medium" },
        { icon: <Zap className="w-5 h-5" />, title: "New Challenge", desc: "Try something new while you're feeling great", color: "bg-orange-100 text-orange-800", priority: "medium" },
        { icon: <Heart className="w-5 h-5" />, title: "Pay It Forward", desc: "Do something kind for someone else", color: "bg-red-100 text-red-800", priority: "low" }
      ];
    }

    // Add time-based recommendations
    if (timeOfDay < 10) {
      recommendations.unshift({ 
        icon: <Sun className="w-5 h-5" />, 
        title: "Morning Routine", 
        desc: "Start your day with intention and energy", 
        color: "bg-yellow-100 text-yellow-800", 
        priority: "time-based" 
      });
    } else if (timeOfDay > 18) {
      recommendations.push({ 
        icon: <Moon className="w-5 h-5" />, 
        title: "Evening Wind Down", 
        desc: "Prepare for restful sleep with relaxation", 
        color: "bg-indigo-100 text-indigo-800", 
        priority: "time-based" 
      });
    }

    return recommendations.slice(0, 4);
  };

  const submitMoodCheckin = () => {
    const today = new Date().toISOString().split('T')[0];
    const newEntry = { 
      date: today, 
      mood: currentMood, 
      note: moodNote,
      category: selectedCategory === 'all' ? 'personal' : selectedCategory,
      activities: []
    };
    setMoodData([...moodData, newEntry]);
    setMoodNote('');
    setCurrentMood(5);
    setStreakCount(prev => prev + 1);
  };

  const chartData = moodData.map((entry, index) => ({
    day: new Date(entry.date).toLocaleDateString('en-US', { weekday: 'short' }),
    mood: entry.mood,
    date: entry.date,
    sentiment: analyzeSentiment(entry.note)
  }));

  const sentimentData = [
    { name: 'Positive', value: moodData.filter(d => analyzeSentiment(d.note) === 'positive').length, fill: '#10b981' },
    { name: 'Neutral', value: moodData.filter(d => analyzeSentiment(d.note) === 'neutral').length, fill: '#6b7280' },
    { name: 'Negative', value: moodData.filter(d => analyzeSentiment(d.note) === 'negative').length, fill: '#ef4444' }
  ];

  const categoryData = categories.slice(1).map(cat => ({
    name: cat.label,
    value: moodData.filter(d => d.category === cat.id).length,
    color: cat.color.replace('bg-', '').replace('-500', '')
  }));

  const getGreeting = () => {
    const hour = currentTime.getHours();
    const name = "Alex"; // Could be dynamic
    if (hour < 12) return `Good morning, ${name}!`;
    if (hour < 17) return `Good afternoon, ${name}!`;
    return `Good evening, ${name}!`;
  };

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'checkin', label: 'Check-in', icon: Smile },
    { id: 'trends', label: 'Analytics', icon: TrendingUp },
    { id: 'insights', label: 'Insights', icon: Brain }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pt-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Mindful
              </h1>
              <p className="text-gray-600">Mental wellness made simple</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">{currentTime.toLocaleDateString()}</p>
              <p className="text-lg font-semibold text-gray-700">{currentTime.toLocaleTimeString()}</p>
            </div>
            <button className="p-3 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
              <Bell className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex bg-white rounded-2xl p-2 mb-8 shadow-xl overflow-x-auto">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-fit flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id 
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg transform scale-105' 
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Greeting & Quick Stats */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
              <h2 className="text-2xl font-bold mb-2">{getGreeting()}</h2>
              <p className="text-indigo-100 mb-6">How are you feeling today? Your wellness journey continues!</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5" />
                    <span className="font-medium">Streak</span>
                  </div>
                  <p className="text-2xl font-bold">{streakCount} days</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5" />
                    <span className="font-medium">Avg Mood</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {(moodData.reduce((a, b) => a + b.mood, 0) / moodData.length).toFixed(1)}
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Check-ins</span>
                  </div>
                  <p className="text-2xl font-bold">{moodData.length}</p>
                </div>
                <div className="bg-white/20 rounded-xl p-4 backdrop-blur">
                  <div className="flex items-center gap-2 mb-2">
                    <Heart className="w-5 h-5" />
                    <span className="font-medium">Wellness</span>
                  </div>
                  <p className="text-2xl font-bold">
                    {moodData.slice(-3).every(d => d.mood >= 6) ? 'Great' : 'Good'}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Check-in */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">Quick Check-in</h3>
                <button 
                  onClick={() => setActiveTab('checkin')}
                  className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center gap-1"
                >
                  Full Check-in <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-4 mb-6">
                {[1, 3, 5, 7, 9].map(mood => (
                  <button
                    key={mood}
                    onClick={() => {
                      setCurrentMood(mood);
                      const today = new Date().toISOString().split('T')[0];
                      const quickEntry = { date: today, mood, note: 'Quick check-in', category: 'personal', activities: [] };
                      setMoodData(prev => [...prev, quickEntry]);
                    }}
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl transition-all hover:scale-110 ${
                      mood <= 3 ? 'bg-red-100 hover:bg-red-200' :
                      mood <= 5 ? 'bg-yellow-100 hover:bg-yellow-200' :
                      mood <= 7 ? 'bg-blue-100 hover:bg-blue-200' :
                      'bg-green-100 hover:bg-green-200'
                    }`}
                  >
                    {moodEmojis[mood]}
                  </button>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Personalized for You</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {getPersonalizedRecommendations().map((rec, index) => (
                  <div key={index} className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-md cursor-pointer ${
                    rec.priority === 'high' ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200' :
                    rec.priority === 'time-based' ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' :
                    'bg-gray-50 hover:bg-gray-100'
                  }`}>
                    <div className={`p-3 rounded-full ${rec.color}`}>
                      {rec.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800 mb-1">{rec.title}</h4>
                      <p className="text-gray-600 text-sm">{rec.desc}</p>
                      {rec.priority === 'high' && (
                        <span className="inline-block mt-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                          Priority
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Check-in Tab */}
        {activeTab === 'checkin' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">How are you feeling right now?</h2>
              
              {/* Mood Selector */}
              <div className="mb-8">
                <div className="flex justify-center mb-6">
                  <div className={`w-28 h-28 rounded-full bg-gradient-to-r ${getMoodColor(currentMood)} flex items-center justify-center text-5xl shadow-xl`}>
                    {moodEmojis[currentMood]}
                  </div>
                </div>
                
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={currentMood}
                  onChange={(e) => setCurrentMood(parseInt(e.target.value))}
                  className="w-full h-4 bg-gray-200 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      #ef4444 0%, #f59e0b 20%, #eab308 40%, 
                      #3b82f6 60%, #10b981 80%, #10b981 100%)`
                  }}
                />
                <div className="flex justify-between text-sm text-gray-500 mt-3">
                  <span>Very Low</span>
                  <span>Low</span>
                  <span>Neutral</span>
                  <span>Good</span>
                  <span>Excellent</span>
                </div>
              </div>

              {/* Category Selection */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-3">What's this about?</label>
                <div className="flex flex-wrap gap-3">
                  {categories.slice(1).map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`px-4 py-2 rounded-full transition-all ${
                        selectedCategory === category.id
                          ? `${category.color} text-white shadow-lg`
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Note Input */}
              <div className="mb-8">
                <label className="block text-gray-700 font-medium mb-3">Tell us more (Optional)</label>
                <textarea
                  value={moodNote}
                  onChange={(e) => setMoodNote(e.target.value)}
                  placeholder="What's happening in your world today? How are you feeling?"
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>

              <button
                onClick={submitMoodCheckin}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white py-4 px-6 rounded-xl font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
              >
                Save My Check-in
              </button>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-8">
            {/* Mood Trend Chart */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Mood Trends</h2>
              
              <div className="h-80 mb-6">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                    <XAxis dataKey="day" stroke="#64748b" />
                    <YAxis domain={[1, 10]} stroke="#64748b" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff', 
                        border: 'none', 
                        borderRadius: '12px', 
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)' 
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="mood" 
                      stroke="#6366f1" 
                      strokeWidth={3}
                      fill="url(#moodGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Statistics Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100">
                  <h4 className="font-semibold text-blue-800 mb-2">Average Mood</h4>
                  <p className="text-3xl font-bold text-blue-600">
                    {(moodData.reduce((a, b) => a + b.mood, 0) / moodData.length).toFixed(1)}
                  </p>
                  <p className="text-sm text-blue-600 mt-1">out of 10</p>
                </div>
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-100">
                  <h4 className="font-semibold text-green-800 mb-2">Best Day</h4>
                  <p className="text-3xl font-bold text-green-600">
                    {Math.max(...moodData.map(d => d.mood))} {moodEmojis[Math.max(...moodData.map(d => d.mood))]}
                  </p>
                  <p className="text-sm text-green-600 mt-1">peak mood</p>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-2xl border border-purple-100">
                  <h4 className="font-semibold text-purple-800 mb-2">Consistency</h4>
                  <p className="text-3xl font-bold text-purple-600">{streakCount}</p>
                  <p className="text-sm text-purple-600 mt-1">day streak</p>
                </div>
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-2xl border border-amber-100">
                  <h4 className="font-semibold text-amber-800 mb-2">Progress</h4>
                  <p className="text-3xl font-bold text-amber-600">
                    {moodData.slice(-3).reduce((a, b) => a + b.mood, 0) > 
                     moodData.slice(-6, -3).reduce((a, b) => a + b.mood, 0) ? '📈' : '📊'}
                  </p>
                  <p className="text-sm text-amber-600 mt-1">trending</p>
                </div>
              </div>
            </div>

            {/* Sentiment Analysis */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Sentiment Analysis</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sentimentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex justify-center gap-4 mt-4">
                  {sentimentData.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{backgroundColor: item.fill}}></div>
                      <span className="text-sm text-gray-600">{item.name} ({item.value})</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Category Breakdown</h3>
                <div className="space-y-4">
                  {categoryData.map((category, index) => {
                    const percentage = Math.round((category.value / moodData.length) * 100);
                    return (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full bg-${category.color}-500`}></div>
                          <span className="font-medium text-gray-700">{category.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div 
                              className={`bg-${category.color}-500 h-2 rounded-full transition-all duration-300`}
                              style={{width: `${percentage}%`}}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insights Tab */}
        {activeTab === 'insights' && (
          <div className="space-y-8">
            {/* AI Insights */}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
              <div className="flex items-center gap-3 mb-6">
                <Brain className="w-8 h-8" />
                <h2 className="text-2xl font-bold">AI Wellness Insights</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white/20 rounded-xl p-6 backdrop-blur">
                  <h4 className="font-semibold mb-3">📊 Pattern Recognition</h4>
                  <p className="text-cyan-100">
                    Your mood tends to be highest on days when you engage in physical activity. 
                    Consider incorporating more movement into your routine.
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-6 backdrop-blur">
                  <h4 className="font-semibold mb-3">🎯 Goal Suggestion</h4>
                  <p className="text-cyan-100">
                    You've maintained a {streakCount}-day streak! Try setting a goal of 30 consecutive days 
                    to build a lasting wellness habit.
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-6 backdrop-blur">
                  <h4 className="font-semibold mb-3">💡 Wellness Tip</h4>
                  <p className="text-cyan-100">
                    Your entries show improved sentiment when you write longer notes. 
                    Consider using journaling as a therapeutic tool.
                  </p>
                </div>
                <div className="bg-white/20 rounded-xl p-6 backdrop-blur">
                  <h4 className="font-semibold mb-3">🌟 Achievement</h4>
                  <p className="text-cyan-100">
                    You've shown remarkable consistency in tracking your mental health. 
                    This self-awareness is a key step in your wellness journey!
                  </p>
                </div>
              </div>
            </div>

            {/* Recent Entries */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Check-ins</h2>
              
              <div className="space-y-4">
                {moodData.slice(-5).reverse().map((entry, index) => (
                  <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
                    <div className="text-3xl">{moodEmojis[entry.mood]}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold text-gray-800">Mood: {entry.mood}/10</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          analyzeSentiment(entry.note) === 'positive' ? 'bg-green-100 text-green-800' :
                          analyzeSentiment(entry.note) === 'negative' ? 'bg-red-100 text-red-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {analyzeSentiment(entry.note)}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          entry.category === 'work' ? 'bg-blue-100 text-blue-800' :
                          entry.category === 'health' ? 'bg-green-100 text-green-800' :
                          entry.category === 'social' ? 'bg-pink-100 text-pink-800' :
                          'bg-purple-100 text-purple-800'
                        }`}>
                          {entry.category}
                        </span>
                      </div>
                      <p className="text-gray-700 mb-2">{entry.note}</p>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500">{new Date(entry.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}</p>
                        {entry.activities && entry.activities.length > 0 && (
                          <div className="flex gap-1">
                            {entry.activities.slice(0, 3).map((activity, i) => {
                              const activityData = activities.find(a => a.id === activity);
                              return activityData ? (
                                <span key={i} className={`px-2 py-1 rounded-full text-xs ${activityData.color}`}>
                                  {activityData.label}
                                </span>
                              ) : null;
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Wellness Goals */}
            <div className="bg-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Wellness Goals</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl border border-emerald-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-emerald-800">Daily Check-ins</h4>
                    <Target className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-emerald-700">Progress</span>
                    <span className="text-sm font-medium text-emerald-800">{streakCount}/30 days</span>
                  </div>
                  <div className="w-full bg-emerald-200 rounded-full h-3">
                    <div 
                      className="bg-emerald-500 h-3 rounded-full transition-all duration-300"
                      style={{width: `${Math.min((streakCount / 30) * 100, 100)}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-emerald-600 mt-2">
                    {30 - streakCount > 0 ? `${30 - streakCount} more days to reach your goal!` : 'Goal achieved! 🎉'}
                  </p>
                </div>

                <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-blue-800">Positive Sentiment</h4>
                    <Heart className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-blue-700">This week</span>
                    <span className="text-sm font-medium text-blue-800">
                      {Math.round((sentimentData[0].value / moodData.length) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div 
                      className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{width: `${(sentimentData[0].value / moodData.length) * 100}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-blue-600 mt-2">
                    Great job maintaining positive thoughts!
                  </p>
                </div>
              </div>
            </div>

            {/* Monthly Summary */}
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-xl font-bold mb-6">This Month's Wellness Summary</h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl mb-2">🎯</div>
                  <h4 className="font-semibold mb-2">Most Productive</h4>
                  <p className="text-purple-100">Work-related moods averaged 6.5/10</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">💪</div>
                  <h4 className="font-semibold mb-2">Health Focus</h4>
                  <p className="text-purple-100">Exercise days showed 23% higher mood scores</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-2">🌟</div>
                  <h4 className="font-semibold mb-2">Growth</h4>
                  <p className="text-purple-100">Sentiment analysis improved by 15% this month</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">
            Remember: This app is a wellness companion, not a replacement for professional mental health care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MindfulApp;