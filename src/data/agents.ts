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
}

export const agents: Agent[] = [
  {
    id: 'retta-treanor',
    slug: 'retta-treanor',
    name: 'Retta Treanor',
    title: 'Broker / Owner',
    licenseNumber: 'CA DRE #01301868',
    phone: '(530) 410-1992',
    email: 'retta@bvptrinity.com',
    photo: '/images/agents/retta-treanor.jpg',
    bio: 'Retta Treanor is the founder and Broker/Owner of Big Valley Properties, the top-selling brokerage in Trinity County. With deep roots in Northern California and a passion for helping families find their dream homes, Retta brings unmatched local expertise and dedication to every transaction. Her philosophy is simple: Educate, Negotiate, Communicate. Whether you\'re buying your first mountain cabin or selling a multi-generational ranch, Retta\'s personalized approach ensures a seamless experience from start to finish.',
    specialties: ['Residential Sales', 'Mountain Properties', 'Ranch & Land', 'First-Time Buyers', 'Luxury Cabins'],
    counties: ['Trinity', 'Shasta'],
    social: {
      facebook: 'https://facebook.com/bigvalleyproperties',
      instagram: 'https://instagram.com/bigvalleyproperties',
    },
    featured: true,
  },
  {
    id: 'shannon-aikins',
    slug: 'shannon-aikins',
    name: 'Shannon Aikins',
    title: 'REALTOR®',
    licenseNumber: 'CA DRE #02145678',
    phone: '(530) 623-4567',
    email: 'shannon@bvptrinity.com',
    photo: '/images/agents/shannon-aikins.jpg',
    bio: 'Shannon Aikins is a dedicated REALTOR® specializing in Trinity County properties. A long-time resident of the area, Shannon\'s intimate knowledge of the local communities, schools, and outdoor recreation makes her an invaluable resource for buyers and sellers alike. Known for her warm personality and tireless work ethic, Shannon goes above and beyond to make every client feel like family.',
    specialties: ['Residential Sales', 'Cabins & Cottages', 'Waterfront Properties', 'Relocation'],
    counties: ['Trinity'],
    social: {
      facebook: 'https://facebook.com',
      instagram: 'https://instagram.com',
    },
    featured: true,
  },
  {
    id: 'mike-dawson',
    slug: 'mike-dawson',
    name: 'Mike Dawson',
    title: 'REALTOR®',
    licenseNumber: 'CA DRE #01987654',
    phone: '(530) 245-8900',
    email: 'mike@bvptrinity.com',
    photo: '/images/agents/mike-dawson.jpg',
    bio: 'Mike Dawson brings over 15 years of real estate experience to Big Valley Properties, specializing in Shasta County ranch and agricultural properties. A former cattle rancher himself, Mike understands the unique needs of rural property buyers and sellers. His extensive network and negotiation skills have earned him a reputation as one of the most trusted agents in the North State.',
    specialties: ['Ranch Properties', 'Agricultural Land', 'Equestrian Estates', 'Commercial Ranch'],
    counties: ['Shasta'],
    social: {
      linkedin: 'https://linkedin.com',
    },
    featured: true,
  },
  {
    id: 'lisa-chen',
    slug: 'lisa-chen',
    name: 'Lisa Chen',
    title: 'REALTOR®',
    licenseNumber: 'CA DRE #02234567',
    phone: '(530) 339-2100',
    email: 'lisa@bvptrinity.com',
    photo: '/images/agents/lisa-chen.jpg',
    bio: 'Lisa Chen is a rising star at Big Valley Properties, focusing on residential properties in the greater Redding and Shasta Lake areas. With a background in interior design, Lisa has an exceptional eye for helping buyers see the potential in every property. Her marketing expertise and social media savvy make her a powerful advocate for sellers looking to maximize their home\'s exposure.',
    specialties: ['Residential Sales', 'Lake Properties', 'Staging & Design', 'Digital Marketing'],
    counties: ['Shasta'],
    social: {
      instagram: 'https://instagram.com',
      linkedin: 'https://linkedin.com',
    },
    featured: true,
  },
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find(a => a.slug === slug);
}

export function getAgentsByCounty(county: 'Trinity' | 'Shasta'): Agent[] {
  return agents.filter(a => a.counties.includes(county));
}
