import { TMailerConfig } from './validation/email.schemas';

//##########################################################################################
// COSITO'S SPICES CONSTANTS
//##########################################################################################
export const CS_NAME = "Cosito's Spices";
export const CS_EMAIL = process.env.CS_EMAIL || '';
export const CS_TAGLINE = "It's time to get Spicy!";
export const CS_WEBSITE = 'https://cositosspices.com';
export const CS_ADDRESS = '123 Spice Lane, Flavor Town, FT 12345';

export const CS_EMAIL_SENDER_NAME = `"${CS_NAME}" <${CS_EMAIL}>`;

export const CS_LOGO_URL =
  'https://res.cloudinary.com/duzmy9vsw/image/upload/v1743443431/cs-logo_vvzkxn.png';

export const CS_MAILER_CONFIG: TMailerConfig = {
  user: CS_EMAIL,
  pass: process.env.CS_EMAIL_PASS || '',
  host: process.env.CS_EMAIL_HOST || '',
  port: Number(process.env.CS_EMAIL_PORT) || 587,
  service: process.env.CS_EMAIL_SERVICE || undefined,
};
