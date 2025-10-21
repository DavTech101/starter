//##########################################################################################
// SUCCESS TYPE FORMAT
//##########################################################################################
export type TSuccessResponse<T> = {
  code: number;
  success: boolean;
  message: string;
  data: T;
};

//##########################################################################################
// ERROR TYPE FORMAT
//##########################################################################################
export type TErrorResponse = {
  data: null;
  error: any;
  code: number;
  message: string;
  details: string;
  success: boolean;
};

//##########################################################################################
// COMPOSITE TYPE FORMAT
//##########################################################################################
export type TResponse<T> = Promise<TSuccessResponse<T> | TErrorResponse>;

//##########################################################################################
// TSUCCESS TYPE GUARD
//##########################################################################################
export const isTSuccessResponse = <T>(
  obj: any,
  dataGuard: (obj: any) => obj is T
): obj is TSuccessResponse<T> => {
  return (
    obj &&
    obj !== null &&
    typeof obj === 'object' &&
    typeof obj.code === 'number' &&
    typeof obj.success === 'boolean' &&
    typeof obj.message === 'string' &&
    dataGuard(obj.data)
  );
};

//##########################################################################################
// TERROR TYPE GUARD
//##########################################################################################
export const isTErrorResponse = (obj: any): obj is TErrorResponse => {
  return (
    obj &&
    obj.data === null &&
    typeof obj.code === 'number' &&
    typeof obj.message === 'string' &&
    typeof obj.details === 'string' &&
    typeof obj.success === 'boolean'
  );
};
