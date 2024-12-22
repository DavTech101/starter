import type { MetadataRoute } from 'next';
import { CLIENT_BASE_URL, HOME_ROUTE, SITEMAP_ROUTE } from '@data/routes';

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
    sitemap: `${CLIENT_BASE_URL}${SITEMAP_ROUTE}`,
    rules: {
      disallow,
      allow: [HOME_ROUTE],
      userAgent: '*',
    },
  };
};

export default robots;
