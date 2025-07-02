'use client';

import { FC, use } from 'react';
import { App } from '@/types';

// Import all apps data (you should move this to a separate data file)
const allApps: App[] = [
  {
    id: 1,
    name: 'Stellar Navigator',
    creator: { name: 'CosmoDev', avatarUrl: 'https://placehold.co/40x40/2D3748/FFFFFF?text=C', slackLink: '' },
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
];

// Function to generate app-specific test instructions
const getTestInstructionData = (app: App) => {
  const baseData = {
    testPeriod: '14 Days',
    feedbackInstructions: 'Submit daily feedback via Google Forms',
    appleTestFlightLink: `https://testflight.apple.com/join/${app.name.toLowerCase().replace(/\s+/g, '-')}`,
    googlePlayTestingLink: `https://play.google.com/apps/internaltest/${app.name.toLowerCase().replace(/\s+/g, '-')}`,
    googleGroupsLink: `https://groups.google.com/g/${app.name.toLowerCase().replace(/\s+/g, '-')}-beta`
  };

  // Customize based on app type
  switch (app.id) {
    case 1: // Stellar Navigator
      return {
        ...baseData,
        testingFocus: 'Space exploration mechanics and galaxy navigation',
        focusAreas: [
          'Galaxy navigation and exploration features',
          'Planet discovery and resource trading',
          'Spacecraft controls and physics simulation',
          'Visual effects and stellar rendering'
        ],
        subtitle: 'Help us perfect the next generation of space exploration'
      };
    case 2: // Aqua Planner
      return {
        ...baseData,
        testingFocus: 'Task management and productivity features',
        focusAreas: [
          'Task creation and organization',
          'Calendar integration and reminders',
          'Team collaboration features',
          'Interface responsiveness and usability'
        ],
        subtitle: 'Help us create the ultimate productivity experience'
      };
    case 3: // Neon Racer
      return {
        ...baseData,
        testingFocus: 'Racing mechanics and cyberpunk visual effects',
        focusAreas: [
          'High-speed racing mechanics and controls',
          'Cyberpunk visual effects and neon lighting',
          'Vehicle customization and upgrades',
          'Underground tournament gameplay'
        ],
        subtitle: 'Help us perfect the ultimate cyberpunk racing experience'
      };
    case 4: // Mindful Meditation
      return {
        ...baseData,
        testingFocus: 'Meditation features and user experience',
        focusAreas: [
          'Guided meditation sessions',
          'Breathing exercise accuracy',
          'Nature sounds and audio quality',
          'Progress tracking and analytics'
        ],
        subtitle: 'Help us create a more mindful world'
      };
    case 5: // Code Quest
      return {
        ...baseData,
        testingFocus: 'Learning mechanics and coding challenges',
        focusAreas: [
          'Coding challenge difficulty progression',
          'Code editor functionality',
          'Achievement and progress systems',
          'Educational content quality'
        ],
        subtitle: 'Help us make coding education more engaging'
      };
    default:
      return {
        ...baseData,
        testingFocus: 'General app functionality and user experience',
        focusAreas: [
          'Core app functionality',
          'User interface and navigation',
          'Performance and stability',
          'Overall user experience'
        ],
        subtitle: 'Help us perfect this amazing app'
      };
  }
};

interface TestInstructionPageProps {
  params: Promise<{ id: string }>;
}

const TestInstructionPage: FC<TestInstructionPageProps> = ({ params }) => {
  const resolvedParams = use(params);
  const appId = parseInt(resolvedParams.id);
  const app = allApps.find(a => a.id === appId);
  
  // If app not found, show error
  if (!app) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-4">App Not Found</h1>
          <p className="text-xl text-gray-600">The requested app does not exist.</p>
        </div>
      </div>
    );
  }

  const testInstructionData = getTestInstructionData(app);
  const handleAppleClick = () => {
    window.open(testInstructionData.appleTestFlightLink, '_blank');
  };

  const handleGoogleClick = () => {
    window.open(testInstructionData.googlePlayTestingLink, '_blank');
  };

  const handleGoogleGroupsClick = () => {
    window.open(testInstructionData.googleGroupsLink, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">Beta Testing</h1>
          <p className="text-xl text-gray-600 font-light">{testInstructionData.subtitle}</p>
        </div>
        
        {/* App Hero Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-12">
          <div className="px-8 py-10">
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-md">
                <img 
                  src={app.iconUrl} 
                  alt={app.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-1">{app.name}</h2>
                <p className="text-lg text-gray-600 mb-1">by {app.creator.name}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full font-medium">Beta</span>
                </div>
              </div>
            </div>
            
            {/* Instructions Card */}
            <div className="bg-gray-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Testing Instructions</h3>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>Welcome to the beta testing program for {app.name}!</p>
                    <div>
                      <p className="font-medium mb-2">Focus Areas:</p>
                      <ul className="space-y-1 text-gray-600">
                        {testInstructionData.focusAreas.map((area, index) => (
                          <li key={index}>• {area}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Duration</p>
                    <p className="text-2xl font-light text-gray-900">{testInstructionData.testPeriod}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Feedback</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{testInstructionData.feedbackInstructions}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-1">Focus</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{testInstructionData.testingFocus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Download Section */}
        <div className="text-center mb-16">
          <h3 className="text-2xl font-light text-gray-900 mb-8">Download</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto">
            <button 
              onClick={handleAppleClick}
              className="bg-black hover:bg-gray-800 text-white font-medium py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Join the beta for iOS</span>
            </button>
            <button 
              onClick={handleGoogleClick}
              className="bg-white hover:bg-gray-50 text-gray-900 font-medium py-4 px-8 rounded-2xl transition-all duration-200 flex items-center justify-center gap-3 border border-gray-200 shadow-lg hover:shadow-xl"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Join the beta for Android</span>
            </button>
          </div>
        </div>
        
        {/* Important Notes */}
        <div className="bg-blue-50 border border-blue-100 rounded-3xl p-8">
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-1">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-900 mb-3">Testing Guidelines</h3>
              <ul className="text-blue-800 space-y-2 leading-relaxed">
                <li>This is a pre-release version with potential bugs and incomplete features</li>
                <li>Focus on {testInstructionData.testingFocus.toLowerCase()}</li>
                <li>Report crashes or major issues immediately through the feedback channels</li>
                <li>Save progress may not transfer to the final release version</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructionPage;
