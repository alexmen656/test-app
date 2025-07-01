'use client'; // This directive is necessary for using hooks like useState

import Image from 'next/image';
import type { FC } from 'react';
import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppCard from '@/components/AppCard'; // Import the AppCard component
import { useAuth } from '@/hooks/useAuth';
import { App } from '@/types'; // Import the App type from the explore page
import AppListCard from '@/components/AppListCard';

// Define the structure for an app object

// Mock data for the apps. In a real application, you would fetch this from an API.

// --- DATA STRUCTURE AND MOCK DATA ---
// Expanded data structure for the app details page.
 
// Expanded mock data for the apps.
const allApps: App[] = [
  {
    id: 1,
    name: 'Stellar Navigator',
    creator: { name: 'CosmoDev', avatarUrl: 'https://placehold.co/40x40/2D3748/FFFFFF?text=C' },
    price: '$4.99',
    coins: 500,
    coverImageUrl: 'https://placehold.co/1200x400/2D3748/FFFFFF?text=Stellar+Navigator',
    iconUrl: 'https://placehold.co/150x150/2D3748/FFFFFF?text=SN',
    description: 'Explore the vastness of space with Stellar Navigator. Chart new galaxies, discover unknown planets, and trade resources in this epic space exploration simulator. Built with a realistic physics engine and stunning visuals.',
    screenshots: [
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Galaxy+View',
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Planet+Surface',
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Trading+Post',
      'https://placehold.co/600x400/2D3748/FFFFFF?text=Ship+Cockpit',
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    reviews: [
      { id: 1, reviewerName: 'GalacticGamer', score: 5, comment: 'Absolutely breathtaking! A must-have for any space enthusiast.' },
      { id: 2, reviewerName: 'AstroJunkie', score: 4, comment: 'Great game, but the trading system could be improved.' },
    ],
    joinedTesters: [
      { id: 1, name: 'TestPilot1', avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=T1' },
      { id: 2, name: 'ExplorerX', avatarUrl: 'https://placehold.co/40x40/718096/FFFFFF?text=EX' },
    ],
  },
  {
    id: 2,
    name: 'Aqua Planner',
    creator: { name: 'Oceanic Builds', avatarUrl: 'https://placehold.co/40x40/4A5568/FFFFFF?text=O', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
    price: 'Free',
    coverImageUrl: 'https://placehold.co/1200x400/4A5568/FFFFFF?text=Aqua+Planner',
    iconUrl: 'https://placehold.co/150x150/4A5568/FFFFFF?text=AP',
    description: 'Organize your life with Aqua Planner, the fluid and intuitive task manager. With a clean interface and powerful features, you can manage projects, set reminders, and collaborate with your team seamlessly.',
    screenshots: [
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Dashboard',
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Task+View',
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Calendar',
      'https://placehold.co/600x400/4A5568/FFFFFF?text=Collaboration',
    ],
    reviews: [
      { id: 1, reviewerName: 'ProductivityPro', score: 5, comment: 'The best planner I have ever used. Changed my workflow completely.' },
    ],
    joinedTesters: [
      { id: 1, name: 'BetaUser', avatarUrl: 'https://placehold.co/40x40/A0AEC0/FFFFFF?text=BU' },
    ],
  },
  {
    id: 3,
    name: 'Neon Racer',
    creator: { name: 'SpeedForge', avatarUrl: 'https://placehold.co/40x40/7C3AED/FFFFFF?text=SF', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
    price: '$9.99',
    coins: 750,
    coverImageUrl: 'https://placehold.co/1200x400/7C3AED/FFFFFF?text=Neon+Racer',
    iconUrl: 'https://placehold.co/150x150/7C3AED/FFFFFF?text=NR',
    description: 'Experience high-speed cyberpunk racing in Neon Racer. Navigate through futuristic cityscapes, customize your vehicles, and compete in underground tournaments. Features stunning neon visuals and electronic soundtrack.',
    screenshots: [
      'https://placehold.co/600x400/7C3AED/FFFFFF?text=Night+Race',
      'https://placehold.co/600x400/7C3AED/FFFFFF?text=Car+Garage',
      'https://placehold.co/600x400/7C3AED/FFFFFF?text=City+Track',
      'https://placehold.co/600x400/7C3AED/FFFFFF?text=Tournament',
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    reviews: [
      { id: 1, reviewerName: 'SpeedDemon', score: 5, comment: 'The graphics are insane! Best racing game this year.' },
      { id: 2, reviewerName: 'CyberPunkFan', score: 4, comment: 'Love the aesthetic and music, controls could be tighter.' },
      { id: 3, reviewerName: 'RaceKing', score: 5, comment: 'Addictive gameplay, spent hours customizing my ride!' },
    ],
    joinedTesters: [
      { id: 1, name: 'TurboTester', avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=TT' },
      { id: 2, name: 'NeonFan', avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=NF' },
      { id: 3, name: 'RaceReviewer', avatarUrl: 'https://placehold.co/40x40/EC4899/FFFFFF?text=RR' },
    ],
  },
  {
    id: 4,
    name: 'Mindful Meditation',
    creator: { name: 'Zen Studios', avatarUrl: 'https://placehold.co/40x40/059669/FFFFFF?text=ZS', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
    price: '$2.99',
    coins: 200,
    coverImageUrl: 'https://placehold.co/1200x400/059669/FFFFFF?text=Mindful+Meditation',
    iconUrl: 'https://placehold.co/150x150/059669/FFFFFF?text=MM',
    description: 'Find inner peace with Mindful Meditation. Guided sessions, breathing exercises, and nature sounds help you reduce stress and improve focus. Perfect for beginners and experienced practitioners alike.',
    screenshots: [
      'https://placehold.co/600x400/059669/FFFFFF?text=Meditation+Timer',
      'https://placehold.co/600x400/059669/FFFFFF?text=Guided+Sessions',
      'https://placehold.co/600x400/059669/FFFFFF?text=Nature+Sounds',
      'https://placehold.co/600x400/059669/FFFFFF?text=Progress+Track',
    ],
    reviews: [
      { id: 1, reviewerName: 'CalmSeeker', score: 5, comment: 'This app has genuinely improved my mental health. Highly recommend!' },
      { id: 2, reviewerName: 'StressedOut', score: 4, comment: 'Great for daily meditation, love the nature sounds feature.' },
    ],
    joinedTesters: [
      { id: 1, name: 'ZenMaster', avatarUrl: 'https://placehold.co/40x40/10B981/FFFFFF?text=ZM' },
      { id: 2, name: 'PeacefulSoul', avatarUrl: 'https://placehold.co/40x40/10B981/FFFFFF?text=PS' },
    ],
  },
  {
    id: 5,
    name: 'Code Quest',
    creator: { name: 'DevAcademy', avatarUrl: 'https://placehold.co/40x40/DC2626/FFFFFF?text=DA', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
    price: 'Free',
    coverImageUrl: 'https://placehold.co/1200x400/DC2626/FFFFFF?text=Code+Quest',
    iconUrl: 'https://placehold.co/150x150/DC2626/FFFFFF?text=CQ',
    description: 'Learn programming through gamification with Code Quest. Solve coding challenges, unlock achievements, and progress through different difficulty levels. Supports multiple programming languages including Python, JavaScript, and Java.',
    screenshots: [
      'https://placehold.co/600x400/DC2626/FFFFFF?text=Challenge+Mode',
      'https://placehold.co/600x400/DC2626/FFFFFF?text=Code+Editor',
      'https://placehold.co/600x400/DC2626/FFFFFF?text=Progress+Map',
      'https://placehold.co/600x400/DC2626/FFFFFF?text=Leaderboard',
    ],
    reviews: [
      { id: 1, reviewerName: 'CodeNewbie', score: 5, comment: 'Finally learning to code is fun! Great for beginners.' },
      { id: 2, reviewerName: 'DevMentor', score: 4, comment: 'Good concept, would love to see more advanced challenges.' },
      { id: 3, reviewerName: 'StudentCoder', score: 5, comment: 'This helped me pass my programming course!' },
    ],
    joinedTesters: [
      { id: 1, name: 'BugHunter', avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=BH' },
      { id: 2, name: 'CodeMaster', avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=CM' },
      { id: 3, name: 'AlgorithmAce', avatarUrl: 'https://placehold.co/40x40/F59E0B/FFFFFF?text=AA' },
    ],
  },
  {
    id: 6,
    name: 'Chef\'s Kitchen',
    creator: { name: 'Culinary Craft', avatarUrl: 'https://placehold.co/40x40/EA580C/FFFFFF?text=CC', slackLink: 'https://hackclub.slack.com/team/U071V9FM6K1' },
    price: '$6.99',
    coins: 450,
    coverImageUrl: 'https://placehold.co/1200x400/EA580C/FFFFFF?text=Chef+Kitchen',
    iconUrl: 'https://placehold.co/150x150/EA580C/FFFFFF?text=CK',
    description: 'Master the art of cooking with Chef\'s Kitchen. Follow step-by-step recipes, learn cooking techniques, and manage your own virtual restaurant. Features realistic food physics and ingredient interactions.',
    screenshots: [
      'https://placehold.co/600x400/EA580C/FFFFFF?text=Recipe+Book',
      'https://placehold.co/600x400/EA580C/FFFFFF?text=Cooking+Station',
      'https://placehold.co/600x400/EA580C/FFFFFF?text=Restaurant+View',
      'https://placehold.co/600x400/EA580C/FFFFFF?text=Ingredient+Prep',
    ],
    videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
    reviews: [
      { id: 1, reviewerName: 'FoodLover', score: 5, comment: 'Amazing cooking simulator! The recipes actually work in real life.' },
      { id: 2, reviewerName: 'ChefWannabe', score: 4, comment: 'Great for learning cooking basics, very detailed tutorials.' },
      { id: 3, reviewerName: 'RestaurantOwner', score: 5, comment: 'Love the restaurant management aspect!' },
    ],
    joinedTesters: [
      { id: 1, name: 'SousChef', avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=SC' },
      { id: 2, name: 'FoodCritic', avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=FC' },
      { id: 3, name: 'CulinaryStudent', avatarUrl: 'https://placehold.co/40x40/EF4444/FFFFFF?text=CS' },
    ],
  },
];

export { allApps }; // Exporting the allApps array for use in other components

/**
 * ExplorePageContent Component
 * This component displays featured apps and a searchable list of all apps.
 * It's designed to be placed within a layout that already provides a header.
 */
const ExplorePageContent: FC<{ onSelectApp: (id: number) => void }> = ({ onSelectApp }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const featuredApps = allApps.slice(0, 4);
  const filteredApps = useMemo(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    if (!lowercasedQuery) return allApps;
    return allApps.filter(app =>
      app.name.toLowerCase().includes(lowercasedQuery) ||
      app.creator.name.toLowerCase().includes(lowercasedQuery)
    );
  }, [searchQuery]);

  return (
    <main className="flex-1 bg-gray-100 text-gray-800  overflow-y-auto animate-fade-in h-screen my-10">
      <div className="px-8 py-10">
        {/* Top Grid Section */}
            <section className="overflow-x-auto w-screen">
            <div className="flex w-full gap-8 pb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100" style={{ WebkitOverflowScrolling: 'touch' }}>
              {featuredApps.map((app) => (
              <AppCard key={app.id} app={app} />
              ))}
            </div>
            </section>

        <hr className="my-15  border-gray-200" />
        {/* Search & List Section */}
        <section className="mx-auto max-w-4xl">
          <div className="mb-6 bg-white">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search by app name or creator..." className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-3 text-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="space-y-3">
            {filteredApps.length > 0 ? (
              filteredApps.map((app) => (
                <AppListCard key={app.id} app={app} />
              ))
            ) : (
              <div className="text-center py-10"><p className="text-lg text-gray-500">No apps found for &quot;{searchQuery}&quot;</p></div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

// Wrapper component that handles authentication
const ExplorePage: FC = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ExplorePage: isLoading =', isLoading, 'isAuthenticated =', isAuthenticated, 'user =', user);
    
    // Only redirect if we're done loading and definitely not authenticated
    if (!isLoading && !isAuthenticated) {
      console.log('ExplorePage: Redirecting to signin...');
      router.push('/signin');
    }
  }, [isAuthenticated, isLoading, router, user]);

  if (isLoading) {
    console.log('ExplorePage: Showing loading state...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('ExplorePage: Not authenticated, will redirect...');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Redirecting to sign in...</p>
        </div>
      </div>
    );
  }

  console.log('ExplorePage: Authenticated, showing content...');
  const handleSelectApp = (id: number) => {
    router.push(`/explore/detail/${id}`);
  };

  return <ExplorePageContent onSelectApp={handleSelectApp} />;
};

export default ExplorePage;