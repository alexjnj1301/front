export enum ErrorKeys {
  PageNotFound = '404',
  InternalServerError = '500',
  Unauthorized = '401',
  Forbidden = '403',
}

export const ErrorDetails = {
  [ErrorKeys.PageNotFound]: { code: '404', message: 'Page not found', description: '' },
  [ErrorKeys.InternalServerError]: { code: '500', message: 'Internal server error', description: '' },
  [ErrorKeys.Unauthorized]: { code: '401', message: 'Unauthorized', description: '' },
  [ErrorKeys.Forbidden]: { code: '403', message: 'Forbidden', description: '' },
};
