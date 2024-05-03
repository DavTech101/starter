import { CLIENT_BASE_URL } from '@data/routes';

//##########################################################################################
// SITEMAP GENERATOR
//##########################################################################################
const sitemap = async () => {
  const pages = [
    {
      priority: 0.9,
      url: `${CLIENT_BASE_URL}/`,
      lastModified: new Date().toISOString(),
    },
    {
      priority: 0.9,
      changeFrequency: 'daily',
      url: `${CLIENT_BASE_URL}/about-us`,
      lastModified: new Date().toISOString(),
    },
    {
      priority: 0.9,
      changeFrequency: 'daily',
      url: `${CLIENT_BASE_URL}/contact`,
      lastModified: new Date().toISOString(),
    },
    {
      priority: 0.9,
      changeFrequency: 'daily',
      url: `${CLIENT_BASE_URL}/reviews`,
      lastModified: new Date().toISOString(),
    },
  ];

  return pages;
};

export default sitemap;
