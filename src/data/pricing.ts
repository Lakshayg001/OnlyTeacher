export type CountryCode = 'AU' | 'GB' | 'AE';

export type PlanType = 'standard' | 'flexicarry';

export type UAECurriculum = 'international' | 'indian'; // International (IB / British / American) vs Indian (ICSE / CBSE)

export interface PlanPackage {
  sessions: string; // e.g. "25 + 1 FREE" or "8 + 1 FREE"
  totalPrice: string; // e.g. "A$384" or "£168"
  popular?: boolean;
}

export interface SubPlan {
  id: 'alpha' | 'horizon' | 'apex';
  name: string; // e.g. "ALPHA"
  tagline: string; // e.g. "1-ON-1 CLASSES"
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
    standardTitle: 'AUSTRALIA ONLINE TUTORING PLANS',
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
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'A$18/hour',
            standardPackages: [
              { sessions: '25 + 1 FREE sessions', totalPrice: 'A$384' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$528', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: 'A$16/hour',
            standardPackages: [
              { sessions: '25 + 1 FREE sessions', totalPrice: 'A$336' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$480', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'MAX 4 KIDS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardRate: 'A$14/hour',
            standardPackages: [
              { sessions: '25 + 1 FREE sessions', totalPrice: 'A$288' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$384', popular: true },
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
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'A$21/hour',
            standardPackages: [
              { sessions: '25 + 1 FREE sessions', totalPrice: 'A$456' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$576', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: 'A$19/hour',
            standardPackages: [
              { sessions: '25 + 1 FREE sessions', totalPrice: 'A$408' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$528', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'MAX 4 KIDS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardRate: 'A$16/hour',
            standardPackages: [
              { sessions: '25 + 1 FREE sessions', totalPrice: 'A$336' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$432', popular: true },
            ],
          },
        ],
      },
      {
        id: 'senior',
        title: 'SENIOR SECONDARY',
        years: 'YEARS 11 - 12',
        blurb: 'Advanced learning. Deeper understanding. Prepare for what\'s next.',
        icon: 'chart',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: 'A$29/hour',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$624' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$1,056', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: 'A$26/hour',
            standardPackages: [
              { sessions: '24 + 1 FREE sessions', totalPrice: 'A$552' },
              { sessions: '48 + 2 FREE sessions', totalPrice: 'A$960', popular: true },
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
            id: 'alpha',
            name: 'ALPHA',
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$1,584',
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$1,392',
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'MAX 4 KIDS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$1,200',
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
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$1,872',
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$1,680',
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'MAX 4 KIDS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$1,392',
          },
        ],
      },
      {
        id: 'senior',
        title: 'SENIOR SECONDARY',
        years: 'YEARS 11 - 12',
        blurb: 'Advanced learning. Prepare for future opportunities.',
        icon: 'chart',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$2,640',
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            flexiSessions: '96 + 4 FREE SESSIONS',
            flexiPrice: 'A$2,352',
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
    supportPhone: '+44 7741 271981',

    // Standard Plans UK (Image 3)
    standardTitle: 'UK ONLINE TUTORING PLANS',
    standardSubtitle: 'Personalised Learning. Exam Readiness. A Brighter Future.',
    standardBanner: 'Expert online tutoring for UK GCSE and A Level students.',
    standardTiers: [
      {
        id: 'gcse',
        title: 'GCSE',
        years: 'YEARS 10 - 11',
        blurb: 'Prepare with confidence. Build strong subject knowledge.',
        icon: 'graduation',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: '£24 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE sessions', totalPrice: '£168' },
              { sessions: '24 + 2 FREE sessions', totalPrice: '£432', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: '£22 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE sessions', totalPrice: '£160' },
              { sessions: '24 + 2 FREE sessions', totalPrice: '£408', popular: true },
            ],
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'MAX 4 KIDS',
            blurb: 'Collaborative learning in a small group of up to four.',
            color: 'emerald',
            icon: 'group',
            standardRate: '£19 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE sessions', totalPrice: '£136' },
              { sessions: '24 + 2 FREE sessions', totalPrice: '£336', popular: true },
            ],
          },
        ],
      },
      {
        id: 'alevel',
        title: 'A LEVEL',
        years: 'YEARS 12 - 13',
        blurb: 'Go deeper. Strengthen understanding. Prepare for what\'s next.',
        icon: 'chart',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: '1-ON-1 CLASSES',
            blurb: 'Personalised learning with individual attention.',
            color: 'amber',
            icon: 'user',
            standardRate: '£28 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE sessions', totalPrice: '£200' },
              { sessions: '24 + 2 FREE sessions', totalPrice: '£528', popular: true },
            ],
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'MAX 2 KIDS',
            blurb: 'Focused learning with a partner, encouraging discussion.',
            color: 'sky',
            icon: 'users',
            standardRate: '£25 / Hour',
            standardPackages: [
              { sessions: '8 + 1 FREE sessions', totalPrice: '£168' },
              { sessions: '24 + 2 FREE sessions', totalPrice: '£432', popular: true },
            ],
          },
        ],
      },
    ],

    // FlexiCarry UK (Image 4)
    flexiTitle: 'CONSISTENT LEARNING. LASTING VALUE.',
    flexiSubtitle: 'Introducing FlexiCarry by The Only Teacher',
    flexiDescription: "96 Learning Sessions. Better Value. A More Consistent Learning Journey. Choose a long-term plan for your child's current learning term and benefit from eligible unused sessions carrying forward to the next term, subject to TOT's published policy.",
    flexiBanner: '96 Learning Sessions | Carry-Forward Flexibility | Price Protection Guaranteed',
    flexiTiers: [
      {
        id: 'uk-flexi-elem',
        title: 'FLEXICARRY',
        years: 'YEARS 2 - 9',
        blurb: 'A strong foundation today for a brighter tomorrow. For Year 2 – Year 9 students.',
        icon: 'book',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE LEARNING',
            blurb: 'Dedicated one-to-one learning support for children who benefit from focused individual attention.',
            color: 'amber',
            icon: 'user',
            flexiSessions: '96 Learning Sessions',
            flexiPerSessionRate: '£12 per session',
            flexiPrice: '£1,152 total',
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'FOCUSED DUO LEARNING',
            blurb: 'A focused learning experience for two students, combining teacher guidance with collaborative learning.',
            color: 'sky',
            icon: 'users',
            flexiSessions: '96 Learning Sessions',
            flexiPerSessionRate: '£9 per session',
            flexiPrice: '£864 total',
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'SMALL-GROUP LEARNING',
            blurb: 'Learn alongside peers in a small group of up to four students.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 Learning Sessions',
            flexiPerSessionRate: '£6 per session',
            flexiPrice: '£576 total',
          },
        ],
      },
      {
        id: 'uk-flexi-gcse',
        title: 'GCSE FLEXICARRY',
        years: 'YEARS 10 - 12',
        blurb: 'A consistent learning plan to support GCSE success. For GCSE Year 10 – Year 12 students.',
        icon: 'graduation',
        plans: [
          {
            id: 'alpha',
            name: 'ALPHA',
            tagline: 'ONE-TO-ONE LEARNING',
            blurb: 'Dedicated one-to-one learning support for GCSE students.',
            color: 'amber',
            icon: 'user',
            flexiSessions: '96 Learning Sessions',
            flexiPerSessionRate: '£17 per session',
            flexiPrice: '£1,632 total',
          },
          {
            id: 'horizon',
            name: 'HORIZON',
            tagline: 'GROUP OF 2',
            blurb: 'Focused learning in a small group of two students, encouraging interaction and shared understanding.',
            color: 'sky',
            icon: 'users',
            flexiSessions: '96 Learning Sessions',
            flexiPerSessionRate: '£16 per session',
            flexiPrice: '£1,536 total',
          },
          {
            id: 'apex',
            name: 'APEX',
            tagline: 'GROUP OF UP TO 4',
            blurb: 'Collaborative learning with peers in a small-group environment.',
            color: 'emerald',
            icon: 'group',
            flexiSessions: '96 Learning Sessions',
            flexiPerSessionRate: '£13 per session',
            flexiPrice: '£1,248 total',
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
    supportPhone: '+44 7741 271981',

    // Standard Plans UAE (Image 2)
    standardTitle: 'FIND THE RIGHT LEARNING PLAN FOR YOUR CHILD',
    standardSubtitle: 'Personalised Online Tutoring for UAE Families',
    standardBanner: 'Choose Your Plan. Build Understanding. Grow with Confidence.',
    standardTiers: [], // Handled dynamically via uaeCurriculumTiers below

    // FlexiCarry UAE (Image 1)
    flexiTitle: 'INTRODUCING FLEXICARRY',
    flexiSubtitle: "Your Child's Learning Journey, Designed for the Long Term",
    flexiDescription: 'Build consistency, strengthen concepts and keep your child progressing with a long-term learning plan.',
    flexiBanner: '96 PAID SESSIONS + 4 FREE SESSIONS | 100 SESSIONS IN TOTAL | Consistent teacher-led learning journey.',
    flexiTiers: [], // Handled dynamically via uaeCurriculumTiers below

    uaeCurriculumTiers: {
      standard: {
        // IB / British / American Curriculum (Image 2)
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
                tagline: '1-ON-1 CLASSES',
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
                tagline: '1-ON-1 CLASSES',
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
                tagline: '1-ON-1 CLASSES',
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

        // ICSE / CBSE Curriculum (Image 2)
        indian: [
          {
            id: 'icse-opt1',
            title: 'ICSE / CBSE OPTION 1',
            years: 'PRIMARY LEVEL',
            blurb: 'Academic level mapping for ICSE / CBSE packages.',
            icon: 'book',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated teacher attention for ICSE/CBSE curriculum.',
                color: 'amber',
                icon: 'user',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 875' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,550', popular: true },
                ],
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo learning for ICSE/CBSE curriculum.',
                color: 'sky',
                icon: 'users',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 775' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,400', popular: true },
                ],
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'MAX 4 KIDS',
                blurb: 'Collaborative small-group study for ICSE/CBSE.',
                color: 'emerald',
                icon: 'group',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 700' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,250', popular: true },
                ],
              },
            ],
          },
          {
            id: 'icse-opt2',
            title: 'ICSE / CBSE OPTION 2',
            years: 'MIDDLE LEVEL',
            blurb: 'Academic level mapping for ICSE / CBSE packages.',
            icon: 'graduation',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated teacher attention for ICSE/CBSE curriculum.',
                color: 'amber',
                icon: 'user',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 1,025' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,900', popular: true },
                ],
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo learning for ICSE/CBSE curriculum.',
                color: 'sky',
                icon: 'users',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 950' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,750', popular: true },
                ],
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'MAX 4 KIDS',
                blurb: 'Collaborative small-group study for ICSE/CBSE.',
                color: 'emerald',
                icon: 'group',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 775' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,400', popular: true },
                ],
              },
            ],
          },
          {
            id: 'icse-opt3',
            title: 'ICSE / CBSE OPTION 3',
            years: 'SECONDARY LEVEL',
            blurb: 'Academic level mapping for ICSE / CBSE packages.',
            icon: 'chart',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated teacher attention for ICSE/CBSE curriculum.',
                color: 'amber',
                icon: 'user',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 950' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,600', popular: true },
                ],
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo learning for ICSE/CBSE curriculum.',
                color: 'sky',
                icon: 'users',
                standardPackages: [
                  { sessions: '24 + 1 FREE session', totalPrice: 'AED 1,025' },
                  { sessions: '48 + 2 FREE sessions', totalPrice: 'AED 1,900', popular: true },
                ],
              },
            ],
          },
        ],
      },

      flexicarry: {
        // IB / British / American Curriculum (Image 1)
        international: [
          {
            id: 'uae-flexi-elem',
            title: 'ELEMENTARY',
            years: 'YEARS 1 - 5',
            blurb: 'Strong foundations for a brighter future.',
            icon: 'book',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated one-to-one learning support.',
                color: 'amber',
                icon: 'user',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,168',
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo collaborative learning.',
                color: 'sky',
                icon: 'users',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,784',
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'MAX 4 KIDS',
                blurb: 'Small group study of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,304',
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
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated one-to-one learning support.',
                color: 'amber',
                icon: 'user',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,648',
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo collaborative learning.',
                color: 'sky',
                icon: 'users',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,360',
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'MAX 4 KIDS',
                blurb: 'Small group study of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,688',
              },
            ],
          },
          {
            id: 'uae-flexi-adv',
            title: 'ADVANCED',
            years: 'YEARS 10 - 12',
            blurb: 'Prepare for senior studies and future goals.',
            icon: 'chart',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated one-to-one learning support.',
                color: 'amber',
                icon: 'user',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,744',
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo collaborative learning.',
                color: 'sky',
                icon: 'users',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,936',
              },
            ],
          },
        ],

        // ICSE / CBSE Curriculum (Image 1)
        indian: [
          {
            id: 'uae-icse-opt1',
            title: 'OPTION 1',
            years: 'ICSE / CBSE',
            blurb: 'Academic level mapping for ICSE / CBSE packages is to be confirmed.',
            icon: 'book',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated one-to-one learning support.',
                color: 'amber',
                icon: 'user',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,812',
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo collaborative learning.',
                color: 'sky',
                icon: 'users',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,512',
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'MAX 4 KIDS',
                blurb: 'Small group study of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,212',
              },
            ],
          },
          {
            id: 'uae-icse-opt2',
            title: 'OPTION 2',
            years: 'ICSE / CBSE',
            blurb: 'Academic level mapping for ICSE / CBSE packages is to be confirmed.',
            icon: 'graduation',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated one-to-one learning support.',
                color: 'amber',
                icon: 'user',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,512',
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo collaborative learning.',
                color: 'sky',
                icon: 'users',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,212',
              },
              {
                id: 'apex',
                name: 'APEX',
                tagline: 'MAX 4 KIDS',
                blurb: 'Small group study of up to 4 students.',
                color: 'emerald',
                icon: 'group',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,512',
              },
            ],
          },
          {
            id: 'uae-icse-opt3',
            title: 'OPTION 3',
            years: 'ICSE / CBSE',
            blurb: 'Academic level mapping for ICSE / CBSE packages is to be confirmed.',
            icon: 'chart',
            plans: [
              {
                id: 'alpha',
                name: 'ALPHA',
                tagline: '1-ON-1 CLASSES',
                blurb: 'Dedicated one-to-one learning support.',
                color: 'amber',
                icon: 'user',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 2,912',
              },
              {
                id: 'horizon',
                name: 'HORIZON',
                tagline: 'MAX 2 KIDS',
                blurb: 'Focused duo collaborative learning.',
                color: 'sky',
                icon: 'users',
                flexiSessions: '96 + 4 FREE SESSIONS',
                flexiPrice: 'AED 3,512',
              },
            ],
          },
        ],
      },
    },
  },
};

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
    desc: 'Choose from personalised one-to-one learning or small-group formats depending on your child.',
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
