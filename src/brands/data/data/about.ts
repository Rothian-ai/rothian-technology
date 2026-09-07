import type { ValuePillar } from '@data/types';

/** All copy below is reproduced from data.rothian.com/about-us. */
export const about = {
  eyebrow: 'Who We Are',
  heading: 'The New Wave of Data Engineering',
  body: [
    'We’re a startup founded by data engineers who’ve built systems at scale. Now we’re bringing that expertise to businesses ready to harness the power of their data without the enterprise price tag or bureaucracy.',
    'No legacy baggage. No outdated methodologies. Just modern, cloud-native solutions built with the latest technologies and best practices. We move fast, iterate quickly, and deliver results that matter.',
  ],
  /** Shorter variant used on the homepage. */
  homeBody:
    'We are a startup founded by experienced data engineers who have built and scaled systems across multiple industries. We believe in moving fast without sacrificing reliability. No bureaucracy. No legacy baggage. Just modern, cloud-native solutions built with the latest technologies and best practices. We move fast, iterate quickly, and deliver results that matter.',
  image: '/data/images/site/about-portrait.webp',
};

export const positioning: ValuePillar[] = [
  {
    title: 'Mission-Driven',
    body: 'We’re on a mission to democratize access to enterprise-grade data solutions for businesses of all sizes.',
  },
  {
    title: 'Innovation First',
    body: 'Building tomorrow’s data infrastructure today with cutting-edge technologies and fresh perspectives.',
  },
  {
    title: 'Client Obsessed',
    body: 'Your success is our success. We work as true partners, not just vendors.',
  },
];

export const mission = {
  eyebrow: 'Mission',
  heading: 'Our Mission',
  body: 'We believe data is the foundation of modern innovation. Our mission is to democratize advanced analytics, making sophisticated insights accessible to organizations of all sizes. Through cutting-edge technology and human expertise, we help you see what others miss.',
  image: '/data/images/site/our-mission.webp',
};

export const coreValues = {
  eyebrow: 'Why choose us',
  heading: 'Our Core Values',
  body: 'We push the boundaries of what’s possible with data technology, constantly evolving to stay ahead of the curve.',
  image: '/data/images/site/core-values.webp',
  items: [
    {
      title: 'Innovation',
      body: 'We push the boundaries of what’s possible with data technology, constantly evolving to stay ahead of the curve.',
    },
    {
      title: 'Security',
      body: 'Your data’s integrity is paramount. We implement enterprise-grade security protocols across all operations.',
    },
    {
      title: 'Collaboration',
      body: 'Success comes from partnerships. We work alongside your team to achieve your unique business objectives.',
    },
  ] satisfies ValuePillar[],
};
