import {
  TErrorResponse,
  isTErrorResponse,
} from '@shared/validations/response.schemas';

//##########################################################################################
// STATUS CODES FOR ERROR RESPONSES
//##########################################################################################
const ERROR_CODES = {
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

//##########################################################################################
// ERROR RESPONSE FORMAT
//##########################################################################################
/**
 * @param {number} code - The status code.
 * @param {string} message - The message describing the response.
 * @param {string} details - Additional details about the response.
 */
export const createErrorResponse = (
  code: number,
  message: string,
  details: string,
  error: unknown = null
): TErrorResponse => {
  return {
    code,
    error,
    details,
    message,
    data: null,
    success: false,
  };
};

//##########################################################################################
// NOT FOUND ERROR RESPONSE
//##########################################################################################
export const notFoundErrorResponse = (
  message: string,
  details: string = `Instance not found`,
  error = null
): TErrorResponse => {
  return createErrorResponse(ERROR_CODES.NOT_FOUND, message, details, error);
};

//##########################################################################################
// CREATE FAILED ERROR RESPONSE
//##########################################################################################
export const createFailedErrorResponse = (
  message: string,
  details: string = 'Creation Failed',
  error: unknown = null
): TErrorResponse => {
  return createErrorResponse(ERROR_CODES.SERVER_ERROR, message, details, error);
};

//##########################################################################################
// INVALID INPUT ERROR RESPONSE
//##########################################################################################
export const invalidInputErrorResponse = (
  message: string,
  details: string = 'Invalid input',
  error: unknown = null
): TErrorResponse => {
  return createErrorResponse(ERROR_CODES.BAD_REQUEST, message, details, error);
};

//##########################################################################################
// UPDATE FAILED ERROR RESPONSE
//##########################################################################################
export const updateFailedErrorResponse = (
  message: string,
  details: string = 'Update Failed',
  error = null
): TErrorResponse => {
  return createErrorResponse(ERROR_CODES.SERVER_ERROR, message, details, error);
};

//##########################################################################################
// UNAUTHORIZED ERROR RESPONSE
//##########################################################################################
export const unauthorizedErrorResponse = (
  message: string = 'Unauthorized access',
  details: string = 'Unauthorized',
  error: unknown = null
): TErrorResponse => {
  return createErrorResponse(ERROR_CODES.UNAUTHORIZED, message, details, error);
};

//##########################################################################################
// FAILED ERROR RESPONSE
//##########################################################################################
export const failedErrorResponse = (
  message: string,
  details: string = 'Operation Failed',
  error: unknown = null
): TErrorResponse => {
  return createErrorResponse(ERROR_CODES.SERVER_ERROR, message, details, error);
};

//##########################################################################################
// UNKNOWN ERROR RESPONSE
//##########################################################################################
export const unknownErrorResponse = (
  message: string = `An unknown error occurred.`,
  details: string = 'Unknown error',
  error: unknown = null
): TErrorResponse => {
  return createErrorResponse(
    ERROR_CODES.SERVER_ERROR,
    message,
    details,
    `Unknown error: ${error instanceof Error ? error.message : String(error)}`
  );
};

//##########################################################################################
// CAUGHT ERROR RESPONSE
//##########################################################################################
export const caughtErrorResponse = (
  error: unknown,
  details: string,
  stringify: boolean = false
): TErrorResponse => {
  console.log(error);
  if (isTErrorResponse(error)) return error;

  const errorMessage = error instanceof Error ? error.message : error;

  return unknownErrorResponse(
    'An error occurred while processing the request.',
    details,
    stringify ? JSON.stringify(errorMessage) : errorMessage
  );
};
