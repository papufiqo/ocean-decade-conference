import React, { useState, useEffect } from 'react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedDay, setSelectedDay] = useState(0);
  const [userSchedule, setUserSchedule] = useState([]);
  const [feedback, setFeedback] = useState({ rating: 0, nps: '' });
  const [menuOpen, setMenuOpen] = useState(false);

  // Mock data for conference
  const conferenceInfo = {
    title: "Ocean Decade Conference 2026",
    subtitle: "Barcelona, Spain | April 10-12, 2026",
    description: "Celebrating progress and setting priorities for the UN Decade of Ocean Science for Sustainable Development (2021-2030)",
    vision: "To generate the 'science we need for the ocean we want'",
    goal: "Reverse declining ocean health and ensure science-based solutions for sustainable development"
  };

  const organizers = [
    { name: "BarcelonaReAct", logo: "https://placehold.co/80x40/1e40af/ffffff?text=BR" },
    { name: "UOC", logo: "https://placehold.co/80x40/059669/ffffff?text=UOC" },
    { name: "USAL", logo: "https://placehold.co/80x40/dc2626/ffffff?text=USAL" },
    { name: "URJC", logo: "https://placehold.co/80x40/7c3aed/ffffff?text=URJC" },
    { name: "UNESCO", logo: "https://placehold.co/80x40/f59e0b/ffffff?text=UNESCO" }
  ];

  const days = ["April 10", "April 11", "April 12"];

  const schedule = [
    [
      { time: "09:00", title: "Opening Ceremony", speaker: "Dr. Maria Rodriguez", room: "Main Hall", type: "Keynote" },
      { time: "10:30", title: "Ocean & Climate Change", speaker: "Prof. Ahmed Benali", room: "Room A", type: "Panel" },
      { time: "12:00", title: "Networking Lunch", speaker: "", room: "Dining Area", type: "Networking" },
      { time: "14:00", title: "Marine Biodiversity", speaker: "Dr. Sofia Costa", room: "Room B", type: "Workshop" },
      { time: "16:00", title: "Sustainable Fisheries", speaker: "Dr. Javier Martinez", room: "Room C", type: "Presentation" }
    ],
    [
      { time: "09:00", title: "Ocean Pollution Solutions", speaker: "Dr. Fatima El-Hassan", room: "Main Hall", type: "Keynote" },
      { time: "10:30", title: "Blue Economy", speaker: "Prof. Carlos Silva", room: "Room A", type: "Panel" },
      { time: "12:00", title: "Networking Lunch", speaker: "", room: "Dining Area", type: "Networking" },
      { time: "14:00", title: "Coastal Communities", speaker: "Dr. Amina Diallo", room: "Room B", type: "Workshop" },
      { time: "16:00", title: "Ocean Technology", speaker: "Dr. Pablo Fernandez", room: "Room C", type: "Presentation" }
    ],
    [
      { time: "09:00", title: "Closing Keynote", speaker: "Dr. UNESCO Representative", room: "Main Hall", type: "Keynote" },
      { time: "10:30", title: "Future Priorities", speaker: "Panel of Experts", room: "Room A", type: "Panel" },
      { time: "12:00", title: "Farewell Lunch", speaker: "", room: "Dining Area", type: "Networking" },
      { time: "14:00", title: "Action Plans", speaker: "Working Groups", room: "Room B", type: "Workshop" },
      { time: "16:00", title: "Closing Ceremony", speaker: "Organizing Committee", room: "Main Hall", type: "Presentation" }
    ]
  ];

  const speakers = [
    { name: "Dr. Maria Rodriguez", affiliation: "IOC-UNESCO", bio: "Leading oceanographer with 20+ years experience in marine science policy.", image: "https://placehold.co/150x150/3b82f6/ffffff?text=MR" },
    { name: "Prof. Ahmed Benali", affiliation: "University of Casablanca", bio: "Expert in climate-ocean interactions and sustainable development.", image: "https://placehold.co/150x150/10b981/ffffff?text=AB" },
    { name: "Dr. Sofia Costa", affiliation: "University of Lisbon", bio: "Marine biologist specializing in Mediterranean biodiversity conservation.", image: "https://placehold.co/150x150/f59e0b/ffffff?text=SC" },
    { name: "Dr. Javier Martinez", affiliation: "University of Salamanca", bio: "Economist focused on sustainable fisheries and coastal communities.", image: "https://placehold.co/150x150/ef4444/ffffff?text=JM" },
    { name: "Dr. Fatima El-Hassan", affiliation: "University of Rabat", bio: "Environmental scientist working on plastic pollution solutions.", image: "https://placehold.co/150x150/8b5cf6/ffffff?text=FE" },
    { name: "Prof. Carlos Silva", affiliation: "University of Porto", bio: "Economist specializing in blue economy and sustainable development.", image: "https://placehold.co/150x150/06b6d4/ffffff?text=CS" }
  ];

  const toggleSession = (session) => {
    setUserSchedule(prev => {
      const exists = prev.find(s => s.time === session.time && s.title === session.title);
      if (exists) {
        return prev.filter(s => !(s.time === session.time && s.title === session.title));
      } else {
        return [...prev, { ...session, day: days[selectedDay] }];
      }
    });
  };

  const isSessionSelected = (session) => {
    return userSchedule.some(s => s.time === session.time && s.title === session.title && s.day === days[selectedDay]);
  };

  const submitFeedback = () => {
    // In a real app, this would send data to a server
    alert(`Thank you for your feedback! Rating: ${feedback.rating} stars, NPS: ${feedback.nps}`);
    setFeedback({ rating: 0, nps: '' });
  };

  // Simple performance optimization for mobile
  useEffect(() => {
    // Preload critical images
    organizers.forEach(org => {
      const img = new Image();
      img.src = org.logo;
    });
    
    speakers.forEach(speaker => {
      const img = new Image();
      img.src = speaker.image;
    });
  }, []);

  const Navigation = () => (
    <nav className="bg-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-blue-800 transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl font-bold">Ocean Decade 2026</h1>
          </div>
          
          <div className="hidden md:flex space-x-1">
            {['home', 'schedule', 'speakers', 'my-schedule', 'feedback'].map((item) => (
              <button
                key={item}
                onClick={() => setActiveSection(item)}
                className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                  activeSection === item 
                    ? 'bg-blue-700 text-white' 
                    : 'hover:bg-blue-800 text-blue-100'
                }`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setActiveSection('feedback')}
              className="p-2 rounded-lg hover:bg-blue-800 transition-colors"
              aria-label="Feedback"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-blue-800">
            {['home', 'schedule', 'speakers', 'my-schedule'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveSection(item);
                  setMenuOpen(false);
                }}
                className={`block w-full text-left px-4 py-2 rounded-lg capitalize transition-colors ${
                  activeSection === item 
                    ? 'bg-blue-700 text-white' 
                    : 'hover:bg-blue-800 text-blue-100'
                }`}
              >
                {item.replace('-', ' ')}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );

  const Home = () => (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">{conferenceInfo.title}</h1>
        <p className="text-xl text-gray-700 mb-6">{conferenceInfo.subtitle}</p>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">{conferenceInfo.description}</p>
        <div className="bg-blue-50 p-6 rounded-lg mb-8">
          <h2 className="text-2xl font-semibold text-blue-900 mb-3">Vision & Goal</h2>
          <p className="text-gray-700 mb-2"><strong>Vision:</strong> {conferenceInfo.vision}</p>
          <p className="text-gray-700"><strong>Goal:</strong> {conferenceInfo.goal}</p>
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-bold text-center text-blue-900 mb-8">Organized by</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {organizers.map((org, index) => (
            <div key={index} className="flex flex-col items-center">
              <img 
                src={org.logo} 
                alt={org.name}
                className="w-20 h-10 object-contain mb-2"
                loading="lazy"
              />
              <span className="text-sm text-gray-600">{org.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-blue-900 mb-4">Key Focus Areas</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Climate Change & Ocean Health
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Marine Biodiversity Conservation
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Pollution Reduction Strategies
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Sustainable Ocean Economy
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
              Food Security & Fisheries
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-green-900 mb-4">Why Attend?</h3>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Connect with ocean science leaders
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Shape the future of ocean sustainability
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Access cutting-edge research
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Build international collaborations
            </li>
            <li className="flex items-center">
              <span className="w-2 h-2 bg-green-600 rounded-full mr-3"></span>
              Contribute to UN Decade goals
            </li>
          </ul>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => setActiveSection('schedule')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-colors shadow-md hover:shadow-lg"
        >
          View Full Schedule
        </button>
      </div>
    </div>
  );

  const Schedule = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">Conference Schedule</h1>
      
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => setSelectedDay(index)}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              selectedDay === index
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {schedule[selectedDay].map((session, index) => (
          <div 
            key={index} 
            className={`border rounded-lg p-4 transition-all ${
              isSessionSelected(session) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white'
            } shadow-sm hover:shadow-md`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                {session.speaker && <p className="text-gray-600">{session.speaker}</p>}
                <p className="text-sm text-gray-500">{session.room} • {session.type}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-bold text-blue-600">{session.time}</p>
                <button
                  onClick={() => toggleSession(session)}
                  className={`mt-2 px-4 py-2 rounded text-sm font-medium transition-colors ${
                    isSessionSelected(session)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {isSessionSelected(session) ? 'Remove' : 'Add to My Schedule'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => setActiveSection('my-schedule')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          View My Schedule
        </button>
      </div>
    </div>
  );

  const Speakers = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">Featured Speakers</h1>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {speakers.map((speaker, index) => (
          <div 
            key={index} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img 
              src={speaker.image} 
              alt={speaker.name}
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{speaker.affiliation}</p>
              <p className="text-gray-700 text-sm">{speaker.bio}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MySchedule = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">My Personal Schedule</h1>
      
      {userSchedule.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📋</div>
          <h2 className="text-xl font-bold text-gray-700 mb-4">Your schedule is empty</h2>
          <p className="text-gray-600 mb-6">Add sessions from the schedule to build your personalized agenda</p>
          <button
            onClick={() => setActiveSection('schedule')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            Browse Schedule
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {days.map((day, dayIndex) => {
            const daySessions = userSchedule.filter(session => session.day === day);
            if (daySessions.length === 0) return null;
            
            return (
              <div key={dayIndex} className="mb-8">
                <h2 className="text-2xl font-bold text-blue-900 mb-4 border-b pb-2">{day}</h2>
                <div className="space-y-4">
                  {daySessions.map((session, index) => (
                    <div 
                      key={index} 
                      className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{session.title}</h3>
                          {session.speaker && <p className="text-gray-600">{session.speaker}</p>}
                          <p className="text-sm text-gray-500">{session.room} • {session.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-mono text-lg font-bold text-blue-600">{session.time}</p>
                          <button
                            onClick={() => toggleSession(session)}
                            className="mt-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-sm font-medium transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const Feedback = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">Share Your Feedback</h1>
      
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">How would you rate your experience?</h2>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setFeedback({...feedback, rating: star})}
                className={`text-4xl transition-colors ${
                  feedback.rating >= star ? 'text-yellow-400' : 'text-gray-300'
                }`}
                aria-label={`Rate ${star} stars`}
              >
                ★
              </button>
            ))}
          </div>
          {feedback.rating > 0 && (
            <p className="text-gray-600 mt-2">
              {feedback.rating === 5 && "Excellent! Thank you!"}
              {feedback.rating === 4 && "Great experience!"}
              {feedback.rating === 3 && "Good, but could be better"}
              {feedback.rating === 2 && "Needs improvement"}
              {feedback.rating === 1 && "Poor experience"}
            </p>
          )}
        </div>

        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Net Promoter Score (NPS)</h2>
          <p className="text-gray-700 mb-4">On a scale of 0-10, how likely are you to recommend this conference to others?</p>
          <div className="grid grid-cols-5 gap-2 mb-4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => setFeedback({...feedback, nps: score.toString()})}
                className={`p-3 rounded font-bold transition-colors ${
                  feedback.nps === score.toString()
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {score}
              </button>
            ))}
          </div>
          {feedback.nps && (
            <div className="text-sm text-gray-600">
              {parseInt(feedback.nps) <= 6 && "We're sorry to hear that. We'll work to improve."}
              {parseInt(feedback.nps) >= 7 && parseInt(feedback.nps) <= 8 && "Thank you for your support!"}
              {parseInt(feedback.nps) >= 9 && "We're thrilled you loved it!"}
            </div>
          )}
        </div>

        <div className="text-center">
          <button
            onClick={submitFeedback}
            disabled={!feedback.rating || !feedback.nps}
            className={`px-8 py-3 rounded-lg font-bold text-white transition-colors ${
              feedback.rating && feedback.nps
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            Submit Feedback
          </button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-bold text-blue-900 mb-3">Why Your Feedback Matters</h3>
        <p className="text-gray-700">
          Your feedback helps us improve future conferences and ensure we're meeting the needs of our international community 
          from Spain, Portugal, and North Africa. Thank you for helping us create better ocean science events!
        </p>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <Home />;
      case 'schedule':
        return <Schedule />;
      case 'speakers':
        return <Speakers />;
      case 'my-schedule':
        return <MySchedule />;
      case 'feedback':
        return <Feedback />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main>
        {renderSection()}
      </main>
      <footer className="bg-blue-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Ocean Decade Conference 2026</h3>
              <p className="text-blue-200">Barcelona, Spain | April 10-12, 2026</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-blue-200 transition-colors">Contact</a>
              <a href="#" className="hover:text-blue-200 transition-colors">Privacy</a>
              <a href="#" className="hover:text-blue-200 transition-colors">Terms</a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-blue-800 text-center text-blue-200 text-sm">
            <p>Organized by BarcelonaReAct, UOC, USAL, URJC and UNESCO</p>
            <p className="mt-2">© 2026 Ocean Decade Conference. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
