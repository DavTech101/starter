//##########################################################################################
// SYTEM ROUTES
//##########################################################################################
export const CLIENT_BASE_URL: string =
  process.env.NEXT_PUBLIC_CLIENT_BASE_URL || 'http://localhost:3000';

//##########################################################################################
// COMPANY ROUTES
//##########################################################################################
export const HOME_ROUTE: string = '/';
export const ABOUT_ROUTE: string = '/about-us';
export const CONTACT_ROUTE: string = '/contact';
export const DEFAULT_IMAGE: string = '/circle.png';
export const SITEMAP_ROUTE: string = '/sitemap.xml';
export const PRIVACY_ROUTE: string = '/privacy-policy';
export const TERMS_ROUTE: string = '/terms-and-conditions';
