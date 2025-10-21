import { TSuccessResponse } from './response.schemas';

//##########################################################################################
// STATUS CODES FOR SUCCESS RESPONSES
//##########################################################################################
export const SUCCESS_CODES = {
  OK: 200,
  CREATED: 201,
  DELETED: 204,
};

//##########################################################################################
// SUCCESS RESPONSE FORMAT
//##########################################################################################
export const successResponse = <T>(
  code: number,
  message: string,
  data: T,
): TSuccessResponse<T> => {
  return {
    code,
    success: true,
    message,
    data,
  };
};

//##########################################################################################
// SUCCESS MESSAGE RESPONSE
//##########################################################################################
export const successMessageResponse = <T>(
  message: string,
  data: T,
): TSuccessResponse<T> => {
  return successResponse(SUCCESS_CODES.OK, message, data);
};

//##########################################################################################
// OPERATION SUCCESS RESPONSE
//##########################################################################################
export const operationSuccessResponse = <T>(
  name: string,
  data: T,
  operation: string = 'retrieved',
  code: number = SUCCESS_CODES.OK,
): TSuccessResponse<T> => {
  return successResponse(code, `${name} successfully ${operation}`, data);
};

//##########################################################################################
// FOUND SUCCESS RESPONSE
//##########################################################################################
export const foundSuccessResponse = <T>(
  name: string,
  data: T,
): TSuccessResponse<T> => {
  return operationSuccessResponse(name, data, 'retrieved');
};

//##########################################################################################
// CREATED SUCCESS RESPONSE
//##########################################################################################
export const createdSuccessResponse = <T>(
  name: string,
  data: T,
): TSuccessResponse<T> => {
  return operationSuccessResponse(name, data, 'created', SUCCESS_CODES.CREATED);
};

//##########################################################################################
// UPDATED SUCCESS RESPONSE
//##########################################################################################
export const updatedSuccessResponse = <T>(
  name: string,
  data: T,
): TSuccessResponse<T> => {
  return operationSuccessResponse(name, data, 'updated');
};

//##########################################################################################
// DELETED SUCCESS RESPONSE
//##########################################################################################
export const deletedSuccessResponse = (
  name: string,
): TSuccessResponse<null> => {
  return operationSuccessResponse(name, null, 'deleted', SUCCESS_CODES.DELETED);
};