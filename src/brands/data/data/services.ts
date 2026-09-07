import type { Service } from '@data/types';

/**
 * The nine services offered by Rothian Data. Summaries, statements, process
 * steps and key features are reproduced verbatim from each live service page.
 */
export const services: Service[] = [
  {
    slug: 'strategy-data-governance',
    title: 'Strategy & Data Governance',
    summary:
      'We create data strategies and governance frameworks to ensure your data is ethical, compliant, secure, and trusted across the enterprise.',
    statement:
      'We define data strategies and governance frameworks to ensure your data is secure, compliant, ethical, and trusted, enabling better decision-making across your organization.',
    image: '/data/images/services/strategy-data-governance.webp',
    process: [
      {
        title: 'Strategic Alignment',
        body: 'We collaborate with your team to define clear goals, align your vision with data-driven initiatives, and identify the key business drivers for a robust data strategy.',
      },
      {
        title: 'Framework Development',
        body: 'We design governance frameworks that ensure compliance, security, and data integrity, establishing a solid foundation for data management across your organization.',
      },
      {
        title: 'Continuous Monitoring',
        body: 'We provide ongoing monitoring systems to track data governance, ensuring it evolves with emerging challenges, technological advancements, and regulatory changes.',
      },
    ],
    features: [
      {
        title: 'Compliance Management',
        body: 'We ensure your data management practices comply with local and international regulations, minimizing legal risks and penalties.',
      },
      {
        title: 'Data Security',
        body: 'We implement robust security measures to protect your data from breaches, ensuring its confidentiality, integrity, and availability.',
      },
      {
        title: 'Scalable Governance',
        body: 'Our governance frameworks are flexible and scalable, allowing them to grow with your organization and adapt to changing business needs.',
      },
    ],
  },
  {
    slug: 'advanced-analytics',
    title: 'Advanced Analytics',
    summary:
      'We turn raw data into actionable insights with advanced analytics, statistical modeling, and machine learning for smarter decision-making.',
    statement:
      'We turn raw data into valuable insights using predictive analytics, statistical models, and machine learning, helping you make smarter, data-driven decisions.',
    image: '/data/images/services/advanced-analytics.webp',
    process: [
      {
        title: 'Data Collection & Preprocessing',
        body: 'We gather and clean your data, preparing it for deep analysis.',
      },
      {
        title: 'Advanced Modeling & Analytics',
        body: 'We apply machine learning and predictive analytics to uncover hidden patterns.',
      },
      {
        title: 'Data Visualization & Reporting',
        body: 'We create clear, actionable visualizations and reports that make complex data easy to interpret and act upon.',
      },
    ],
    features: [
      {
        title: 'Predictive Analytics',
        body: 'We leverage powerful predictive models to anticipate market trends, customer behavior, and future business outcomes, enabling proactive decision-making.',
      },
      {
        title: 'Advanced Statistical Models',
        body: 'By applying sophisticated statistical techniques, we uncover hidden patterns and relationships in your data, providing deeper insights into your business performance.',
      },
      {
        title: 'Real-Time Reporting',
        body: 'We design automated reporting systems that deliver real-time, actionable insights, allowing your team to respond quickly to emerging trends and business needs.',
      },
    ],
  },
  {
    slug: 'cloud-engineering',
    title: 'Cloud Engineering',
    summary:
      'We build scalable, cloud-native data platforms, including pipelines, warehouses, and compute infrastructures, designed for performance and security.',
    statement:
      'We design and build secure, scalable cloud-native data platforms, including pipelines, data warehouses, and computing infrastructures, optimized for performance, security, and regulatory compliance.',
    image: '/data/images/services/cloud-engineering.webp',
    process: [
      {
        title: 'Platform Architecture & Design',
        body: 'We create a tailored cloud infrastructure that meets your unique business needs, ensuring it is scalable, secure, and aligned with industry best practices.',
      },
      {
        title: 'Pipeline Development & Integration',
        body: 'We build efficient and reliable data pipelines that streamline data flow across your organization, ensuring seamless integration with existing systems.',
      },
      {
        title: 'Ongoing Optimization & Support',
        body: 'We continuously monitor and optimize your cloud infrastructure to ensure peak performance, security, and compliance with evolving industry standards.',
      },
    ],
    features: [
      {
        title: 'Scalable Infrastructure',
        body: 'We design cloud solutions that can scale as your business grows, ensuring the infrastructure adapts to changing demands.',
      },
      {
        title: 'Secure Data Pipelines',
        body: 'Our secure, cloud-native pipelines protect your data throughout its lifecycle, from collection to processing, ensuring it’s always safe and compliant.',
      },
      {
        title: 'Cloud-Native Solutions',
        body: 'We utilize the latest cloud technologies to create flexible, high-performance systems that align with your business’s evolving needs and regulatory requirements.',
      },
    ],
  },
  {
    slug: 'ai-ml-solutions',
    title: 'AI & ML Solutions',
    summary:
      'We develop ethical, high-performance AI systems with machine learning, NLP, and automation, delivering real-world business impact.',
    statement:
      'We develop high-performance AI systems using machine learning, natural language processing (NLP), and automation, solving complex business problems and delivering real-world impact.',
    image: '/data/images/services/ai-ml-solutions.webp',
    process: [
      {
        title: 'AI Strategy & Planning',
        body: 'We collaborate with your team to define the most suitable AI strategies tailored to your business needs and goals.',
      },
      {
        title: 'Model Development & Training',
        body: 'We design and train machine learning models using your data, ensuring they provide actionable insights and solve specific business challenges.',
      },
      {
        title: 'Deployment & Continuous Learning',
        body: 'We deploy AI solutions that continuously learn from new data, ensuring they evolve over time to maintain high performance and relevance.',
      },
    ],
    features: [
      {
        title: 'Natural Language Processing (NLP)',
        body: 'We leverage NLP to automate processes, analyze text data, and extract meaningful insights, driving efficiency and enhancing customer interactions.',
      },
      {
        title: 'Custom AI Models',
        body: 'We develop tailor-made machine learning models that address your unique business challenges, enabling more precise decision-making.',
      },
      {
        title: 'Continuous Learning',
        body: 'Our AI models are designed to continuously learn and adapt, improving their performance over time and ensuring they stay relevant as your business evolves.',
      },
    ],
  },
  {
    slug: 'data-monetization',
    title: 'Data Monetization',
    summary:
      'We help you unlock new revenue streams from your data through scalable, ethical monetization models that turn insight into direct business value.',
    statement:
      'We help unlock new revenue streams from your data by developing ethical, scalable monetization strategies that transform insights into business value.',
    image: '/data/images/services/data-monetization.webp',
    process: [
      {
        title: 'Data Valuation',
        body: 'We assess the value of your data, identifying opportunities to generate revenue through both direct and indirect monetization models.',
      },
      {
        title: 'Strategy Development',
        body: 'We design scalable, ethical monetization strategies that align with your business goals and comply with relevant regulations.',
      },
      {
        title: 'Implementation & Growth',
        body: 'We deploy monetization models and track their performance to ensure long-term growth, profitability, and value extraction.',
      },
    ],
    features: [
      {
        title: 'Scalable Monetization',
        body: 'We create flexible, scalable monetization models that grow with your business, ensuring long-term value from your data.',
      },
      {
        title: 'Ethical Data Sharing',
        body: 'We ensure that data monetization follows ethical standards, protecting privacy and maintaining compliance with industry regulations.',
      },
      {
        title: 'Revenue Generation',
        body: 'We help you turn your data into a direct source of revenue, unlocking new business opportunities and increasing overall profitability.',
      },
    ],
  },
  {
    slug: 'bi-dashboards-reporting',
    title: 'BI, Dashboards & Reporting',
    summary:
      'Real-time dashboards and business intelligence tools that transform complex data into clear, actionable insights for leaders and teams.',
    statement:
      'We provide real-time dashboards and business intelligence tools that turn complex data into actionable insights, helping your teams stay informed and make smarter decisions.',
    image: '/data/images/services/bi-dashboards-reporting.webp',
    process: [
      {
        title: 'Business Needs Assessment',
        body: 'We collaborate with your team to define key performance metrics (KPIs) and identify what insights are most valuable for your business.',
      },
      {
        title: 'Dashboard Design',
        body: 'We create custom, user-friendly dashboards that present real-time data in an intuitive format, empowering your team to act swiftly.',
      },
      {
        title: 'Integration & Automation',
        body: 'We integrate dashboards and reporting tools with your existing systems and automate reporting processes for efficiency and accuracy.',
      },
    ],
    features: [
      {
        title: 'Custom Dashboards',
        body: 'We design tailored dashboards that highlight key metrics in real-time, enabling immediate insights and faster decision-making.',
      },
      {
        title: 'Real-Time Data',
        body: 'We ensure that your dashboards and reports provide up-to-the-minute information, keeping you on top of important trends and events as they unfold.',
      },
      {
        title: 'Automated Reporting',
        body: 'Our automated reporting systems deliver timely insights with minimal effort, streamlining the reporting process and ensuring accuracy.',
      },
    ],
  },
  {
    slug: 'digital-transformation',
    title: 'Digital Transformation',
    summary:
      'We modernize workflows with AI, automation, and cloud engineering, future-proofing your organization’s digital ecosystem.',
    statement:
      'We help modernize your business by integrating cutting-edge AI, cloud, and automation technologies to drive operational efficiency and future-proof your organization.',
    image: '/data/images/services/digital-transformation.webp',
    process: [
      {
        title: 'Digital Readiness Assessment',
        body: 'We evaluate your current systems and processes to identify areas that require transformation, ensuring a smooth transition to digital solutions.',
      },
      {
        title: 'Solution Design',
        body: 'We design and implement digital solutions, integrating AI, cloud, and automation technologies to streamline operations and enhance efficiency.',
      },
      {
        title: 'Continuous Optimization',
        body: 'We continuously improve your digital ecosystem, ensuring it evolves with emerging business needs and technological advancements.',
      },
    ],
    features: [
      {
        title: 'AI & Cloud Integration',
        body: 'We integrate AI and cloud technologies into your existing infrastructure to drive efficiencies, reduce costs, and enable scalability.',
      },
      {
        title: 'Process Automation',
        body: 'We automate key business processes, reducing manual effort and enabling your team to focus on high-value tasks.',
      },
      {
        title: 'Seamless Transformation',
        body: 'We ensure a smooth and seamless transformation to digital solutions, providing support and guidance throughout the journey to ensure lasting success.',
      },
    ],
  },
  {
    slug: 'data-science',
    title: 'Data Science',
    summary:
      'We apply statistical modeling and advanced analytics to uncover insights from data, enabling informed decision-making and driving strategic growth.',
    statement:
      'We specialize in providing data solutions designed to address your unique business challenges. From data management to advanced analytics, we turn your data into a strategic asset that drives smarter decision-making.',
    image: '/data/images/services/data-science.webp',
    process: [
      {
        title: 'Data Collection and Preprocessing',
        body: 'We begin by gathering and cleaning your data to ensure it’s accurate, consistent, and ready for analysis. Our preprocessing includes data cleaning, normalization, and feature selection.',
      },
      {
        title: 'Machine Learning and Predictive Modeling',
        body: 'We use advanced machine learning algorithms to build predictive models tailored to your business needs. These models help forecast future trends, customer behavior, and potential risks, empowering you to make data-driven decisions.',
      },
      {
        title: 'Data Visualization and Reporting',
        body: 'We present the results through intuitive data visualizations and interactive dashboards, making complex data easy to understand and helping you make informed decisions quickly.',
      },
    ],
    features: [
      {
        title: 'Scalable Models',
        body: 'Our scalable models grow with your business, ensuring long-term value and adaptability in an evolving data landscape.',
      },
      {
        title: 'Advanced Machine Learning',
        body: 'Deep dive into your data with predictive analytics and machine learning insights.',
      },
      {
        title: 'Custom Solutions',
        body: 'Tailored data solutions designed specifically for your business needs.',
      },
    ],
  },
  {
    slug: 'data-culture-enablement',
    title: 'Data Culture & Enablement',
    summary:
      'We empower your teams through data literacy, tool adoption, and mindset transformation, embedding data-driven decision-making into your culture.',
    statement:
      'We foster a data-driven culture within your organization by improving data literacy, enabling tool adoption, and transforming mindsets to make data an integral part of decision-making.',
    image: '/data/images/services/data-culture-enablement.webp',
    process: [
      {
        title: 'Data Literacy Training',
        body: 'We offer tailored training programs to empower your team with the skills and knowledge to leverage data for everyday decision-making.',
      },
      {
        title: 'Tool Adoption & Integration',
        body: 'We assist in the adoption of the right data tools, ensuring seamless integration into your workflows and enhancing collaboration.',
      },
      {
        title: 'Cultural Transformation',
        body: 'We guide your organization through a mindset shift, embedding a data-first culture that enables informed, data-driven decision-making at every level.',
      },
    ],
    features: [
      {
        title: 'Data Literacy Programs',
        body: 'We deliver customized data literacy programs that empower teams to confidently use data in daily operations and strategic decisions.',
      },
      {
        title: 'Tool Adoption',
        body: 'We ensure the successful adoption and integration of advanced data tools, enhancing efficiency and collaboration across your organization.',
      },
      {
        title: 'Mindset Transformation',
        body: 'We help cultivate a culture where data-driven decision-making becomes the norm, empowering your team to leverage data as a strategic asset.',
      },
    ],
  },
];

export const getService = (slug?: string): Service | undefined =>
  services.find((s) => s.slug === slug);

/** Shared framing copy from the live service template. */
export const serviceCopy = {
  whatWeDoEyebrow: 'What We Do',
  whatWeDoHeading: 'Tailored Data Solutions for Your Business',
  processEyebrow: 'Our Process',
  processHeading: 'Unlocking the Power of Data',
  processBody:
    'Our approach is designed to provide a seamless, results-driven experience, ensuring that each service we deliver is tailored to your specific needs and goals.',
  featuresEyebrow: 'Key Features',
  featuresHeading: 'Everything You Need for Data Excellence',
  featuresBody:
    'Each service we offer is built on a foundation of core features that drive impactful results and ensure long-term success for your business:',
};
