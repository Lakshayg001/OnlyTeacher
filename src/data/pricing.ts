export type CountryCode = 'AU' | 'GB' | 'AE' | 'NZ';

export type PlanType = 'standard' | 'flexicarry' | 'membership';

export type UAECurriculum = 'international' | 'indian'; // International (IB / British / American) vs Indian (ICSE / CBSE)

export interface PlanPackage {
  sessions: string; // e.g. "25 + 1 FREE" or "8 + 1 FREE"
  totalPrice: string; // e.g. "A$384" or "£168"
  rate?: string; // e.g. "£16 / class"
  popular?: boolean;
}

export interface SubPlan {
  id: 'alpha' | 'horizon' | 'apex';
  name: string; // e.g. "ALPHA"
  tagline: string; // e.g. "ONE-TO-ONE CLASSES"
  blurb: string; // e.g. "Personalised learning with individual attention."
  color: 'amber' | 'sky' | 'emerald';
  icon: 'user' | 'users' | 'group';
  notAvailable?: boolean;

  // Standard plan rates
  standardRate?: string; // e.g. "A$18/hour" or "£24 / Hour"
  standardPackages?: PlanPackage[];

  // FlexiCarry plan rates
  flexiSessions?: string; // e.g. "96 + 4 FREE SESSIONS" or "96 Learning Sessions"
  flexiPerSessionRate?: string; // e.g. "£12 per session"
  flexiPrice?: string; // e.g. "A$1,584" or "£1,152 total"
}

export interface TierCategory {
  id: string;
  title: string; // e.g. "ELEMENTARY" or "GCSE"
  years: string; // e.g. "YEARS 1 - 5" or "YEARS 10 - 11"
  blurb: string; // e.g. "Build strong foundations for a brighter future."
  icon: 'book' | 'graduation' | 'chart';
  plans: SubPlan[];
}

export interface CountryPricingData {
  countryCode: CountryCode;
  countryName: string;
  flagCode: string;
  currency: string;
  currencyCode: string;
  heroLandmark: string;
  supportPhone?: string;

  // Standard Plans Info
  standardTitle: string;
  standardSubtitle: string;
  standardBanner: string;
  standardTiers: TierCategory[];

  // FlexiCarry Info
  flexiTitle: string;
  flexiSubtitle: string;
  flexiDescription: string;
  flexiBanner: string;
  flexiTiers: TierCategory[];

  // UAE Specific curriculum variants
  uaeCurriculumTiers?: {
    standard: {
      international: TierCategory[];
      indian: TierCategory[];
    };
    flexicarry: {
      international: TierCategory[];
      indian: TierCategory[];
    };
  };
}

export const PRICING_DATA: Record<CountryCode, CountryPricingData> = {
  // -------------------------------------------------------------
  // AUSTRALIA (AU)
  // -------------------------------------------------------------
  AU: {
    countryCode: 'AU',
    countryName: 'Australia',
    flagCode: 'AU',
    currency: 'A$',
    currencyCode: 'AUD',
    heroLandmark: 'Sydney Harbour & Opera House',
    supportPhone: '+44 7884 981882',
    standardTitle: 'AUSTRALIA ONLINE TUITION PLANS',
    standardSubtitle: 'Personalised Learning. Clear Concepts. Confidence That Grows.',
    standardBanner: 'More Learning. Extra Classes Included. | Choose the learning format that works best for your child.',
    flexiTitle: 'INTRODUCING FLEXICARRY',
    flexiSubtitle: 'More Learning. More Flexibility. More Possibilities.',
    flexiDescription: "A long-term learning plan designed to support your child's progress, confidence and academic journey.",
    flexiBanner: '96 + 4 FREE SESSIONS | 100 Learning Sessions. One Consistent Learning Journey.',
    
    // Standard Plans Australia
    standardTiers: [
      {
        id: 'elementary',
        title: 'ELEMENTARY',
        years: 'YEARS 1 - 5',
        blurb: 'Build strong foundations for a brighter future.',
        icon: 'book',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'A$18 / class',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$396' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$696', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$348' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$624', popular: true },
            ],
          },
        ],
      },
      {
        id: 'intermediate',
        title: 'INTERMEDIATE',
        years: 'YEARS 6 - 10',
        blurb: 'Strengthen concepts. Build skills. Prepare for higher learning.',
        icon: 'graduation',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'A$24 / class',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$528' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$960', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$456' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$816', popular: true },
            ],
          },
        ],
      },
      {
        id: 'advanced',
        title: 'ADVANCED',
        years: 'YEARS 10 - 12',
        blurb: 'Advanced learning. Deeper understanding. Prepare for what\'s next.',
        icon: 'chart',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'A$32 / class',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$696' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$1,296', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: '2 STUDENTS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$624' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$1,152', popular: true },
            ],
          },
        ],
      },
    ],

    // FlexiCarry Australia
    flexiTiers: [
      {
        id: 'elementary',
        title: 'ELEMENTARY',
        years: 'YEARS 1 - 5',
        blurb: 'Build strong foundations for a brighter future.',
        icon: 'book',
        plans: [
          {
            id: 'apex',
            name: 'APEX FC100',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPerSessionRate: 'A$11 per session',
            flexiPrice: 'A$1,056',
          },
        ],
      },
      {
        id: 'intermediate',
        title: 'INTERMEDIATE',
        years: 'YEARS 6 - 10',
        blurb: 'Strengthen concepts. Build skills. Prepare for higher learning.',
        icon: 'graduation',
        plans: [
          {
            id: 'apex',
            name: 'APEX FC100',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPerSessionRate: 'A$14 per session',
            flexiPrice: 'A$1,344',
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // UNITED KINGDOM (GB)
  // -------------------------------------------------------------
  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flagCode: 'GB',
    currency: '£',
    currencyCode: 'GBP',
    heroLandmark: 'London Westminster & Tower Bridge',
    supportPhone: '+44 7884 981882',

    // Standard Plans UK (Image 3)
    standardTitle: 'UK ONLINE TUITION PLANS',
    standardSubtitle: 'Personalised Learning. Exam Readiness. A Brighter Future.',
    standardBanner: 'Expert online tuition for UK GCSE and A Level students.',
    standardTiers: [
      {
        id: 'elementary',
        title: 'ELEMENTARY',
        years: 'YEARS 2 - 9',
        blurb: 'A strong foundation today for a brighter tomorrow. For Year 2 – Year 9 students.',
        icon: 'book',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: '£16 / Hour',
            standardPackages: [
              { sessions: '24 + 1 FREE (25 sessions)', totalPrice: '£384', rate: '£16 / class' },
              { sessions: '48 + 2 FREE (50 sessions)', totalPrice: '£624', rate: '£13 / class', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: '£13 / Hour',
            standardPackages: [
              { sessions: '24 + 1 FREE (25 sessions)', totalPrice: '£312', rate: '£13 / class' },
              { sessions: '48 + 2 FREE (50 sessions)', totalPrice: '£480', rate: '£10 / class', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardRate: '£9 / Hour',
            standardPackages: [
              { sessions: '48 + 2 FREE (50 sessions)', totalPrice: '£432', rate: '£9 / class', popular: true },
            ],
          },
        ],
      },
      {
        id: 'gcse-alevel',
        title: 'GCSE & A LEVEL',
        years: 'YEARS 10 - 12',
        blurb: 'Prepare with confidence. Build strong subject knowledge.',
        icon: 'graduation',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: '£21 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE (9 sessions)', totalPrice: '£168', rate: '£21 / class' },
              { sessions: '24 + 1 FREE (25 sessions)', totalPrice: '£432', rate: '£18 / class', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: '£20 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE (9 sessions)', totalPrice: '£160', rate: '£20 / class' },
              { sessions: '24 + 1 FREE (25 sessions)', totalPrice: '£408', rate: '£17 / class', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardRate: '£15 / Hour',
            standardPackages: [
              { sessions: '48 + 2 FREE (50 sessions)', totalPrice: '£720', rate: '£15 / class', popular: true },
            ],
          },
        ],
      },
      {
        id: 'alevel-13',
        title: 'A LEVEL',
        years: 'YEAR 13',
        blurb: 'Go deeper. Strengthen understanding. Prepare for what\'s next.',
        icon: 'chart',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: '£25 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE (9 sessions)', totalPrice: '£200', rate: '£25 / class' },
              { sessions: '24 + 1 FREE (25 sessions)', totalPrice: '£528', rate: '£22 / class', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: '£21 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE (9 sessions)', totalPrice: '£168', rate: '£21 / class' },
              { sessions: '24 + 1 FREE (25 sessions)', totalPrice: '£432', rate: '£18 / class', popular: true },
            ],
          },
        ],
      },
    ],

    // FlexiCarry UK (Image 4)
    flexiTitle: 'CONSISTENT LEARNING. LASTING VALUE.',
    flexiSubtitle: 'Introducing FlexiCarry by The Only Teacher',
    flexiDescription: "96 Learning Sessions. Better Value. A More Consistent Learning Journey. Choose a long-term plan for your child's current learning term and benefit from eligible unused sessions carrying forward to the next term, subject to TOT's published policy.",
    flexiBanner: '96 + 4 FREE SESSIONS | 100 Learning Sessions. One Consistent Learning Journey.',
    flexiTiers: [
      {
        id: 'uk-flexi-elem',
        title: 'ELEMENTARY',
        years: 'YEARS 2 - 9',
        blurb: 'A strong foundation today for a brighter tomorrow. For Year 2 – Year 9 students.',
        icon: 'book',
        plans: [
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'SMALL-GROUP LEARNING',
            blurb: 'Learn alongside peers in a small group of up to four students.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 + 4 FREE (100 sessions)',
            flexiPerSessionRate: '£6 per session',
            flexiPrice: '£576',
          },
        ],
      },
    ],
  },

  // -------------------------------------------------------------
  // UAE (AE)
  // -------------------------------------------------------------
  AE: {
    countryCode: 'AE',
    countryName: 'UAE',
    flagCode: 'AE',
    currency: 'AED ',
    currencyCode: 'AED',
    heroLandmark: 'Dubai Skyline & Burj Khalifa',
    supportPhone: '+44 7884 981882',

    // Standard Plans UAE
    standardTitle: 'Online Tuition for UAE Students',
    standardSubtitle: 'Personalised Online Tuition for UAE Families',
    standardBanner: 'Choose Your Plan. Build Understanding. Grow with Confidence.',
    standardTiers: [], // Handled dynamically via uaeCurriculumTiers below

    // FlexiCarry UAE
    flexiTitle: 'INTRODUCING FLEXICARRY',
    flexiSubtitle: "Your Child's Learning Journey, Designed for the Long Term",
    flexiDescription: 'Build consistency, strengthen concepts and keep your child progressing with a long-term learning plan.',
    flexiBanner: '96 PAID SESSIONS + 4 FREE SESSIONS | 100 SESSIONS IN TOTAL | Consistent teacher-led learning journey.',
    flexiTiers: [], // Handled dynamically via uaeCurriculumTiers below

    uaeCurriculumTiers: {
      standard: {
        // Track 1: IB / British / American Curriculum
        international: [
          {
            id: 'elem-uae',
            title: 'ELEMENTARY',
            years: 'YEARS 1 - 5',
            blurb: 'Strong foundations for a brighter future.',
            icon: 'book',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: 'ONE-TO-ONE CLASSES',
                blurb: 'One-to-One personalised learning with dedicated teacher attention.',
                color: 'amber',
                icon: 'user',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 912' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,728', popular: true },
                ],
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'FOCUSED DUO',
                blurb: 'Focused duo learning with one other partner student.',
                color: 'sky',
                icon: 'users',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 840' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,536', popular: true },
                ],
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'SMALL GROUP',
                blurb: 'Collaborative small-group sessions of up to four.',
                color: 'emerald',
                icon: 'group',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 744' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,296', popular: true },
                ],
              },
            ],
          },
          {
            id: 'inter-uae',
            title: 'INTERMEDIATE',
            years: 'YEARS 6 - 10',
            blurb: 'Strengthen concepts. Build skills. Prepare for higher learning.',
            icon: 'graduation',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: 'ONE-TO-ONE CLASSES',
                blurb: 'One-to-One personalised learning with dedicated teacher attention.',
                color: 'amber',
                icon: 'user',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 1,056' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,968', popular: true },
                ],
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'FOCUSED DUO',
                blurb: 'Focused duo learning with one other partner student.',
                color: 'sky',
                icon: 'users',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 984' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,824', popular: true },
                ],
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'SMALL GROUP',
                blurb: 'Collaborative small-group sessions of up to four.',
                color: 'emerald',
                icon: 'group',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 840' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,488', popular: true },
                ],
              },
            ],
          },
          {
            id: 'adv-uae',
            title: 'ADVANCED',
            years: 'YEARS 10 - 12',
            blurb: 'Prepare for senior studies, IB DP and university entrance.',
            icon: 'chart',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: 'ONE-TO-ONE CLASSES',
                blurb: 'One-to-One personalised learning with dedicated teacher attention.',
                color: 'amber',
                icon: 'user',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 1,248' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 2,016', popular: true },
                ],
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'FOCUSED DUO',
                blurb: 'Focused duo learning with one other partner student.',
                color: 'sky',
                icon: 'users',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 1,152' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 2,112', popular: true },
                ],
              },
            ],
          },
        ],

        // Track 2: ICSE / CBSE Curriculum
        indian: [
          {
            id: 'uae-icse-elem',
            title: 'ELEMENTARY',
            years: 'YEARS 1 - 5',
            blurb: 'Strong foundations in ICSE / CBSE syllabus with dedicated support.',
            icon: 'book',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: 'ONE-TO-ONE CLASSES',
                blurb: 'One-to-One personalised learning with dedicated teacher attention.',
                color: 'amber',
                icon: 'user',
                standardRate: 'AED 40 / class',
                standardPackages: [
                  { sessions: '24 + 1 (25 sessions)', totalPrice: 'AED 888' },
                  { sessions: '48 + 2 (50 sessions)', totalPrice: 'AED 1,632', popular: true },
                ],
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'UP TO 4 STUDENTS',
                blurb: 'Collaborative small-group study of up to four students.',
                color: 'emerald',
                icon: 'group',
                standardPackages: [
                  { sessions: '48 + 2 (50 sessions)', totalPrice: 'AED 1,296', popular: true },
                ],
              },
            ],
          },
          {
            id: 'uae-icse-inter',
            title: 'INTERMEDIATE',
            years: 'YEARS 6 - 10',
            blurb: 'Strengthen ICSE / CBSE core concepts, problem-solving and exam readiness.',
            icon: 'graduation',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: 'ONE-TO-ONE CLASSES',
                blurb: 'One-to-One personalised learning with dedicated teacher attention.',
                color: 'amber',
                icon: 'user',
                standardRate: 'AED 45 / class',
                standardPackages: [
                  { sessions: '24 + 1 (25 sessions)', totalPrice: 'AED 1,008' },
                  { sessions: '48 + 2 (50 sessions)', totalPrice: 'AED 1,824', popular: true },
                ],
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'UP TO 4 STUDENTS',
                blurb: 'Collaborative small-group study of up to four students.',
                color: 'emerald',
                icon: 'group',
                standardPackages: [
                  { sessions: '48 + 2 (50 sessions)', totalPrice: 'AED 2,160', popular: true },
                ],
              },
            ],
          },
          {
            id: 'uae-icse-adv',
            title: 'ADVANCED',
            years: 'YEARS 10 - 12',
            blurb: 'Advanced board prep for ICSE Class 10 & CBSE Classes 11-12.',
            icon: 'chart',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: 'ONE-TO-ONE CLASSES',
                blurb: 'One-to-One personalised learning with dedicated teacher attention.',
                color: 'amber',
                icon: 'user',
                standardRate: 'AED 55 / class',
                standardPackages: [
                  { sessions: '24 + 1 (25 sessions)', totalPrice: 'AED 1,248' },
                  { sessions: '48 + 2 (50 sessions)', totalPrice: 'AED 2,352', popular: true },
                ],
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: '2 STUDENTS',
                blurb: 'Focused duo learning with one other partner student.',
                color: 'sky',
                icon: 'users',
                standardPackages: [
                  { sessions: '24 + 1 (25 sessions)', totalPrice: 'AED 1,152' },
                  { sessions: '48 + 2 (50 sessions)', totalPrice: 'AED 2,208', popular: true },
                ],
              },
            ],
          },
        ],
      },

      flexicarry: {
        // Track 1: IB / British / American Curriculum
        international: [
          {
            id: 'uae-flexi-elem',
            title: 'ELEMENTARY',
            years: 'YEARS 1 - 5',
            blurb: 'Strong foundations for a brighter future.',
            icon: 'book',
            plans: [
              {
                id: 'apex',
                name: 'APEX FLEXICARRY',
                tagline: 'UP TO 4 STUDENTS',
                blurb: 'Collaborative small-group learning of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS (100 sessions)',
                flexiPerSessionRate: 'AED 28 per session',
                flexiPrice: 'AED 2,688',
              },
            ],
          },
          {
            id: 'uae-flexi-inter',
            title: 'INTERMEDIATE',
            years: 'YEARS 6 - 10',
            blurb: 'Strengthen concepts. Build skills. Prepare for higher learning.',
            icon: 'graduation',
            plans: [
              {
                id: 'apex',
                name: 'APEX FLEXICARRY',
                tagline: 'UP TO 4 STUDENTS',
                blurb: 'Collaborative small-group learning of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS (100 sessions)',
                flexiPerSessionRate: 'AED 36 per session',
                flexiPrice: 'AED 3,456',
              },
            ],
          },
        ],

        // Track 2: ICSE / CBSE Curriculum
        indian: [
          {
            id: 'uae-icse-flexi-elem',
            title: 'ELEMENTARY',
            years: 'YEARS 1 - 5',
            blurb: 'Strong foundations in ICSE / CBSE curriculum.',
            icon: 'book',
            plans: [
              {
                id: 'apex',
                name: 'APEX FLEXICARRY',
                tagline: 'UP TO 4 STUDENTS',
                blurb: 'Collaborative small-group learning of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS (100 sessions)',
                flexiPerSessionRate: 'AED 24 per session',
                flexiPrice: 'AED 2,304',
              },
            ],
          },
          {
            id: 'uae-icse-flexi-inter',
            title: 'INTERMEDIATE',
            years: 'YEARS 6 - 10',
            blurb: 'Strengthen concepts and consistent academic momentum.',
            icon: 'graduation',
            plans: [
              {
                id: 'apex',
                name: 'APEX FLEXICARRY',
                tagline: 'UP TO 4 STUDENTS',
                blurb: 'Collaborative small-group learning of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS (100 sessions)',
                flexiPerSessionRate: 'AED 28 per session',
                flexiPrice: 'AED 2,688',
              },
            ],
          },
        ],
      },
    },
  },

  // -------------------------------------------------------------
  // NEW ZEALAND (NZ)
  // -------------------------------------------------------------
  NZ: {
    countryCode: 'NZ',
    countryName: 'New Zealand',
    flagCode: 'NZ',
    currency: 'NZ$',
    currencyCode: 'NZD',
    heroLandmark: 'Auckland Sky Tower & Southern Alps',
    supportPhone: '+64 21 148 1882',

    // Standard Plans (TriOrbit) Info
    standardTitle: 'Online Tuition for New Zealand Students',
    standardSubtitle: 'Personalised Learning. NCEA & Cambridge Excellence. Confidence That Grows.',
    standardBanner: 'More Learning. Extra Classes Included. | Tailored 1-to-1 and Small Group Tuition in New Zealand.',
    standardTiers: [
      {
        id: 'elementary',
        title: 'ELEMENTARY',
        years: 'YEARS 1 - 5',
        blurb: 'Build strong foundations for a brighter future.',
        icon: 'book',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'NZ$35 / class',
            standardPackages: [
              { sessions: '24 + 1 (25 sessions)', totalPrice: 'NZ$768' },
              { sessions: '48 + 2 (50 sessions)', totalPrice: 'NZ$1,392', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardPackages: [
              { sessions: '24 + 1 (25 sessions)', totalPrice: 'NZ$672' },
              { sessions: '48 + 2 (50 sessions)', totalPrice: 'NZ$1,152', popular: true },
            ],
          },
        ],
      },
      {
        id: 'intermediate',
        title: 'INTERMEDIATE',
        years: 'YEARS 6 - 10',
        blurb: 'Strengthen concepts. Build skills. Prepare for higher learning.',
        icon: 'graduation',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'NZ$42 / class',
            standardPackages: [
              { sessions: '24 + 1 (25 sessions)', totalPrice: 'NZ$936' },
              { sessions: '48 + 2 (50 sessions)', totalPrice: 'NZ$1,680', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardPackages: [
              { sessions: '24 + 1 (25 sessions)', totalPrice: 'NZ$840' },
              { sessions: '48 + 2 (50 sessions)', totalPrice: 'NZ$1,488', popular: true },
            ],
          },
        ],
      },
      {
        id: 'advanced',
        title: 'ADVANCED',
        years: 'YEARS 10 - 12',
        blurb: 'Advanced learning. Deeper understanding. Prepare for NCEA and beyond.',
        icon: 'chart',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'NZ$55 / class',
            standardPackages: [
              { sessions: '24 + 1 (25 sessions)', totalPrice: 'NZ$1,248' },
              { sessions: '48 + 2 (50 sessions)', totalPrice: 'NZ$2,304', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: '2 STUDENTS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardPackages: [
              { sessions: '24 + 1 (25 sessions)', totalPrice: 'NZ$1,152' },
              { sessions: '48 + 2 (50 sessions)', totalPrice: 'NZ$2,112', popular: true },
            ],
          },
        ],
      },
    ],

    // FlexiCarry Info
    flexiTitle: 'INTRODUCING FLEXICARRY',
    flexiSubtitle: 'More Learning. More Flexibility. More Possibilities.',
    flexiDescription: "A long-term learning plan designed to support your child's progress, confidence and academic journey in New Zealand.",
    flexiBanner: '96 + 4 FREE SESSIONS | 100 Learning Sessions. One Consistent Learning Journey.',
    flexiTiers: [
      {
        id: 'elementary',
        title: 'ELEMENTARY',
        years: 'YEARS 1 - 5',
        blurb: 'Build strong foundations for a brighter future.',
        icon: 'book',
        plans: [
          {
            id: 'apex',
            name: 'APEX FLEXICARRY',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 + 4 FREE SESSIONS (100 sessions)',
            flexiPerSessionRate: 'NZ$20 per session',
            flexiPrice: 'NZ$1,920',
          },
        ],
      },
      {
        id: 'intermediate',
        title: 'INTERMEDIATE',
        years: 'YEARS 6 - 10',
        blurb: 'Strengthen concepts. Build skills. Prepare for higher learning.',
        icon: 'graduation',
        plans: [
          {
            id: 'apex',
            name: 'APEX FLEXICARRY',
            tagline: 'UP TO 4 STUDENTS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 + 4 FREE SESSIONS (100 sessions)',
            flexiPerSessionRate: 'NZ$28 per session',
            flexiPrice: 'NZ$2,688',
          },
        ],
      },
    ],
  },
};

export interface NzTriOrbitRow {
  plan: string;
  years1_5: string;
  years6_10: string;
  years10_12: string;
}

export interface NzFlexiCarryRow {
  plan: string;
  years1_5: string;
  years6_10: string;
}

export const NZ_TRIORBIT_TABLE: NzTriOrbitRow[] = [
  {
    plan: 'Alpha (One-to-One) - Standard per class',
    years1_5: 'NZ$35',
    years6_10: 'NZ$42',
    years10_12: 'NZ$55',
  },
  {
    plan: 'Alpha - 24+1 (25 sessions)',
    years1_5: 'NZ$768',
    years6_10: 'NZ$936',
    years10_12: 'NZ$1,248',
  },
  {
    plan: 'Alpha - 48+2 (50 sessions)',
    years1_5: 'NZ$1,392',
    years6_10: 'NZ$1,680',
    years10_12: 'NZ$2,304',
  },
  {
    plan: 'Apex (up to 4 students) - 24+1 (25 sessions)',
    years1_5: 'NZ$672',
    years6_10: 'NZ$840',
    years10_12: 'Not offered',
  },
  {
    plan: 'Apex - 48+2 (50 sessions)',
    years1_5: 'NZ$1,152',
    years6_10: 'NZ$1,488',
    years10_12: 'Not offered',
  },
  {
    plan: 'Horizon (2 students) - 24+1 (25 sessions)',
    years1_5: 'Not offered',
    years6_10: 'Not offered',
    years10_12: 'NZ$1,152',
  },
  {
    plan: 'Horizon - 48+2 (50 sessions)',
    years1_5: 'Not offered',
    years6_10: 'Not offered',
    years10_12: 'NZ$2,112',
  },
];

export const NZ_FLEXICARRY_TABLE: NzFlexiCarryRow[] = [
  {
    plan: 'Apex FlexiCarry - 96+4 (100 sessions)',
    years1_5: 'NZ$1,920',
    years6_10: 'NZ$2,688',
  },
];

export const STANDARD_FEATURES = [
  {
    icon: 'user',
    title: 'One-to-One Learning',
    desc: 'Dedicated teacher attention through our Alpha format with personalised pacing.',
  },
  {
    icon: 'users',
    title: 'Focused Duo Learning',
    desc: 'Learn with one other partner student through Horizon for collaborative interaction.',
  },
  {
    icon: 'group',
    title: 'Small-Group Learning',
    desc: 'Collaborative small-group sessions of up to four students through Apex.',
  },
  {
    icon: 'lightbulb',
    title: 'Concept Clarity',
    desc: 'Support with understanding challenging topics, school homework and exam tests.',
  },
  {
    icon: 'calendar',
    title: 'Flexible Scheduling',
    desc: 'Classes arranged conveniently around your family availability and school schedule.',
  },
  {
    icon: 'star',
    title: 'Trial Class Included',
    desc: 'Let your child experience a class before deciding, subject to applicable trial arrangements.',
  },
];

export const FLEXICARRY_FEATURES = [
  {
    icon: 'calendar',
    title: 'Consistent Learning',
    desc: 'A longer-term plan supports a regular learning routine and steady academic development.',
  },
  {
    icon: 'lightbulb',
    title: 'Stronger Concept Clarity',
    desc: 'More opportunities to revisit difficult topics, ask questions and strengthen understanding.',
  },
  {
    icon: 'refresh',
    title: 'Eligible Session Carry-Forward',
    desc: 'Eligible unused sessions may carry forward to the next term, subject to the published carry-forward policy.',
  },
  {
    icon: 'user',
    title: 'Flexible Learning',
    desc: 'Choose from personalised One-to-One learning or small-group formats depending on your child.',
  },
  {
    icon: 'shield',
    title: 'Price Protection',
    desc: 'Your agreed plan price remains protected and will not increase during the covered term.',
  },
  {
    icon: 'gift',
    title: 'Bonus Sessions Included',
    desc: 'Receive free additional sessions (up to 4 free sessions) with your long-term FlexiCarry package.',
  },
];

export interface MembershipBenefit {
  title: string;
  subtitle: string;
  icon: 'headphones' | 'workshop' | 'calendar' | 'reports' | 'plan' | 'teacher' | 'message' | 'star';
  color: 'amber' | 'emerald';
}

export interface MembershipTier {
  years: string;
  price: string;
  regularPrice?: string;
  duration: string;
  color: 'amber' | 'emerald';
}

export interface UkMembershipData {
  eyebrow: string;
  brandTitle: string;
  durationBadge: string;
  originalPrice: string;
  offerTagline: string;
  tiers: MembershipTier[];
  availabilityNote: string;
  includedHeading: string;
  benefits: MembershipBenefit[];
  footerTagline: string;
}

export const UK_MEMBERSHIP_DATA: UkMembershipData = {
  eyebrow: 'UK MEMBERSHIP · LIMITED AVAILABILITY',
  brandTitle: 'TOT Privé',
  durationBadge: '15-WEEK MEMBERSHIP',
  originalPrice: '£99',
  offerTagline: 'TOT PRIORITY OFFER',
  tiers: [
    {
      years: 'YEARS 2–9',
      price: '£65',
      duration: 'for 15 weeks',
      color: 'amber',
    },
    {
      years: 'YEARS 10–13',
      price: '£75',
      duration: 'for 15 weeks',
      color: 'emerald',
    },
  ],
  availabilityNote: 'Limited availability: 50 families per tier',
  includedHeading: 'Everything included for 15 weeks',
  benefits: [
    {
      icon: 'headphones',
      color: 'amber',
      title: '5 live doubt-clearing sessions',
      subtitle: '(30-minute One-to-One sessions).',
    },
    {
      icon: 'workshop',
      color: 'emerald',
      title: '2 live revision workshops',
      subtitle: '(30 minutes each, teacher-led and matched to year group).',
    },
    {
      icon: 'calendar',
      color: 'emerald',
      title: 'Flexible rescheduling',
      subtitle: '(up to 10 eligible reschedules).',
    },
    {
      icon: 'reports',
      color: 'amber',
      title: '3 teacher progress reports',
      subtitle: '(monthly progress and next steps).',
    },
    {
      icon: 'plan',
      color: 'amber',
      title: 'Personalised 15-week study plan',
      subtitle: "(shaped around your child's goals).",
    },
    {
      icon: 'teacher',
      color: 'emerald',
      title: 'Same teacher commitment',
      subtitle: '(continuity wherever possible).',
    },
    {
      icon: 'message',
      color: 'emerald',
      title: 'Teacher message support',
      subtitle: '(short questions between lessons).',
    },
    {
      icon: 'star',
      color: 'amber',
      title: 'Priority booking access',
      subtitle: '(earlier access to slots and workshops).',
    },
  ],
  footerTagline: 'The Only Teacher | One Platform. Every Subject. A Brighter Future.',
};

export interface AunzMembershipData {
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  launchNotice: string;
  durationBadge: string;
  availabilityNote: string;
  includedHeading: string;
  benefits: MembershipBenefit[];
  terms: string[];
  footerTagline: string;
  regions: {
    AU: {
      name: string;
      code: 'AU';
      flag: string;
      currencyCode: string;
      currencySymbol: string;
      eyebrow: string;
      tiers: MembershipTier[];
    };
    NZ: {
      name: string;
      code: 'NZ';
      flag: string;
      currencyCode: string;
      currencySymbol: string;
      eyebrow: string;
      tiers: MembershipTier[];
    };
  };
}

export const AUNZ_MEMBERSHIP_DATA: AunzMembershipData = {
  title: 'TOT Privé - Membership Plan, Australia & New Zealand',
  subtitle: 'Australia & New Zealand',
  tagline: 'A Little More for Your Learning Journey.',
  description:
    'TOT Privé is a 15-week membership that sits on top of any Alpha (One-to-One), Horizon (two-student) or Apex (small group) base plan. It adds the extra layer busy parents ask for most: quick doubt help, exam-time revision, and total flexibility around the family schedule.',
  launchNotice:
    'Launch prices apply with a base plan purchase of 24 sessions or more. One child per membership.',
  durationBadge: '15-WEEK MEMBERSHIP',
  availabilityNote: 'Limited availability: 50 families per tier',
  includedHeading: 'What your family gets (every 15 weeks)',
  benefits: [
    {
      icon: 'headphones',
      color: 'amber',
      title: '5 live doubt-clearing sessions',
      subtitle: 'Five 30-minute One-to-One sessions, book anytime a tricky topic comes up.',
    },
    {
      icon: 'workshop',
      color: 'emerald',
      title: '2 live revision workshops',
      subtitle: '30 minutes each, teacher-led and matched to year group.',
    },
    {
      icon: 'calendar',
      color: 'emerald',
      title: 'Flexible rescheduling',
      subtitle: 'Up to 10 eligible reschedules across the 15 weeks.',
    },
    {
      icon: 'reports',
      color: 'amber',
      title: '3 teacher progress reports',
      subtitle: 'Monthly progress and next steps.',
    },
    {
      icon: 'plan',
      color: 'amber',
      title: 'Personalised 15-week study plan',
      subtitle: "Shaped around your child's goals.",
    },
    {
      icon: 'teacher',
      color: 'emerald',
      title: 'Same teacher commitment',
      subtitle: 'Continuity wherever possible.',
    },
    {
      icon: 'message',
      color: 'emerald',
      title: 'Teacher message support',
      subtitle: 'Short questions between lessons.',
    },
    {
      icon: 'star',
      color: 'amber',
      title: 'Priority booking access',
      subtitle: 'Earlier access to slots and workshops.',
    },
  ],
  terms: [
    'Valid only with a regular Tuition plan purchase of 24 sessions or more.',
    'Limited availability: 50 families per tier.',
    'One child per membership. Unused benefits do not roll over.',
    'No lock-in: cancel anytime. No automatic renewal.',
    'No joining fee and no cancellation fee.',
  ],
  footerTagline: 'The Only Teacher | One Platform. Every Subject. A Brighter Future.',
  regions: {
    AU: {
      name: 'Australia',
      code: 'AU',
      flag: 'AU',
      currencyCode: 'AUD',
      currencySymbol: 'A$',
      eyebrow: 'AUSTRALIA MEMBERSHIP · LIMITED AVAILABILITY',
      tiers: [
        {
          years: 'YEARS 1–6',
          regularPrice: 'A$169',
          price: 'A$129',
          duration: 'for 15 weeks',
          color: 'amber',
        },
        {
          years: 'YEARS 7–12',
          regularPrice: 'A$199',
          price: 'A$149',
          duration: 'for 15 weeks',
          color: 'emerald',
        },
      ],
    },
    NZ: {
      name: 'New Zealand',
      code: 'NZ',
      flag: 'NZ',
      currencyCode: 'NZD',
      currencySymbol: 'NZ$',
      eyebrow: 'NEW ZEALAND MEMBERSHIP · LIMITED AVAILABILITY',
      tiers: [
        {
          years: 'YEARS 1–6',
          regularPrice: 'NZ$169',
          price: 'NZ$129',
          duration: 'for 15 weeks',
          color: 'amber',
        },
        {
          years: 'YEARS 7–12',
          regularPrice: 'NZ$199',
          price: 'NZ$149',
          duration: 'for 15 weeks',
          color: 'emerald',
        },
      ],
    },
  },
};

export const MEMBERSHIP_FEATURES = [
  {
    icon: 'star',
    title: 'Priority Booking Access',
    desc: 'Get first access to peak teaching slots and master workshops before general release.',
  },
  {
    icon: 'user',
    title: 'Dedicated Continuity',
    desc: 'Same-teacher commitment ensuring consistent progress tracking across the 15 weeks.',
  },
  {
    icon: 'calendar',
    title: 'Generous Rescheduling',
    desc: 'Up to 10 eligible lesson reschedules so learning fits smoothly into family schedules.',
  },
  {
    icon: 'lightbulb',
    title: '1-to-1 Doubt Resolution',
    desc: 'Direct one-on-one sessions to rapidly clarify complex topics and homework challenges.',
  },
  {
    icon: 'shield',
    title: 'Comprehensive Reporting',
    desc: '3 monthly teacher reports providing actionable insights and academic milestones.',
  },
  {
    icon: 'gift',
    title: 'Exclusive Workshops',
    desc: 'Tailored live group revision workshops matched to your child’s exact UK year group.',
  },
];


