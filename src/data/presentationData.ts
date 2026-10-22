export interface SlideProblemCard {
  title: string;
  description: string;
  iconType: 'unhealthy' | 'watered' | 'hygiene' | 'queues' | 'hostel' | 'jobs';
}

export interface SlideData {
  id: number;
  slideNumber: string;
  section: 'Introduction' | 'Opportunity' | 'Opportunity' | 'Opportunity' | 'Offer' | 'Financials' | 'Execution';
  title: string;
  subtitle: string;
  tagline?: string;
  category: 'Overview' | 'Business Idea' | 'Problems We Are Solving' | 'Who We Serve & Why We Win' | 'Menu & Pricing' | 'Unit Economics' | 'Live Execution';
  metrics?: {
    startupCapital: string;
    monthlyNetProfit: string;
    location: string;
  };
  highlightMetric?: {
    value: string;
    label: string;
    context: string;
  };
  keyPillars?: {
    heading: string;
    detail: string;
  }[];
  problemsGrid?: SlideProblemCard[];
  segments?: {
    segment: string;
    description: string;
    painPoint: string;
    ourAdvantage: string;
  }[];
  presenterNotes: string;
  interactiveType?: 'financial-calculator' | 'loyalty-preview' | 'live-store-link' | 'menu-preview';
}

export const PRESENTATION_SLIDES: SlideData[] = [
  {
    id: 1,
    slideNumber: '01',
    section: 'Introduction',
    category: 'Overview',
    title: 'Frost & Flavor',
    tagline: 'The Fresh Bar',
    subtitle: 'Ice-cold natural juices and fresh yogurt with express WhatsApp delivery for students, lecturers, and staff in Ruiru.',
    metrics: {
      startupCapital: 'KSh 45,000',
      monthlyNetProfit: 'KSh 41,589',
      location: 'Zetech Main Gate, Ruiru',
    },
    presenterNotes: 'Open confidently: "Good day, panel. I am proud to present Frost & Flavor — The Fresh Bar. We are launching an agile, high-margin natural juice and fresh drinking yogurt shop right at the Zetech University Main Gate in Ruiru. With a lean startup capital of only KSh 45,000, we project an impressive monthly net profit of KSh 41,589 through express WhatsApp delivery."'
  },
  {
    id: 2,
    slideNumber: '02',
    section: 'Opportunity',
    category: 'Business Idea',
    title: 'The Business Idea',
    subtitle: 'Fresh, Cold & Delivered in 15-20 Minutes',
    highlightMetric: {
      value: '15-20 Min',
      label: 'Express Delivery Time',
      context: 'Direct to Zetech lecture halls, faculty offices, and off-campus student hostels'
    },
    keyPillars: [
      {
        heading: '100% Natural Fresh Juices',
        detail: 'Cold-pressed locally sourced mangoes, pineapples, passion fruit, and watermelon with zero preservatives and no artificial powders.'
      },
      {
        heading: 'Creamy Drinking Yogurt & Fruit Cups',
        detail: 'Fresh local dairy yogurt blended with real fruit purees and layered granola parfait cups — filling, nutritious breakfast and lunch substitutes.'
      },
      {
        heading: 'Seamless WhatsApp Ordering',
        detail: 'Students and lecturers order with 2 taps via WhatsApp chat or student web portal, paying instantly via Lipa na M-Pesa with 0 delivery friction.'
      }
    ],
    presenterNotes: 'Explain the core value: "Our business idea addresses speed and quality: fresh cold juices and creamy yogurt delivered to students and staff in 15 to 20 minutes. Students don\'t want to waste their 15-minute break walking to town."'
  },
  {
    id: 3,
    slideNumber: '03',
    section: 'Opportunity',
    category: 'Problems We Are Solving',
    title: 'Problems We Are Solving',
    subtitle: 'Six critical bottlenecks facing the 15,000+ Zetech University community.',
    problemsGrid: [
      {
        title: 'Unhealthy Food Options',
        description: 'Campus canteens only sell greasy mandazis, chips, and high-sugar sodas that trigger energy crashes during afternoon lectures.',
        iconType: 'unhealthy'
      },
      {
        title: 'Watered-Down Drinks',
        description: 'Roadside fruit vendors dilute juices with unboiled tap water and artificial food coloring, risking waterborne infections.',
        iconType: 'watered'
      },
      {
        title: 'Hygiene Concerns',
        description: 'Students and faculty demand food prepared in a certified clean, sanitized, and transparent environment.',
        iconType: 'hygiene'
      },
      {
        title: 'Long Break Queues',
        description: 'With only 15 minutes between lecture blocks, students cannot stand in long cafeteria lines and make it to their next class in time.',
        iconType: 'queues'
      },
      {
        title: 'Hostel Isolation',
        description: 'Students studying in Ruiru Heights and Sunrise hostels lack healthy refreshments without walking 1.5km to Ruiru town center.',
        iconType: 'hostel'
      },
      {
        title: 'Lack of Student Jobs',
        description: 'Zetech students have very few dignified, flexible part-time jobs that fit around their academic timetable.',
        iconType: 'jobs'
      }
    ],
    presenterNotes: 'Walk through the 6 problems on your slide: "Notice how these six problems directly reinforce each other. By solving hygiene, queues, and hostel isolation while hiring student delivery runners, Frost & Flavor becomes an essential campus utility."'
  },
  {
    id: 4,
    slideNumber: '04',
    section: 'Opportunity',
    category: 'Who We Serve & Why We Win',
    title: 'Who We Serve & Why We Win',
    subtitle: 'Strategic customer segmentation and our competitive moat near Zetech Main Gate.',
    segments: [
      {
        segment: 'Zetech Students (15,000+)',
        description: 'Undergrads, diploma students, and hostel residents needing quick morning fuel and exam cram refreshments.',
        painPoint: 'Tight budget (KES 70-120 per snack), limited 15-minute lecture breaks, desire for sweet/healthy drinks.',
        ourAdvantage: 'Student pricing from KSh 70, 8-stamp loyalty punch card, dorm runner delivery.'
      },
      {
        segment: 'Lecturers & University Staff (450+)',
        description: 'Faculty professors, administrative staff, and IT support stationed in air-conditioned or busy department offices.',
        painPoint: 'No time to leave desks during office hours, higher disposable income, care deeply about health and hygiene.',
        ourAdvantage: 'Direct-to-office WhatsApp delivery, fresh drinking yogurt, premium packaging, invoice receipts.'
      }
    ],
    highlightMetric: {
      value: '78%',
      label: 'Projected Retention Rate',
      context: 'Driven by our digital 8-stamp card and student loyalty rewards'
    },
    presenterNotes: 'Segment differentiation is key: "We serve both students with budget-friendly juices and loyalty stamps, and lecturers with premium drinking yogurt delivered directly to their staff room desks."'
  },
  {
    id: 5,
    slideNumber: '05',
    section: 'Offer',
    category: 'Menu & Pricing',
    title: 'Focused Menu & Pricing Structure',
    subtitle: 'High-margin, fast-prep natural juices and fresh yogurt tailored to student budgets.',
    keyPillars: [
      {
        heading: 'Fresh Natural Juices (KSh 70 / 100)',
        detail: 'Apple Mango Passion, Citrus Zing, and Green Revive. 350ml Regular for KSh 70, 500ml Jumbo for KSh 100. Gross Margin: 68%.'
      },
      {
        heading: 'Fresh Drinking Yogurt (KSh 90 / 120)',
        detail: 'Locally cultured rich probiotic drinking yogurt infused with real strawberry puree, sweet vanilla, or tropical passion. Gross Margin: 62%.'
      },
      {
        heading: 'Fresh Yogurt Fruit Cups (KSh 100 / 130)',
        detail: 'Layered Greek yogurt parfait with toasted granola, wildflower honey, and freshly diced mango/strawberries. Gross Margin: 65%.'
      }
    ],
    highlightMetric: {
      value: 'KSh 70',
      label: 'Starting Price Point',
      context: 'Competitive with commercial sodas while delivering 10x superior nutrition'
    },
    interactiveType: 'menu-preview',
    presenterNotes: 'Show pricing strength: "Our starting price of KSh 70 makes fresh natural juice directly competitive with a bottle of soda and mandazi, converting everyday campus snack spend into healthy recurring revenue."'
  },
  {
    id: 6,
    slideNumber: '06',
    section: 'Financials',
    category: 'Unit Economics',
    title: 'Financial Projections & Startup Capital',
    subtitle: 'A lean KSh 45,000 launch budget generating KSh 41,589 in monthly net profit.',
    metrics: {
      startupCapital: 'KSh 45,000',
      monthlyNetProfit: 'KSh 41,589',
      location: 'Zetech Main Gate, Ruiru',
    },
    highlightMetric: {
      value: '1.1 Mo',
      label: 'Capital Payback Period',
      context: 'KSh 45,000 seed investment recovered within 34 calendar days'
    },
    keyPillars: [
      {
        heading: 'Startup Capital Allocation (KSh 45,000)',
        detail: 'Heavy-duty commercial blender (KSh 16,000), insulated ice chest & dispensers (KSh 8,500), branded eco-cups & straws (KSh 6,500), initial fruit & yogurt inventory (KSh 8,000), signage & permits (KSh 6,000).'
      },
      {
        heading: 'Monthly Revenue Target (KSh 115,000)',
        detail: 'Achieved with just 45-50 drinks per day at an average selling price of KSh 90 across 26 academic operating days.'
      },
      {
        heading: 'Net Profit Projection (KSh 41,589)',
        detail: 'After deducting fruit/yogurt COGS (KSh 38,000), Gate A kiosk space rent (KSh 12,000), student commission runner wages (KSh 16,000), and utilities (KSh 7,411).'
      }
    ],
    interactiveType: 'financial-calculator',
    presenterNotes: 'Invite judges to adjust sliders: "Look at the unit economics: With only KSh 45,000 startup capital, our breakeven is just 22 cups per day! At 50 cups daily, we generate KSh 41,589 net profit per month."'
  },
  {
    id: 7,
    slideNumber: '07',
    section: 'Execution',
    category: 'Live Execution',
    title: 'Interactive Prototype & WhatsApp Flow',
    subtitle: 'Experience the live ordering engine, student loyalty pass, and instant WhatsApp dispatch.',
    highlightMetric: {
      value: '100%',
      label: 'Operational Readiness',
      context: 'Full student menu, customizer, M-Pesa simulator & loyalty pass live now'
    },
    keyPillars: [
      {
        heading: '1-Click Express WhatsApp Dispatch',
        detail: 'Orders automatically format student name, hostel room number, drink customizations, and M-Pesa receipt for instant dispatch to our barista WhatsApp.'
      },
      {
        heading: 'Student Loyalty Engine (Frost Pass)',
        detail: '8-stamp digital punch card (8th free) + 15% student ID discount verification for all Zetech registration numbers.'
      },
      {
        heading: 'Ready for Rollout at Zetech Main Gate',
        detail: 'All supplier contacts in Kiambu secured, kiosk location identified opposite Gate A, and student delivery runners ready.'
      }
    ],
    interactiveType: 'live-store-link',
    presenterNotes: 'The big close: "Judges, instead of just imagining this on slides, we have built the complete interactive platform right here. Let us switch to the live store, test an order with WhatsApp integration, and see the Frost Pass in action!"'
  }
];
