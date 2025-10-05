import React from 'react';

const FeaturedSkills = () => {
  const skills = [
    {
      category: 'Programming',
      difficulty: 'Intermediate',
      // UPDATED: Light background with dark, saturated text for tags
      difficultyColor: 'bg-purple-100 text-purple-700',
      title: 'Learn React & TypeScript',
      description: 'Complete beginner-friendly course on modern React development with...',
      teacher: {
        initials: 'AL',
        name: 'Alex Chen',
        rating: '4.9',
        trades: '47',
      },
      tags: ['React', 'TypeScript', 'Frontend'],
      duration: '4 weeks',
      credits: '250',
    },
    {
      category: 'Music',
      difficulty: 'Beginner',
      // UPDATED: Light background with dark, saturated text for tags
      difficultyColor: 'bg-teal-100 text-teal-700',
      title: 'Guitar Fundamentals',
      description: 'Learn basic guitar chords, strumming patterns, and play your first songs....',
      teacher: {
        initials: 'MA',
        name: 'Maria Santos',
        rating: '5.0',
        trades: '89',
      },
      tags: ['Acoustic', 'Theory', 'Practice'],
      duration: '6 weeks',
      credits: '180',
    },
    {
      category: 'Business',
      difficulty: 'Advanced',
      // UPDATED: Light background with dark, saturated text for tags
      difficultyColor: 'bg-orange-100 text-orange-700',
      title: 'Digital Marketing Strategy',
      description: 'Master social media marketing, SEO, and content creation to grow your online...',
      teacher: {
        initials: 'JO',
        name: 'Jordan Kim',
        rating: '4.8',
        trades: '62',
      },
      tags: ['SEO', 'Social Media', 'Analytics'],
      duration: '8 weeks',
      credits: '320',
    },
  ];

  return (
    // UPDATED: Main background to white
    <section className="bg-gray-100 text-slate-800 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">Featured Skills</h2>
          <p className="mt-4 text-lg text-slate-600">
            Top-rated skills from our most experienced teachers
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <div
              key={index}
              // UPDATED: Card has a light border, and the hover effect is now a colored shadow
              className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col hover:shadow-xl hover:shadow-orange-500/10 transition-shadow duration-300"
            >
              {/* Card Header */}
              <div className="flex justify-between items-center mb-4">
                <span className="bg-slate-100 text-slate-600 text-xs font-semibold px-3 py-1 rounded-full">
                  {skill.category}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${skill.difficultyColor}`}>
                  {skill.difficulty}
                </span>
              </div>

              {/* Card Title and Description */}
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{skill.title}</h3>
              <p className="text-slate-500 mb-6 flex-grow">{skill.description}</p>

              {/* Teacher Info */}
              <div className="flex items-center mb-6">
                 {/* Teacher avatar uses a solid teal background with white text */}
                <div className="w-12 h-12 rounded-full bg-teal-500 text-white flex items-center justify-center font-bold text-lg mr-4">
                  {skill.teacher.initials}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{skill.teacher.name}</p>
                  <div className="flex items-center text-sm text-slate-500 space-x-3 mt-1">
                    <span>{skill.teacher.trades} trades</span>
                  </div>
                </div>
              </div>
              
              {/* Skill Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {skill.tags.map((tag) => (
                  <span key={tag} className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center text-slate-500 text-sm mb-6">
                <span>🕓 {skill.duration}</span>
                 {/* Credits text uses a darker shade of orange for emphasis */}
                <span className="font-semibold text-orange-600">{skill.credits} credits</span>
              </div>

              {/* Action Button */}
              {/* UPDATED: Button uses a solid orange background with white text */}
              <button className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-orange-500 transition-colors duration-300">
                Request Skill Exchange
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
           {/* Secondary button is now an outline style with dark text */}
          <button className="bg-transparent text-slate-700 font-semibold py-3 px-6 rounded-lg border border-slate-300 hover:bg-slate-100 transition-all duration-300">
            View All Skills →
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSkills;