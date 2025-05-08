const express = require('express');
const axios = require('axios');
const router = express.Router();

// A list of predefined categories based on keywords (this is a simple example, you can make it more advanced)
const categories = {
  technology: [
    'AI', 'Machine Learning', 'Deep Learning', 'Neural Networks', 'Blockchain', 'Cloud',
    'Programming', 'Web Development', 'Cybersecurity', 'Data Science', 'DevOps',
    'IoT', 'Augmented Reality', 'Virtual Reality', 'Edge Computing', 'Quantum Computing',
    '5G', 'Robotics', 'Software Engineering', 'Mobile Apps', 'Linux', 'JavaScript',
    'Python', 'React', 'Django', 'Automation', 'SaaS', 'Open Source', 'GitHub', 'Big Data',
    'Natural Language Processing', 'Autonomous Vehicles', 'Wearable Tech', 'Smart Cities',
    'Digital Twins', 'AI Ethics', 'Data Privacy', 'Biometrics', 'Cloud Computing', 'Software Testing',
    'Version Control', 'Cryptography', 'Digital Transformation', 'Enterprise Software', 'UI/UX Design'
  ],
  science: [
    'Space', 'Physics', 'Biology', 'Chemistry', 'Astronomy', 'Genetics', 'Evolution',
    'Ecology', 'Climate Change', 'Geology', 'Botany', 'Zoology', 'Paleontology',
    'Meteorology', 'Anatomy', 'Neuroscience', 'Scientific Research', 'Lab Experiments',
    'Theoretical Physics', 'DNA', 'Atoms', 'Molecules', 'Quantum Mechanics', 'Particle Physics',
    'Astrobiology', 'Nanotechnology', 'Astrophysics', 'Cell Biology', 'Biotechnology',
    'Oceanography', 'Mathematics', 'Stem Cells', 'Genomic Engineering', 'Cognitive Science',
    'Chemotherapy', 'Nuclear Physics', 'Biophysics', 'Pharmacology'
  ],
  politics: [
    'Election', 'Government', 'Policy', 'Debate', 'Democracy', 'Legislation', 'Political Party',
    'Candidate', 'Voting', 'Parliament', 'Congress', 'Diplomacy', 'Campaign', 'Senate',
    'Public Policy', 'Minister', 'President', 'Prime Minister', 'Corruption', 'Protest',
    'Bill', 'Referendum', 'Cabinet', 'Left-wing', 'Right-wing', 'Foreign Policy',
    'Human Rights', 'Political Activism', 'International Relations', 'Lawmakers', 'Constitution',
    'Political Parties', 'Civil Liberties', 'Impeachment', 'Lobbying', 'Political Scandals',
    'Civil Disobedience', 'Public Opinion', 'Political Reform'
  ],
  business: [
    'Startups', 'Economy', 'Finance', 'Cryptocurrency', 'Stock Market', 'Investments',
    'Entrepreneurship', 'Marketing', 'Sales', 'E-commerce', 'Venture Capital', 'Trade',
    'Banking', 'Real Estate', 'Merger', 'Acquisition', 'Business Strategy', 'Analytics',
    'Revenue', 'Customer Service', 'FinTech', 'Pitch', 'ROI', 'IPO', 'Branding', 'SaaS',
    'Economics', 'Business Development', 'Mergers & Acquisitions', 'Angel Investors',
    'Franchising', 'Public Relations', 'Global Trade', 'Corporate Social Responsibility',
    'Supply Chain Management', 'Corporate Governance', 'Financial Planning', 'Business Models',
    'Financial Technology', 'Private Equity', 'Cryptocurrency Regulation', 'Market Research'
  ],
  health: [
    'Fitness', 'Nutrition', 'Mental Health', 'Wellness', 'Healthcare', 'Medicine',
    'Exercise', 'Vaccines', 'Diseases', 'Therapy', 'Yoga', 'Sleep', 'Public Health',
    'Doctor', 'Hospital', 'Diagnosis', 'Treatment', 'Meditation', 'COVID-19',
    'Cardiology', 'Diabetes', 'Obesity', 'Supplements', 'Anxiety', 'First Aid', 'Cancer',
    'HIV/AIDS', 'Endocrinology', 'Neurodegenerative Diseases', 'Pharmacy', 'Nutrition Therapy',
    'Pediatrics', 'Surgery', 'Medical Research', 'Chronic Illness', 'Health Technology',
    'Mental Disorders', 'Addiction', 'Health Insurance', 'Rehabilitation', 'Health Policy'
  ],
  education: [
    'Learning', 'Online Courses', 'University', 'College', 'School', 'Exams',
    'Scholarships', 'E-learning', 'Tutoring', 'STEM', 'Curriculum', 'Teacher',
    'Student', 'EdTech', 'Assignments', 'Research Paper', 'MOOCs', 'Lectures',
    'Degree', 'Classroom', 'Higher Education', 'Workshops', 'Internships', 'Vocational Training',
    'Distance Learning', 'Online Degrees', 'Certification Programs', 'Academic Research',
    'Pedagogy', 'Educational Technology', 'Adult Education', 'Classroom Management',
    'Study Abroad', 'Student Loans', 'Educational Psychology', 'Education Policy'
  ],
  entertainment: [
    'Movies', 'TV Shows', 'Music', 'Streaming', 'Gaming', 'Celebrities', 'Theater',
    'Comics', 'Animation', 'Festivals', 'Concerts', 'Reality TV', 'Awards', 'Bollywood',
    'Hollywood', 'Trailers', 'Fan Theories', 'Reviews', 'Actors', 'K-pop', 'YouTubers',
    'Anime', 'Manga', 'Series', 'Sitcom', 'Netflix', 'OTT', 'Documentaries', 'Music Festivals',
    'Stand-up Comedy', 'Esports', 'Fan Art', 'Video Games', 'Music Videos', 'Celebrity News',
    'Pop Culture', 'Guilty Pleasures', 'Reality Shows', 'Influencers', 'TikTok', 'Viral Challenges'
  ],
  environment: [
    'Sustainability', 'Climate Change', 'Pollution', 'Global Warming', 'Recycling',
    'Renewable Energy', 'Conservation', 'Deforestation', 'Wildlife', 'Greenhouse Gases',
    'Eco-Friendly', 'Carbon Footprint', 'Biodiversity', 'Natural Disasters',
    'Earthquake', 'Floods', 'Ocean Pollution', 'Environmental Policy', 'Plastic Waste',
    'Green Technology', 'Solar Energy', 'Wind Power', 'Environmental Activism', 'Eco-friendly Products',
    'Fossil Fuels', 'Sustainable Agriculture', 'Forest Conservation', 'Carbon Sequestration',
    'Water Conservation', 'Carbon Tax', 'Environmental Law', 'Ecosystem Services', 'Sustainable Development'
  ],
  sports: [
    'Football', 'Soccer', 'Cricket', 'Basketball', 'Olympics', 'Tennis', 'Baseball',
    'Hockey', 'Golf', 'FIFA', 'NBA', 'World Cup', 'Athlete', 'Match', 'Score', 'Coach',
    'Team', 'Umpire', 'Championship', 'Marathon', 'eSports', 'Wrestling', 'Boxing',
    'Formula 1', 'Racing', 'Medal', 'Trophy', 'Olympic Games', 'Cycling', 'Swimming',
    'Athletics', 'Winter Sports', 'Wrestling', 'Football Teams', 'Basketball Teams',
    'Football Leagues', 'Rugby', 'Golf Tournaments', 'Motorsport', 'Motocross', 'Extreme Sports'
  ],
  lifestyle: [
    'Travel', 'Fashion', 'Food', 'Cooking', 'Interior Design', 'DIY', 'Personal Development',
    'Relationships', 'Hobbies', 'Parenting', 'Blogging', 'Vlogging', 'Luxury', 'Minimalism',
    'Self-care', 'Home Decor', 'Photography', 'Shopping', 'Fitness Routine', 'Health Trends',
    'Work-Life Balance', 'Productivity', 'Hiking', 'Camping', 'Adventure Travel',
    'Social Media', 'Home Organization', 'Mindfulness', 'Sustainable Fashion', 'Pet Care',
    'Personal Branding', 'Home Renovation', 'Yoga', 'Mental Wellness'
  ],
  history: [
    'Ancient Civilizations', 'World War', 'Revolution', 'Historical Events', 'Empire',
    'Archaeology', 'Colonialism', 'Independence', 'Treaties', 'Historical Figures',
    'Timeline', 'Artifacts', 'Medieval', 'Monuments', 'Cultural Heritage', 'Ancient Egypt',
    'Roman Empire', 'The Renaissance', 'Industrial Revolution', 'World War I', 'World War II',
    'Cold War', 'Colonial Empires', 'The French Revolution', 'Historical Documents', 'World Leaders',
    'Battlefields', 'Wars', 'Social Movements', 'Cultural Movements'
  ],
  law: [
    'Legal Rights', 'Court', 'Lawyer', 'Justice', 'Constitution', 'Legal System',
    'Trial', 'Criminal Law', 'Civil Law', 'Human Rights', 'Judge', 'Evidence',
    'Legislation', 'Jury', 'Verdict', 'Appeal', 'Law Enforcement', 'Litigation',
    'Family Law', 'Contract Law', 'Corporate Law', 'Intellectual Property', 'Bankruptcy',
    'Tax Law', 'Criminal Justice', 'Immigration Law', 'Consumer Protection', 'Corporate Governance'
  ],
  philosophy: [
    'Existence', 'Ethics', 'Morality', 'Logic', 'Reasoning', 'Mind', 'Consciousness',
    'Metaphysics', 'Epistemology', 'Free Will', 'Truth', 'Belief', 'Wisdom', 'Stoicism',
    'Existentialism', 'Utilitarianism', 'Philosophers', 'Plato', 'Socrates', 'Nietzsche',
    'Philosophical Inquiry', 'Philosophy of Science', 'Phenomenology', 'Political Philosophy',
    'Aesthetics', 'Ethical Dilemmas', 'Moral Theories', 'Rationalism', 'Empiricism'
  ],
  memes: [
    'Funny', 'Relatable', 'Dank', 'Wholesome', 'Dark Humor', 'Internet Trends',
    'Troll', 'Reaction', 'Sarcasm', 'Meme Template', 'GIFs', 'Viral', 'Shitpost',
    'Instagram Reels', 'TikTok Memes', 'Meme Culture', 'Reddit Memes', 'Meme Wars',
    'Trendjacking', 'Meme Formats', 'Viral Videos', 'Meme Stocks', 'Social Media Trends',
    'Meme Collaboration', 'Dank Memes', 'Meme Challenges', 'Meme Accounts'
  ],
  current_events: [
    'Breaking News', 'Incident', 'Trending', 'Live Update', 'Disaster', 'Outage',
    'Scandal', 'Accident', 'Alert', 'Public Reaction', 'Statements', 'Press Conference',
    'Curfew', 'Evacuation', 'Emergency', 'Political Protests', 'Natural Disasters',
    'Civil Unrest', 'Terrorist Attack', 'Corruption Scandals', 'Celebrity News', 'Crisis',
    'Emergency Response', 'International Crisis', 'Health Alerts', 'Court Rulings', 'Sports Events'
  ]
};

// Define your endpoint
router.get('/trending', async (req, res) => {
  try {
    const response = await axios.get('https://www.reddit.com/r/technology/top.json?limit=10', {
      headers: { 'User-Agent': 'BlogVerse/1.0' },
    });

    const posts = response.data.data.children.map(post => ({
      title: post.data.title,
      url: `https://reddit.com${post.data.permalink}`,
      score: post.data.score,
      comments: post.data.num_comments,
      author: post.data.author,
    }));

    // Categorize the trending posts based on keywords in titles
    const categoryCounts = {
      technology: 0,
      science: 0,
      politics: 0,
      business: 0,
    };

    posts.forEach(post => {
      Object.keys(categories).forEach(category => {
        categories[category].forEach(keyword => {
          if (post.title.toLowerCase().includes(keyword.toLowerCase())) {
            categoryCounts[category] += 1;
          }
        });
      });
    });

    // Recommend the top categories based on trending posts
    const recommendedCategories = Object.entries(categoryCounts)
      .filter(([category, count]) => count > 0)
      .sort((a, b) => b[1] - a[1]) // Sort by most frequent
      .map(([category, count]) => category);

    // Send the response with trending posts and recommendations
    res.json({
      posts,
      recommendedCategories,
    });
  } catch (err) {
    console.error('Reddit API error:', err.message);
    res.status(500).json({ error: 'Failed to fetch Reddit trends' });
  }
});

module.exports = router;




