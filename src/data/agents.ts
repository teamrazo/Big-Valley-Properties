export interface Agent {
  id: string;
  slug: string;
  name: string;
  title: string;
  licenseNumber: string;
  phone: string;
  email: string;
  photo: string;
  bio: string;
  specialties: string[];
  counties: ('Trinity' | 'Shasta')[];
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  featured: boolean;
  certifications?: string[];
  achievements?: string[];
  yearsExperience?: number;
  testimonial?: {
    text: string;
    author: string;
    location: string;
  };
}

export const agents: Agent[] = [
  {
    id: 'retta-treanor',
    slug: 'retta-treanor',
    name: 'Retta Treanor',
    title: 'Broker / Owner, CRS',
    licenseNumber: 'CA DRE #01301868',
    phone: '(530) 410-1992',
    email: 'retta@bvptrinity.com',
    photo: '/images/agents/retta-treanor-real.png',
    bio: 'Retta Treanor is the founder and Broker/Owner of Big Valley Properties, the top-selling brokerage in Trinity County. With deep roots in Northern California and a passion for helping families find their dream homes, Retta brings unmatched local expertise and dedication to every transaction. Her philosophy is simple: Educate, Negotiate, Communicate. Whether you\'re buying your first mountain cabin or selling a multi-generational ranch, Retta\'s personalized approach ensures a seamless experience from start to finish.',
    specialties: ['Residential Sales', 'Mountain Properties', 'Ranch & Land', 'First-Time Buyers', 'Luxury Cabins'],
    counties: ['Trinity', 'Shasta'],
    social: {
      facebook: 'https://facebook.com/bigvalleyproperties',
      instagram: 'https://instagram.com/bigvalleyproperties',
    },
    featured: true,
    certifications: ['Certified Residential Specialist (CRS)', 'Licensed Broker', 'REALTOR®'],
    achievements: ['#1 Top-Selling Brokerage in Trinity County', '20+ Years of Excellence', '500+ Successful Transactions'],
    yearsExperience: 20,
    testimonial: {
      text: 'Retta is the ultimate professional! She is very knowledgeable about the local market and always puts her clients first.',
      author: 'James & Linda K.',
      location: 'Weaverville',
    },
  },
  {
    id: 'shannon-aikins',
    slug: 'shannon-aikins',
    name: 'Shannon Aikins',
    title: 'REALTOR® SFR, CNE',
    licenseNumber: 'CA DRE #01701263',
    phone: '(530) 524-2479',
    email: 'shannon@bvptrinity.com',
    photo: '/images/agents/shannon-aikins-real.png',
    bio: 'Shannon Aikins is a top-selling REALTOR® specializing in Trinity County properties. A long-time resident of the area, Shannon\'s intimate knowledge of the local communities, schools, and outdoor recreation makes her an invaluable resource for buyers and sellers alike. Known for her expert follow-through and attention to detail, Shannon goes above and beyond to make every client feel like family.',
    specialties: ['Residential Sales', 'Cabins & Cottages', 'Waterfront Properties', 'Relocation'],
    counties: ['Trinity'],
    social: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
    featured: true,
    certifications: ['Short Sale & Foreclosure Resource (SFR)', 'Certified Negotiation Expert (CNE)', 'REALTOR®'],
    achievements: ['Top-Selling Agent 2025', 'Client Satisfaction Award'],
    yearsExperience: 15,
    testimonial: {
      text: 'Shannon made the process of buying our first home so much easier than we expected. Highly recommend!',
      author: 'Mike & Ashley R.',
      location: 'Lewiston',
    },
  },
  {
    id: 'lydia-mcallister',
    slug: 'lydia-mcallister',
    name: 'Lydia McAllister',
    title: 'REALTOR®',
    licenseNumber: 'CA DRE #01987349',
    phone: '(530) 394-0239',
    email: 'lydia@bvptrinity.com',
    photo: '/images/agents/lydia-mcallister-real.png',
    bio: 'Lydia McAllister is a dedicated REALTOR® at Big Valley Properties with an exceptional understanding of the Trinity County real estate market. Lydia\'s commitment to client satisfaction and her deep knowledge of the region\'s unique properties — from mountain retreats to riverside cabins — make her a trusted partner for anyone looking to buy or sell in the area.',
    specialties: ['Rural Properties', 'Mountain Homes', 'Land Sales', 'Buyer Representation'],
    counties: ['Trinity'],
    social: {},
    featured: true,
    certifications: ['REALTOR®'],
    achievements: ['Rising Star Agent 2025'],
    yearsExperience: 5,
    testimonial: {
      text: 'Lydia\'s dedication to finding us the perfect property was remarkable. She truly understands Trinity County.',
      author: 'Patricia H.',
      location: 'Weaverville',
    },
  },
  {
    id: 'shalynn-hutchason',
    slug: 'shalynn-hutchason',
    name: 'Shalynn Hutchason',
    title: 'REALTOR®',
    licenseNumber: 'CA DRE #02101044',
    phone: '(530) 784-3909',
    email: 'shalynn@bvptrinity.com',
    photo: '/images/agents/shalynn-hutchason-real.png',
    bio: 'Shalynn Hutchason brings energy and dedication to every real estate transaction. As a REALTOR® with Big Valley Properties, Shalynn is passionate about helping clients navigate the unique market of Trinity County. Her approachable personality and strong negotiation skills ensure a smooth and rewarding experience for buyers and sellers.',
    specialties: ['Residential Sales', 'First-Time Buyers', 'Property Marketing', 'Negotiations'],
    counties: ['Trinity'],
    social: {},
    featured: true,
    certifications: ['REALTOR®'],
    yearsExperience: 4,
    testimonial: {
      text: 'Shalynn was incredible to work with! Her energy and knowledge made our home-buying experience a joy.',
      author: 'David & Karen L.',
      location: 'Hayfork',
    },
  },
  {
    id: 'brandon-rea',
    slug: 'brandon-rea',
    name: 'Brandon Rea',
    title: 'REALTOR®',
    licenseNumber: 'CA DRE #01970208',
    phone: '(707) 380-9069',
    email: 'brandon@bvptrinity.com',
    photo: '/images/agents/brandon-rea-real.png',
    bio: 'Brandon Rea is an experienced REALTOR® who brings a wealth of knowledge to the Big Valley Properties team. With expertise in both residential and land sales, Brandon helps clients find the perfect property in Trinity County\'s stunning landscapes. His strong work ethic and client-first approach have earned him a loyal following among buyers and sellers.',
    specialties: ['Land Sales', 'Residential Properties', 'Ranch & Agricultural', 'Investment Properties'],
    counties: ['Trinity'],
    social: {},
    featured: true,
    certifications: ['REALTOR®'],
    yearsExperience: 8,
    testimonial: {
      text: 'Brandon found us the perfect ranch property. His knowledge of land and agricultural properties is outstanding.',
      author: 'Robert D.',
      location: 'Hayfork',
    },
  },
  {
    id: 'roni-parish',
    slug: 'roni-parish',
    name: 'Roni Parish',
    title: 'REALTOR®',
    licenseNumber: 'CA DRE #02141326',
    phone: '(916) 217-2982',
    email: 'roni@bvptrinity.com',
    photo: '/images/agents/roni-parish-real.png',
    bio: 'Roni Parish is a passionate REALTOR® at Big Valley Properties with a talent for matching clients with their dream properties. Whether it\'s a cozy cabin in the woods or a spacious family home, Roni\'s dedication and market insight ensure every client receives personalized service and expert guidance throughout the process.',
    specialties: ['Residential Sales', 'Cabins & Retreats', 'Buyer Advocacy', 'Market Analysis'],
    counties: ['Trinity', 'Shasta'],
    social: {},
    featured: true,
    certifications: ['REALTOR®'],
    yearsExperience: 3,
    testimonial: {
      text: 'Roni went above and beyond to help us find our cabin retreat. She truly cares about her clients.',
      author: 'Sarah & Tom M.',
      location: 'Junction City',
    },
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find(a => a.slug === slug);
}

export function getAgentsByCounty(county: 'Trinity' | 'Shasta'): Agent[] {
  return agents.filter(a => a.counties.includes(county));
}
