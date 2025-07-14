import { format, addDays, startOfYear } from 'date-fns';

export interface FamilyStory {
  id: string;
  authorName: string;
  authorGeneration: 'grandparent' | 'parent' | 'child' | 'grandchild' | 'other';
  content: string;
  timestamp: Date;
  dayOfYear: number;
}

export interface CompassPoint {
  dayOfYear: number; // 1-365
  date: Date;
  dateString: string; // "January 1", "December 31", etc.
  degree: number; // Calculated based on day of year
  direction: string;
  title: string;
  lesson: string;
  scripture: string;
  scriptureReference?: string; // Optional reference for the scripture (e.g., "John 3:16")
  application: string;
  category: 'faith' | 'hope' | 'love' | 'repentance' | 'service' | 'gratitude' | 'forgiveness' | 'patience' | 'humility' | 'courage';
  familyStories: FamilyStory[];
}

// Generate all 365 days of the year
export function generateCalendarCompassPoints(): CompassPoint[] {
  const currentYear = new Date().getFullYear();
  const startDate = startOfYear(new Date(currentYear, 0, 1));
  const points: CompassPoint[] = [];

  // Spiritual themes for each month
  const monthlyThemes = [
    { month: 0, theme: 'faith', focus: 'New Beginnings and Faith' },
    { month: 1, theme: 'love', focus: 'Love and Relationships' },
    { month: 2, theme: 'hope', focus: 'Hope and Renewal' },
    { month: 3, theme: 'repentance', focus: 'Repentance and Forgiveness' },
    { month: 4, theme: 'service', focus: 'Service and Giving' },
    { month: 5, theme: 'gratitude', focus: 'Gratitude and Appreciation' },
    { month: 6, theme: 'courage', focus: 'Courage and Strength' },
    { month: 7, theme: 'patience', focus: 'Patience and Endurance' },
    { month: 8, theme: 'humility', focus: 'Humility and Learning' },
    { month: 9, theme: 'forgiveness', focus: 'Forgiveness and Healing' },
    { month: 10, theme: 'gratitude', focus: 'Thanksgiving and Praise' },
    { month: 11, theme: 'hope', focus: 'Christmas Hope and Joy' }
  ];

  // Scripture collections for each category
  const scriptures = {
    faith: [
      "Now faith is the substance of things hoped for, the evidence of things not seen. - Hebrews 11:1",
      "Trust in the Lord with all thine heart; and lean not unto thine own understanding. - Proverbs 3:5",
      "I can do all things through Christ which strengtheneth me. - Philippians 4:13",
      "Faith without works is dead. - James 2:26",
      "The just shall live by faith. - Romans 1:17",
      "Be it unto you according to your faith. - Matthew 9:29",
      "If ye have faith as a grain of mustard seed... nothing shall be impossible unto you. - Matthew 17:20",
      "Faith cometh by hearing, and hearing by the word of God. - Romans 10:17",
      "Fight the good fight of faith. - 1 Timothy 6:12",
      "Walk by faith, not by sight. - 2 Corinthians 5:7"
    ],
    hope: [
      "Hope maketh not ashamed. - Romans 5:5",
      "Blessed is he that trusteth in the Lord. - Psalm 40:4",
      "The Lord is my light and my salvation. - Psalm 27:1",
      "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end. - Jeremiah 29:11",
      "But they that wait upon the Lord shall renew their strength. - Isaiah 40:31",
      "The Lord is good unto them that wait for him. - Lamentations 3:25",
      "Be of good cheer; I have overcome the world. - John 16:33",
      "And now abideth faith, hope, charity, these three. - 1 Corinthians 13:13",
      "Weeping may endure for a night, but joy cometh in the morning. - Psalm 30:5",
      "The hope of the righteous shall be gladness. - Proverbs 10:28"
    ],
    love: [
      "God is love. - 1 John 4:8",
      "Love one another as I have loved you. - John 13:34",
      "Charity never faileth. - 1 Corinthians 13:8",
      "Greater love hath no man than this, that a man lay down his life for his friends. - John 15:13",
      "Love is patient, love is kind. - 1 Corinthians 13:4",
      "Beloved, let us love one another: for love is of God. - 1 John 4:7",
      "Above all these things put on charity, which is the bond of perfectness. - Colossians 3:14",
      "Love worketh no ill to his neighbour. - Romans 13:10",
      "By this shall all men know that ye are my disciples, if ye have love one to another. - John 13:35",
      "Perfect love casteth out fear. - 1 John 4:18"
    ],
    repentance: [
      "Repent ye, and believe the gospel. - Mark 1:15",
      "If we confess our sins, he is faithful and just to forgive us our sins. - 1 John 1:9",
      "The Lord is merciful and gracious, slow to anger, and plenteous in mercy. - Psalm 103:8",
      "Come now, and let us reason together, saith the Lord: though your sins be as scarlet, they shall be as white as snow. - Isaiah 1:18",
      "Godly sorrow worketh repentance to salvation. - 2 Corinthians 7:10",
      "Return unto me, and I will return unto you, saith the Lord. - Malachi 3:7",
      "I will arise and go to my father. - Luke 15:18",
      "Create in me a clean heart, O God. - Psalm 51:10",
      "The sacrifices of God are a broken spirit: a broken and a contrite heart. - Psalm 51:17",
      "Wash me, and I shall be whiter than snow. - Psalm 51:7"
    ],
    service: [
      "Inasmuch as ye have done it unto one of the least of these my brethren, ye have done it unto me. - Matthew 25:40",
      "By love serve one another. - Galatians 5:13",
      "Freely ye have received, freely give. - Matthew 10:8",
      "Let your light so shine before men, that they may see your good works. - Matthew 5:16",
      "Bear ye one another's burdens. - Galatians 6:2",
      "As we have therefore opportunity, let us do good unto all men. - Galatians 6:10",
      "Pure religion and undefiled before God... is this, To visit the fatherless and widows in their affliction. - James 1:27",
      "It is more blessed to give than to receive. - Acts 20:35",
      "Whatsoever ye do, do it heartily, as to the Lord. - Colossians 3:23",
      "Let us not be weary in well doing. - Galatians 6:9"
    ],
    gratitude: [
      "In every thing give thanks: for this is the will of God in Christ Jesus concerning you. - 1 Thessalonians 5:18",
      "O give thanks unto the Lord; for he is good: for his mercy endureth for ever. - Psalm 136:1",
      "Enter into his gates with thanksgiving, and into his courts with praise. - Psalm 100:4",
      "Be thankful unto him, and bless his name. - Psalm 100:4",
      "Giving thanks always for all things unto God. - Ephesians 5:20",
      "Thanks be unto God for his unspeakable gift. - 2 Corinthians 9:15",
      "I will praise thee, O Lord, with my whole heart. - Psalm 9:1",
      "Bless the Lord, O my soul, and forget not all his benefits. - Psalm 103:2",
      "It is a good thing to give thanks unto the Lord. - Psalm 92:1",
      "Let us come before his presence with thanksgiving. - Psalm 95:2"
    ],
    forgiveness: [
      "Forgive, and ye shall be forgiven. - Luke 6:37",
      "Be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you. - Ephesians 4:32",
      "If ye forgive men their trespasses, your heavenly Father will also forgive you. - Matthew 6:14",
      "Lord, how oft shall my brother sin against me, and I forgive him? till seven times? Jesus saith unto him, I say not unto thee, Until seven times: but, Until seventy times seven. - Matthew 18:21-22",
      "Father, forgive them; for they know not what they do. - Luke 23:34",
      "Blessed are the merciful: for they shall obtain mercy. - Matthew 5:7",
      "The discretion of a man deferreth his anger; and it is his glory to pass over a transgression. - Proverbs 19:11",
      "Forbearing one another, and forgiving one another. - Colossians 3:13",
      "Be not overcome of evil, but overcome evil with good. - Romans 12:21",
      "Mercy rejoiceth against judgment. - James 2:13"
    ],
    patience: [
      "But they that wait upon the Lord shall renew their strength. - Isaiah 40:31",
      "Rest in the Lord, and wait patiently for him. - Psalm 37:7",
      "The Lord is not slack concerning his promise, as some men count slackness; but is longsuffering. - 2 Peter 3:9",
      "Let patience have her perfect work, that ye may be perfect and entire, wanting nothing. - James 1:4",
      "In your patience possess ye your souls. - Luke 21:19",
      "Be patient therefore, brethren, unto the coming of the Lord. - James 5:7",
      "The fruit of the Spirit is... longsuffering. - Galatians 5:22",
      "With long life will I satisfy him. - Psalm 91:16",
      "He that is slow to anger is better than the mighty. - Proverbs 16:32",
      "Wait on the Lord: be of good courage, and he shall strengthen thine heart. - Psalm 27:14"
    ],
    humility: [
      "Blessed are the meek: for they shall inherit the earth. - Matthew 5:5",
      "Humble yourselves in the sight of the Lord, and he shall lift you up. - James 4:10",
      "God resisteth the proud, but giveth grace unto the humble. - James 4:6",
      "Before honour is humility. - Proverbs 15:33",
      "He that humbleth himself shall be exalted. - Luke 14:11",
      "Take my yoke upon you, and learn of me; for I am meek and lowly in heart. - Matthew 11:29",
      "Whosoever therefore shall humble himself as this little child, the same is greatest in the kingdom of heaven. - Matthew 18:4",
      "The humble shall inherit the earth. - Psalm 37:11",
      "A man's pride shall bring him low: but honour shall uphold the humble in spirit. - Proverbs 29:23",
      "Better it is to be of an humble spirit with the lowly. - Proverbs 16:19"
    ],
    courage: [
      "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the Lord thy God is with thee whithersoever thou goest. - Joshua 1:9",
      "Fear not, for I am with thee: be not dismayed; for I am thy God. - Isaiah 41:10",
      "The Lord is my light and my salvation; whom shall I fear? - Psalm 27:1",
      "Be of good courage, and he shall strengthen your heart. - Psalm 31:24",
      "Have not I commanded thee? Be strong and of a good courage. - Joshua 1:9",
      "The Lord is my strength and my shield; my heart trusted in him. - Psalm 28:7",
      "Fear thou not; for I am with thee. - Isaiah 41:10",
      "In God have I put my trust: I will not be afraid what man can do unto me. - Psalm 56:11",
      "The righteous are bold as a lion. - Proverbs 28:1",
      "Watch ye, stand fast in the faith, quit you like men, be strong. - 1 Corinthians 16:13"
    ]
  };

  // Lessons for each category
  const lessons = {
    faith: [
      "Faith is the foundation of all spiritual growth. It begins with a simple desire to believe and grows through consistent practice and trust in God.",
      "When we exercise faith, we demonstrate our trust in God's promises and His perfect timing for our lives.",
      "Faith requires action. It's not enough to believe; we must act on our beliefs and live according to God's teachings.",
      "Small acts of faith, when practiced consistently, lead to great spiritual strength and testimony.",
      "Faith helps us see beyond our current circumstances and trust in God's eternal perspective.",
      "Through faith, we can overcome fear, doubt, and uncertainty by anchoring our souls in Christ.",
      "Faith is strengthened through prayer, scripture study, and obedience to God's commandments.",
      "When we share our faith with others, it grows stronger and blesses both the giver and receiver.",
      "Faith gives us courage to face life's challenges and trust that God will provide a way forward.",
      "True faith leads to action, service, and a desire to become more like Christ."
    ],
    hope: [
      "Hope is the anchor of our souls, providing stability and direction during life's storms.",
      "Christian hope is not wishful thinking but confident expectation based on God's promises.",
      "Hope helps us endure present trials by focusing on eternal rewards and blessings.",
      "When we hope in Christ, we find strength to continue forward even in difficult times.",
      "Hope brings light to darkness and helps us see possibilities beyond our current circumstances.",
      "Sharing hope with others multiplies its power and brings comfort to those who are struggling.",
      "Hope is renewed through prayer, scripture study, and remembering God's past faithfulness.",
      "True hope is grounded in the Atonement of Jesus Christ and His power to heal and redeem.",
      "Hope gives us patience to wait for God's timing and trust in His perfect plan.",
      "Living with hope means choosing optimism and faith over despair and discouragement."
    ],
    love: [
      "Love is the greatest commandment and the foundation of all Christian living.",
      "God's love for us is unconditional and eternal, serving as our example for loving others.",
      "Love is shown through actions, not just words, and requires sacrifice and selflessness.",
      "When we love others as Christ loves us, we create unity and strengthen relationships.",
      "Love has the power to heal wounds, mend broken hearts, and transform lives.",
      "Charity, the pure love of Christ, is the highest form of love we can develop.",
      "Love requires forgiveness, patience, and understanding, especially when it's difficult.",
      "Through love, we serve others and find joy in their happiness and well-being.",
      "Love grows stronger when we express it regularly and look for opportunities to serve.",
      "Perfect love casts out fear and brings peace to our hearts and homes."
    ],
    repentance: [
      "Repentance is a gift from God that allows us to change and become better than we were.",
      "True repentance involves recognizing our mistakes, feeling godly sorrow, and committing to change.",
      "Repentance is not just about feeling sorry; it's about turning away from sin and toward God.",
      "Through repentance, we can experience the cleansing power of Christ's Atonement.",
      "Daily repentance keeps us spiritually clean and helps us progress toward perfection.",
      "Repentance requires humility and the courage to admit when we've made mistakes.",
      "God's mercy is always available to those who sincerely repent and seek forgiveness.",
      "Repentance brings peace, relief, and freedom from the burden of sin and guilt.",
      "When we repent, we not only receive forgiveness but also the strength to avoid future mistakes.",
      "Repentance is an ongoing process that helps us become more like Christ throughout our lives."
    ],
    service: [
      "Service is love in action and one of the most powerful ways to follow Christ's example.",
      "When we serve others, we forget ourselves and find true joy and fulfillment.",
      "Service doesn't require grand gestures; small acts of kindness can have profound impact.",
      "Through service, we develop empathy, compassion, and a greater understanding of others' needs.",
      "Service to others is service to God and helps us become more like Christ.",
      "The best service is often given without recognition or expectation of reward.",
      "Service strengthens communities and builds bonds of love and friendship.",
      "When we serve, we often receive more than we give in terms of joy and satisfaction.",
      "Service helps us develop our talents and abilities while blessing others' lives.",
      "A life of service is a life well-lived and brings meaning and purpose to our existence."
    ],
    gratitude: [
      "Gratitude is the foundation of happiness and opens our hearts to God's blessings.",
      "When we count our blessings, we realize how much we have to be thankful for.",
      "Gratitude in trials helps us grow stronger and find meaning in our challenges.",
      "Expressing gratitude to others strengthens relationships and spreads joy.",
      "Gratitude for small things prepares us to receive and appreciate greater blessings.",
      "A grateful heart attracts more blessings and creates a positive outlook on life.",
      "Gratitude helps us focus on what we have rather than what we lack.",
      "When we thank God regularly, we acknowledge His hand in our lives and grow closer to Him.",
      "Gratitude is a choice that can transform our perspective and bring peace to our hearts.",
      "Living with gratitude means finding joy in everyday moments and simple pleasures."
    ],
    forgiveness: [
      "Forgiveness is essential for our own healing and peace of mind.",
      "When we forgive others, we free ourselves from the burden of anger and resentment.",
      "Forgiveness doesn't mean forgetting or excusing wrong behavior, but choosing to let go of hurt.",
      "God's forgiveness of us serves as our example for forgiving others.",
      "Forgiveness is a process that may take time, but it brings freedom and peace.",
      "When we forgive, we open our hearts to love and allow relationships to heal.",
      "Forgiveness requires strength and courage, but it brings spiritual growth and maturity.",
      "Seeking forgiveness when we've wronged others shows humility and promotes healing.",
      "Forgiveness is a gift we give ourselves as much as we give to others.",
      "Through forgiveness, we follow Christ's example and become more like Him."
    ],
    patience: [
      "Patience is a virtue that helps us endure trials and wait for God's timing.",
      "When we practice patience, we develop self-control and emotional maturity.",
      "Patience with others shows love and understanding, even when they make mistakes.",
      "God's patience with us serves as our example for being patient with others.",
      "Patience in trials helps us learn important lessons and grow spiritually.",
      "When we're patient, we make better decisions and avoid acting in haste or anger.",
      "Patience is developed through practice and becomes easier with time and experience.",
      "Patient people are often happier and more peaceful because they don't rush through life.",
      "Patience helps us appreciate the journey, not just the destination.",
      "Through patience, we learn to trust God's timing and find peace in His plan."
    ],
    humility: [
      "Humility is the foundation of all other virtues and opens our hearts to learning.",
      "When we're humble, we recognize our dependence on God and others.",
      "Humility helps us accept correction and grow from our mistakes.",
      "Humble people are teachable and open to new ideas and perspectives.",
      "Humility in success keeps us grounded and grateful for our blessings.",
      "When we're humble, we're more likely to serve others and put their needs first.",
      "Humility helps us build better relationships by showing respect for others.",
      "True humility comes from understanding our place in God's plan and our need for His grace.",
      "Humble people are often more likeable and trustworthy because they don't seek attention.",
      "Through humility, we become more like Christ, who was meek and lowly in heart."
    ],
    courage: [
      "Courage is not the absence of fear, but the strength to do what's right despite fear.",
      "When we have courage, we can stand up for our beliefs and values.",
      "Courage helps us face challenges and overcome obstacles in our path.",
      "Moral courage is especially important in standing for truth and righteousness.",
      "Courage grows stronger each time we act bravely and do what's right.",
      "When we have courage, we can help others who are afraid or struggling.",
      "Courage comes from faith in God and trust in His protection and guidance.",
      "Small acts of courage in daily life prepare us for greater challenges.",
      "Courage helps us speak up for those who cannot speak for themselves.",
      "Through courage, we can make a positive difference in the world around us."
    ]
  };

  // Generate 365 days
  for (let dayOfYear = 1; dayOfYear <= 365; dayOfYear++) {
    const currentDate = addDays(startDate, dayOfYear - 1);
    const month = currentDate.getMonth();
    const monthTheme = monthlyThemes[month];
    const category = monthTheme.theme as keyof typeof scriptures;
    
    // Calculate degree (0-360 based on day of year)
    const degree = Math.round((dayOfYear / 365) * 360);
    
    // Get random scripture and lesson for this category
    const categoryScriptures = scriptures[category];
    const categoryLessons = lessons[category];
    const scriptureIndex = (dayOfYear - 1) % categoryScriptures.length;
    const lessonIndex = (dayOfYear - 1) % categoryLessons.length;

    const point: CompassPoint = {
      dayOfYear,
      date: currentDate,
      dateString: format(currentDate, 'MMMM d'),
      degree,
      direction: getDirection(degree),
      title: `${monthTheme.focus} - Day ${dayOfYear}`,
      lesson: categoryLessons[lessonIndex],
      scripture: categoryScriptures[scriptureIndex],
      application: generateApplication(category, dayOfYear),
      category,
      familyStories: []
    };

    points.push(point);
  }

  return points;
}

function getDirection(degree: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degree / 22.5) % 16;
  return directions[index];
}

function generateApplication(category: string, dayOfYear: number): string {
  const applications = {
    faith: [
      "Begin your day with a prayer of faith, asking God to guide your steps.",
      "Read a chapter of scripture and look for examples of faith in action.",
      "Share your testimony with someone who needs encouragement.",
      "Take a leap of faith by trying something new that will help you grow.",
      "Write in your journal about how God has blessed you this week."
    ],
    hope: [
      "List three things you're looking forward to and thank God for future blessings.",
      "Encourage someone who is going through a difficult time.",
      "Focus on the positive aspects of your current situation.",
      "Set a goal that will help you grow spiritually or personally.",
      "Remember a time when God helped you through a challenge."
    ],
    love: [
      "Tell someone you love them and why they're important to you.",
      "Perform an act of service for a family member or friend.",
      "Forgive someone who has hurt you and let go of resentment.",
      "Spend quality time with someone you care about.",
      "Write a note of appreciation to someone who has helped you."
    ],
    repentance: [
      "Examine your heart and ask God to help you see areas for improvement.",
      "Apologize to someone you may have wronged or hurt.",
      "Make a commitment to change a habit that's holding you back.",
      "Seek forgiveness from God through sincere prayer.",
      "Make amends for something you've done wrong."
    ],
    service: [
      "Look for opportunities to help others throughout your day.",
      "Volunteer your time for a worthy cause or organization.",
      "Help someone with a task they're struggling to complete.",
      "Listen to someone who needs to talk and offer support.",
      "Use your talents to bless others' lives."
    ],
    gratitude: [
      "Write down five things you're grateful for today.",
      "Thank someone who has made a difference in your life.",
      "Express gratitude to God for His blessings in your prayers.",
      "Look for beauty in nature and appreciate God's creation.",
      "Focus on what you have rather than what you lack."
    ],
    forgiveness: [
      "Forgive someone who has hurt you, even if it's difficult.",
      "Ask for forgiveness from someone you've wronged.",
      "Let go of a grudge you've been holding onto.",
      "Practice patience with someone who frustrates you.",
      "Choose to respond with kindness instead of anger."
    ],
    patience: [
      "Practice patience in a situation that normally frustrates you.",
      "Take time to really listen to someone without interrupting.",
      "Wait patiently for an answer to a prayer you've been praying.",
      "Be patient with yourself as you work on personal growth.",
      "Help someone learn something new with patience and kindness."
    ],
    humility: [
      "Admit when you're wrong and apologize sincerely.",
      "Ask for help with something you're struggling with.",
      "Give credit to others for their contributions and achievements.",
      "Listen to feedback and consider how you can improve.",
      "Serve others without seeking recognition or praise."
    ],
    courage: [
      "Stand up for what you believe in, even if it's unpopular.",
      "Face a fear that's been holding you back from growth.",
      "Speak up for someone who's being treated unfairly.",
      "Try something new that will challenge you to grow.",
      "Have a difficult conversation that needs to happen."
    ]
  };

  const categoryApplications = applications[category as keyof typeof applications];
  const index = (dayOfYear - 1) % categoryApplications.length;
  return categoryApplications[index];
}

// Helper functions for family stories
export function addFamilyStory(dayOfYear: number, story: Omit<FamilyStory, 'id' | 'timestamp' | 'dayOfYear'>): FamilyStory {
  const newStory: FamilyStory = {
    ...story,
    id: crypto.randomUUID(),
    timestamp: new Date(),
    dayOfYear
  };
  
  // In a real app, this would save to a database
  // For now, we'll use localStorage
  const stories = getFamilyStories();
  stories.push(newStory);
  localStorage.setItem('familyStories', JSON.stringify(stories));
  
  return newStory;
}

export function getFamilyStories(): FamilyStory[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem('familyStories');
  return stored ? JSON.parse(stored) : [];
}

export function getFamilyStoriesForDay(dayOfYear: number): FamilyStory[] {
  return getFamilyStories().filter(story => story.dayOfYear === dayOfYear);
}

export function getTodaysDayOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Generate all calendar points
export const allCompassPoints = generateCalendarCompassPoints();

// Get today's point
export function getTodaysPoint(): CompassPoint | undefined {
  const today = getTodaysDayOfYear();
  return allCompassPoints.find(point => point.dayOfYear === today);
}

// Get point by date
export function getPointByDate(date: Date): CompassPoint | undefined {
  const startOfYearDate = startOfYear(date);
  const dayOfYear = Math.floor((date.getTime() - startOfYearDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  return allCompassPoints.find(point => point.dayOfYear === dayOfYear);
} 