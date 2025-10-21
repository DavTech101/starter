import { ZodSchema } from 'zod';
import { invalidInputErrorResponse } from './response.errors';

//##########################################################################################
// HANDLE VALIDATION ERROR MESSAGES
//##########################################################################################
export const handleValidationErrors = (errors: any) => {
  const fields: string[] = [];
  for (const error of errors) {
    fields.push(error.message);
  }

  return fields.join(',\n ');
};

//##########################################################################################
// HANDLE SCHEMA VALIDATION
//##########################################################################################
export const handleSchemaValidation = <T>(
  schema: ZodSchema<T>,
  values: unknown,
) => {
  const validatedValues = schema.safeParse(values);

  if (!validatedValues.success) {
    const details = handleValidationErrors(validatedValues.error.issues);

    throw invalidInputErrorResponse(details);
  }

  return validatedValues.data;
};