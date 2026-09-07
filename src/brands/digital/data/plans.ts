export interface PlanFeature {
  text: string
  included: boolean
  /** Variant of the feature text when billed yearly (social media analytics cadence upgrades). */
  yearlyText?: string
}

export interface Plan {
  name: string
  /** USD per month. String for custom quotes. */
  monthly: number | 'Custom'
  /** USD per month when billed yearly (only for categories with a yearly toggle). */
  yearly?: number
  popular?: boolean
  features: PlanFeature[]
}

export interface PlanCategory {
  slug: string
  title: string
  intro: string
  hasYearly: boolean
  /** Which service this belongs to, for cross-linking. */
  serviceSlug: string
  plans: Plan[]
  note?: string
}

const f = (text: string, included = true, yearlyText?: string): PlanFeature => ({
  text,
  included,
  ...(yearlyText ? { yearlyText } : {}),
})

export const PLAN_CATEGORIES: PlanCategory[] = [
  {
    slug: 'social-media-management',
    title: 'Social Media Management Plans',
    intro:
      "Choose from Base, Bronze, Silver, Gold, and Platinum to boost your brand's online presence.",
    hasYearly: true,
    serviceSlug: 'social-media-management',
    plans: [
      {
        name: 'Base',
        monthly: 55,
        yearly: 50,
        features: [
          f('Digital Marketing Platform access (Design, Curate & Schedule) — 1 user'),
          f('Launch posts (e.g., new website or social media page)'),
          f('Branded templates for campaigns'),
          f('Fully managed service — 1 month hypercare & handholding'),
          f('1 designed post a month by our team'),
          f('Unlimited self-designed & published posts'),
          f('Posts for public events', false),
          f('Post analytics review to drive improvement', false),
        ],
      },
      {
        name: 'Bronze',
        monthly: 275,
        yearly: 250,
        features: [
          f('Digital Marketing Platform access (Design, Curate & Schedule) — 1 user'),
          f('Launch posts (e.g., new website or social media page)'),
          f('Branded templates for campaigns'),
          f('Fully managed service — 3 months hypercare & handholding'),
          f('2 designed posts a month by our team'),
          f('Unlimited self-designed & published posts'),
          f('Posts for public events', false),
          f('Post analytics review — annually', true, 'Post analytics review — bi-annually'),
        ],
      },
      {
        name: 'Silver',
        monthly: 550,
        yearly: 500,
        features: [
          f('Digital Marketing Platform access (Design, Curate & Schedule) — 2 users'),
          f('Launch posts (e.g., new website or social media page)'),
          f('Branded templates for campaigns'),
          f('Fully managed service — 6 months hypercare & handholding'),
          f('1 designed post a week by our team'),
          f('Unlimited self-designed & published posts'),
          f("Posts for public events (New Year's, International Women's Day…)"),
          f('Post analytics review — bi-annually', true, 'Post analytics review — quarterly'),
        ],
      },
      {
        name: 'Gold',
        monthly: 825,
        yearly: 750,
        popular: true,
        features: [
          f('Digital Marketing Platform access (Design, Curate & Schedule) — 3 users'),
          f('Launch posts (e.g., new website or social media page)'),
          f('Branded templates for campaigns'),
          f('Fully managed service — hypercare & handholding'),
          f('2 designed posts a week by our team'),
          f('Unlimited self-designed & published posts'),
          f("Posts for public events (New Year's, International Women's Day…)"),
          f('Post analytics review — quarterly', true, 'Post analytics review — monthly'),
        ],
      },
      {
        name: 'Platinum',
        monthly: 1100,
        yearly: 1000,
        features: [
          f('Digital Marketing Platform access (Design, Curate & Schedule) — 5 users'),
          f('Launch posts (e.g., new website or social media page)'),
          f('Branded templates for campaigns'),
          f('Fully managed service — 3 months hypercare & handholding'),
          f('5 designed posts a week by our team'),
          f('Unlimited self-designed & published posts'),
          f("Posts for public events (New Year's, International Women's Day…)"),
          f('Post analytics review — monthly', true, 'Post analytics review — weekly'),
        ],
      },
    ],
  },
  {
    slug: 'web-development',
    title: 'Web Development Plans',
    intro:
      'Choose from Base, Bronze, Silver, Gold, and Platinum to build your custom website with expert support.',
    hasYearly: true,
    serviceSlug: 'website-development',
    plans: [
      {
        name: 'Base',
        monthly: 55,
        yearly: 50,
        features: [
          f('Branding, colour palette & standard iconography'),
          f('CMS & hosting'),
          f('Antivirus & backup'),
          f('Templated pages'),
          f('Standard library images / video'),
          f('Content & design updates — annually'),
          f('Custom iconography', false),
          f('Dynamic content (blog posts, custom post types)', false),
          f('Custom pages, forms & integrations', false),
          f('Booking, ordering, scheduling, e-commerce', false),
        ],
      },
      {
        name: 'Bronze',
        monthly: 275,
        yearly: 250,
        features: [
          f('Branding, colour palette & standard iconography'),
          f('CMS & hosting'),
          f('Antivirus & backup'),
          f('Templated pages'),
          f('Standard library images / video'),
          f('Standard dynamic content (blog posts)'),
          f('Content & design updates — bi-annually'),
          f('Custom iconography', false),
          f('Custom pages, forms & integrations', false),
          f('Booking, ordering, scheduling, e-commerce', false),
        ],
      },
      {
        name: 'Silver',
        monthly: 550,
        yearly: 500,
        features: [
          f('Branding, colour palette & custom iconography'),
          f('CMS & hosting, antivirus & backup'),
          f('Standard library images / video'),
          f('Standard & custom dynamic content'),
          f('Custom pages (structure & design) — up to 15 pages'),
          f('Custom forms with custom fields (no workflow)'),
          f('Simple external integrations (social media, APIs)'),
          f('Content & design updates — quarterly'),
          f('Booking, ordering, scheduling, e-commerce', false),
          f('Custom images and content design', false),
        ],
      },
      {
        name: 'Gold',
        monthly: 825,
        yearly: 750,
        popular: true,
        features: [
          f('Branding, colour palette & custom iconography'),
          f('CMS & hosting, antivirus & backup'),
          f('Standard library images / video'),
          f('Standard & custom dynamic content'),
          f('Custom pages (structure & design) — up to 20 pages'),
          f('Custom forms with custom fields (no workflow)'),
          f('Simple external integrations (social media, APIs)'),
          f('Booking, ordering, scheduling, e-commerce'),
          f('Content & design updates — monthly'),
          f('Custom images and content design', false),
        ],
      },
      {
        name: 'Platinum',
        monthly: 1100,
        yearly: 1000,
        features: [
          f('Branding, colour palette & custom iconography'),
          f('CMS & hosting, antivirus & backup'),
          f('Standard library images / video'),
          f('Standard & custom dynamic content'),
          f('Custom pages (structure & design) — up to 25 pages'),
          f('Custom forms with custom fields (no workflow)'),
          f('Simple external integrations (social media, APIs)'),
          f('Booking, ordering, scheduling, e-commerce'),
          f('Custom images and content design'),
          f('Content & design updates — weekly'),
        ],
      },
    ],
  },
  {
    slug: 'campaign-management',
    title: 'Campaign Management Plans',
    intro:
      'Scalable digital ad plans on Meta, Google & LinkedIn. From basic to advanced, we have the right fit for your business and budget.',
    hasYearly: false,
    serviceSlug: 'campaign-management',
    note: 'Minimum ad budgets are billed separately in AED.',
    plans: [
      {
        name: 'Base',
        monthly: 500,
        features: [
          f('1 ads campaign (Meta or LinkedIn — your choice)'),
          f('Ad budget: min AED 2,000'),
          f('Audience targeting'),
          f('Ad copywriting & creative (×1)'),
          f('Campaign setup & management'),
          f('Basic performance tracking & analytics (monthly report)'),
          f('Keyword research & audience targeting', false),
          f('Landing page optimization suggestions', false),
          f('Bi-weekly campaign optimization', false),
          f('A/B testing of ad creatives', false),
        ],
      },
      {
        name: 'Bronze',
        monthly: 600,
        features: [
          f('1 Google Ads campaign'),
          f('Ad budget: min AED 3,000'),
          f('Keyword research & audience targeting'),
          f('Ad copywriting & creative (×1)'),
          f('Campaign setup & management'),
          f('Basic performance tracking & analytics (monthly report)'),
          f('Pixel & conversion tracking setup', false),
          f('Landing page optimization suggestions', false),
          f('Bi-weekly campaign optimization', false),
          f('A/B testing of ad creatives', false),
        ],
      },
      {
        name: 'Silver',
        monthly: 700,
        features: [
          f('1 Google Ads campaign (Performance Max, Search or Display)'),
          f('1 Meta Ads campaign (Traffic or Engagement)'),
          f('Ad budget: min AED 5,000'),
          f('Keyword research & audience targeting'),
          f('Ad copywriting & creatives — multilingual EN/AR (×2)'),
          f('Basic pixel & conversion tracking setup'),
          f('Campaign setup & management'),
          f('Landing page optimization suggestions'),
          f('Basic performance tracking & analytics (monthly report)'),
          f('Bi-weekly campaign optimization', false),
        ],
      },
      {
        name: 'Gold',
        monthly: 1500,
        popular: true,
        features: [
          f('3 Google Ads campaigns (Performance Max, Search, Display)'),
          f('2 Meta Ads campaigns (Lead Gen, Conversion or Engagement)'),
          f('1 LinkedIn Ads campaign (Lead Gen or Conversion)'),
          f('Ad budget: min AED 10,000'),
          f('Competitor analysis & keyword research'),
          f('Advanced audience targeting (custom & lookalike)'),
          f('A/B testing of ad creatives (2 variations)'),
          f('Pixel setup & advanced conversion tracking'),
          f('Copy, design & creative development — EN/AR (×6)'),
          f('Bi-weekly optimization + comprehensive monthly reports'),
        ],
      },
      {
        name: 'Platinum',
        monthly: 2700,
        features: [
          f('5 Google Ads campaigns (incl. Shopping & YouTube)'),
          f('3 Meta Ads campaigns (Sales, Retargeting & Awareness)'),
          f('2 LinkedIn Ads campaigns (Lead Gen, Conversion)'),
          f('Ad budget: min AED 15,000+'),
          f('Advanced keyword research & behavioral analytics'),
          f('Multi-layered audience targeting (geo & custom segments)'),
          f('A/B testing on multiple ad creatives'),
          f('Custom tracking & attribution setup (GA4, Pixel, UTM)'),
          f('Copy, design & creative development — EN/AR (×10)'),
          f('Bi-weekly strategy sessions + growth insights'),
        ],
      },
    ],
  },
  {
    slug: 'brand-development',
    title: 'Brand Development Plans',
    intro: 'Effective brand development plans to elevate your business strategy and achieve market success.',
    hasYearly: false,
    serviceSlug: 'brand-development',
    plans: [
      {
        name: 'Bronze',
        monthly: 1000,
        features: [
          f('Special features: promotion'),
          f('Social media posts (before event): 3 posts over 1–3 weeks'),
          f('Social platforms included: up to 2'),
          f('Post-event follow-up: two static stories'),
          f('Website feature: basic listing'),
          f('Landing page: templated design'),
          f('Hashtag strategy & plan', false),
          f('Email marketing (before event & follow-up)', false),
          f('Analytics report', false),
        ],
      },
      {
        name: 'Silver',
        monthly: 2500,
        features: [
          f('Special features: promotion'),
          f('Hashtag strategy & plan'),
          f('Social media posts (before event): 5 posts over 1–4 weeks'),
          f('Social platforms included: up to 3'),
          f('Post-event follow-up: 4 stories or short video'),
          f('Website feature: premium listing with images'),
          f('Landing page: custom design'),
          f('Email follow-up: "Thank you for attending" email'),
          f('Email marketing (before event)', false),
          f('Analytics report', false),
        ],
      },
      {
        name: 'Gold',
        monthly: 5000,
        popular: true,
        features: [
          f('Special features: promotion'),
          f('Hashtag strategy & plan'),
          f('Social media posts (before event): 8 posts over 1–6 weeks'),
          f('Email marketing (before event): 4 emails — sign-up, welcome, reminder, final reminder'),
          f('Social platforms included: up to 4'),
          f('Post-event follow-up: 4 stories, 1 highlight reel, 2 posts'),
          f('Website feature: featured listing with blog post'),
          f('Landing page: custom design + event booking with SEO'),
          f('Email follow-up: 2 dedicated blasts (thank you + survey & recap)'),
          f('Analytics report: engagement and reach'),
        ],
      },
      {
        name: 'Platinum',
        monthly: 10000,
        features: [
          f('Special features: promotion'),
          f('Hashtag strategy & plan'),
          f('Social media posts (before event): 10 posts over 1–8 weeks'),
          f('Email marketing (before event): 5 emails incl. early-bird announcement'),
          f('Social platforms included: all major platforms'),
          f('Post-event follow-up: 4 stories, 2 videos, 5 posts'),
          f('Website feature: premier listing with dedicated section, SEO, interactive elements'),
          f('Landing page: fully customized with online booking, ticketing & RSVP, SEO'),
          f('Email follow-up: multiple campaigns — engagement, offers, missed-attendee'),
          f('Analytics report: advanced insights, demographics, conversion rates'),
        ],
      },
      {
        name: 'Platinum Plus',
        monthly: 'Custom',
        features: [
          f('Customized end-to-end event management — planning and executing the event'),
          f('Custom hashtag strategy and lead generation'),
          f('Tailored posts over an extended period'),
          f('Customized email sequence'),
          f('All-inclusive platform strategy'),
          f('Comprehensive multi-media post-event campaign'),
          f('Exclusive event showcase on website'),
          f('Bespoke landing page'),
          f('End-to-end tailored email campaigns'),
          f('Comprehensive analytics and insights'),
        ],
      },
    ],
  },
]

export const getPlanCategory = (slug: string) => PLAN_CATEGORIES.find((c) => c.slug === slug)
