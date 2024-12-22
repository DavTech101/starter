import {
  HOME_ROUTE,
  ABOUT_ROUTE,
  CONTACT_ROUTE,
  CLIENT_BASE_URL,
} from '@data/routes';

//##########################################################################################
// SITEMAP GENERATOR
//##########################################################################################
const sitemap = async () => {
  const pages = [
    {
      priority: 0.9,
      url: `${CLIENT_BASE_URL}${HOME_ROUTE}`,
      lastModified: new Date().toISOString(),
    },
    {
      priority: 0.9,
      changeFrequency: 'daily',
      url: `${CLIENT_BASE_URL}${ABOUT_ROUTE}`,
      lastModified: new Date().toISOString(),
    },
    {
      priority: 0.9,
      changeFrequency: 'daily',
      url: `${CLIENT_BASE_URL}${CONTACT_ROUTE}`,
      lastModified: new Date().toISOString(),
    },
  ];

  return pages;
};

export default sitemap;
