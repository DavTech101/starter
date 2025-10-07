'use server';

import { caughtErrorResponse } from '@shared/server/lib/errorResponses';

//##########################################################################################
// CONTACT ACTION
//##########################################################################################
export const contactFormAction = async (data: unknown) => {
  const entity = '[CONTACT FORM ACTION]';
  try {
  } catch (error: unknown) {
    return caughtErrorResponse(error, `${entity} -> Error contacting package`);
  }
};
