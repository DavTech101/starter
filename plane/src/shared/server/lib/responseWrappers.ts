import { caughtErrorResponse } from './errorResponses';
import { TErrorResponse } from '@shared/validations/response.schemas';

//##########################################################################################
// WITH ERROR HANDLING
//##########################################################################################
/**
 * @param fn - The function to execute
 * @param functionName - The name of the function (for error reporting)
 * @returns A function that returns a Promise with the result or a handled error
 */
export const withErrorHandling = <T, A extends any[]>(
  fn: (...args: A) => Promise<T> | T,
  functionName: string
) => {
  return async (...args: A): Promise<T | TErrorResponse> => {
    try {
      return await fn(...args);
    } catch (error: unknown) {
      return caughtErrorResponse(error, functionName);
    }
  };
};
