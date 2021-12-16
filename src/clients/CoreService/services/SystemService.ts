/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class SystemService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static healthy(): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/system/healthy`,
        });
    }

}