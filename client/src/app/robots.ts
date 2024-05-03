import { CLIENT_BASE_URL } from '@data/routes';
import type { MetadataRoute } from 'next';

//##########################################################################################
// ROBOTS TXT GENERATOR
//##########################################################################################
const robots = (): MetadataRoute.Robots => {
  const disallow = [
    '/api',
    '/auth',
    '/user',
    '/admin',
    '/login',
    '/search',
    '/checkout',
    '/register',
    '/dashboard',
    '/reset-password',
  ];

  return {
    host: CLIENT_BASE_URL,
    sitemap: `${CLIENT_BASE_URL}/sitemap.xml'`,
    rules: {
      disallow,
      allow: ['/'],
      userAgent: '*',
    },
  };
};

export default robots;
