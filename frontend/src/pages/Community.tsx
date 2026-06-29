import { useState, useEffect } from 'react';
import { Trophy, MessageSquare, Eye, ThumbsUp, Tag, TrendingUp, Zap } from 'lucide-react';
import { communityService } from '@/services/complianceCommunityService';
import { useWebSocket } from '@/hooks/useWebSocket';
import type { LeaderboardEntry, CommunityThread, TrendingTopic } from '@/types/compliance-community-chatbot.types';

export default function Community() {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'threads' | 'trending'>('leaderboard');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [threads, setThreads] = useState<CommunityThread[]>([]);
  const [trending, setTrending] = useState<TrendingTopic[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  
  // WebSocket hook for real-time updates
  const { isConnected, subscribeToLeaderboard, subscribeToCommunity, on } = useWebSocket('current-user');

  useEffect(() => {
    setWsStatus(isConnected ? 'connected' : 'disconnected');
  }, [isConnected]);

  useEffect(() => {
    const loadData = async () => {
      const [lb, thrd, trend] = await Promise.all([
        communityService.getLeaderboard(),
        communityService.getThreads(selectedCategory),
        communityService.getTrendingTopics()
      ]);
      setLeaderboard(lb);
      setThreads(thrd);
      setTrending(trend);
    };
    loadData();
  }, [selectedCategory]);

  // Subscribe to real-time updates on mount
  useEffect(() => {
    subscribeToLeaderboard();
    subscribeToCommunity();
  }, [subscribeToLeaderboard, subscribeToCommunity]);

  // Listen for leaderboard updates
  useEffect(() => {
    const unsubscribe = on('leaderboard_update', async (event) => {
      console.log('🔄 Real-time leaderboard update received:', event.data);
      setLeaderboard(event.data);
    });
    return unsubscribe;
  }, [on]);

  // Listen for score updates
  useEffect(() => {
    const unsubscribe = on('score_updated', async (event) => {
      console.log('🏆 Real-time score update:', event.data);
      // Refresh leaderboard
      const lb = await communityService.getLeaderboard();
      setLeaderboard(lb);
    });
    return unsubscribe;
  }, [on]);

  // Listen for new threads
  useEffect(() => {
    const unsubscribe = on('thread_created', async (event) => {
      console.log('💬 New thread notification:', event.data);
      // Refresh threads
      const thrd = await communityService.getThreads(selectedCategory);
      setThreads(thrd);
    });
    return unsubscribe;
  }, [on, selectedCategory]);

  // Listen for trending updates
  useEffect(() => {
    const unsubscribe = on('trending_updated', (event) => {
      console.log('🔥 Trending topics update:', event.data);
      setTrending(event.data);
    });
    return unsubscribe;
  }, [on]);

  const categories = ['discussion', 'question', 'guide', 'news'];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Community & Leaderboard</h1>
              <p className="text-gray-300 text-lg">
                Connect with the quantum cryptography community and track your progress
              </p>
            </div>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${isConnected ? 'bg-green-900 bg-opacity-40 border border-green-500' : 'bg-red-900 bg-opacity-40 border border-red-500'}`}>
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className={isConnected ? 'text-green-400 text-sm font-semibold' : 'text-red-400 text-sm font-semibold'}>
                {isConnected ? '🔴 Live Updates' : '⚫ Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-700">
          {(['leaderboard', 'threads', 'trending'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 font-semibold transition border-b-2 ${
                activeTab === tab
                  ? 'text-blue-400 border-blue-400'
                  : 'text-gray-400 border-transparent hover:text-gray-300'
              }`}
            >
              {tab === 'leaderboard' && <Trophy className="w-5 h-5 inline mr-2" />}
              {tab === 'threads' && <MessageSquare className="w-5 h-5 inline mr-2" />}
              {tab === 'trending' && <TrendingUp className="w-5 h-5 inline mr-2" />}
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Leaderboard Tab */}
        {activeTab === 'leaderboard' && (
          <div className="bg-slate-800 border border-slate-700 rounded-lg overflow-hidden">
            <div className="p-6 border-b border-slate-700 bg-gradient-to-r from-slate-700 to-slate-800">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                Top Contributors
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700 bg-slate-700">
                    <th className="px-6 py-3 text-left text-gray-300 font-semibold">Rank</th>
                    <th className="px-6 py-3 text-left text-gray-300 font-semibold">User</th>
                    <th className="px-6 py-3 text-center text-gray-300 font-semibold">Score</th>
                    <th className="px-6 py-3 text-center text-gray-300 font-semibold">Assessments</th>
                    <th className="px-6 py-3 text-center text-gray-300 font-semibold">Achievements</th>
                    <th className="px-6 py-3 text-right text-gray-300 font-semibold">Last Active</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((entry, idx) => (
                    <tr
                      key={entry.userId}
                      className={`border-b border-slate-700 hover:bg-slate-700 transition ${idx === 0 ? 'bg-yellow-900 bg-opacity-20' : ''}`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {entry.rank === 1 && <span className="text-2xl">🥇</span>}
                          {entry.rank === 2 && <span className="text-2xl">🥈</span>}
                          {entry.rank === 3 && <span className="text-2xl">🥉</span>}
                          {entry.rank > 3 && <span className="text-white font-bold text-lg">#{entry.rank}</span>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{entry.avatar}</span>
                          <span className="text-white font-semibold">{entry.username}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-blue-400 font-bold text-lg">{entry.score}</span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-300">{entry.completedAssessments}</td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {Array(entry.achievements).fill(0).map((_, i) => (
                            <span key={i} className="text-lg">⭐</span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">{entry.lastActive}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Threads Tab */}
        {activeTab === 'threads' && (
          <div className="space-y-6">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <button
                onClick={() => setSelectedCategory(undefined)}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  !selectedCategory
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                }`}
              >
                All Categories
              </button>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    selectedCategory === cat
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </button>
              ))}
            </div>

            {/* Threads List */}
            <div className="space-y-4">
              {threads.map(thread => (
                <div
                  key={thread.id}
                  className="bg-slate-800 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-1">{thread.title}</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{thread.author.avatar}</span>
                        <span className="text-gray-300">{thread.author.username}</span>
                        <span className="text-xs bg-slate-700 px-2 py-1 rounded text-gray-400">
                          {thread.author.knowledgeLevel}
                        </span>
                      </div>
                    </div>
                    <span className={`text-xs px-3 py-1 rounded font-semibold ${
                      thread.category === 'question' ? 'bg-blue-900 text-blue-200' :
                      thread.category === 'guide' ? 'bg-green-900 text-green-200' :
                      thread.category === 'news' ? 'bg-purple-900 text-purple-200' :
                      'bg-gray-900 text-gray-200'
                    }`}>
                      {thread.category.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-gray-400 mb-3">{thread.content}</p>

                  <div className="flex gap-4 flex-wrap mb-3">
                    {thread.tags.map(tag => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-6 text-sm text-gray-400 border-t border-slate-700 pt-3">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      {thread.replies} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {thread.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {thread.upvotes} upvotes
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Trending Tab */}
        {activeTab === 'trending' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trending Topics */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-blue-400" />
                Trending Topics
              </h2>
              <div className="space-y-3">
                {trending.map((topic, idx) => (
                  <div
                    key={topic.tag}
                    className="flex items-center justify-between p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-blue-400">#{idx + 1}</span>
                      <div>
                        <p className="text-white font-semibold">{topic.tag}</p>
                        <p className="text-sm text-gray-400">{topic.count} discussions</p>
                      </div>
                    </div>
                    <Tag className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Showcase */}
            <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Top Achievements</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg">
                  <span className="text-3xl">🥇</span>
                  <div>
                    <p className="text-white font-semibold">Compliance Expert</p>
                    <p className="text-sm text-gray-400">Pass all NIST standards</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg">
                  <span className="text-3xl">🏆</span>
                  <div>
                    <p className="text-white font-semibold">Migration Champion</p>
                    <p className="text-sm text-gray-400">Complete full PQC migration</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg">
                  <span className="text-3xl">⭐</span>
                  <div>
                    <p className="text-white font-semibold">Community Hero</p>
                    <p className="text-sm text-gray-400">Help 10 community members</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-slate-700 rounded-lg">
                  <span className="text-3xl">🌱</span>
                  <div>
                    <p className="text-white font-semibold">Quantum Rookie</p>
                    <p className="text-sm text-gray-400">Complete first assessment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
