import { HttpErrorResponse } from '@angular/common/http';

export const transformError = (response: HttpErrorResponse | string) => {
    const errorMsg =
        typeof response === 'string'
            ? 'An unknown error has occured'
            : response.error instanceof ErrorEvent
            ? `Error ${response.error.message}`
            : response.status
            ? `Request failed with ${response.status}, ${response.statusText}`
            : null;
    throw new Error(errorMsg);
};
