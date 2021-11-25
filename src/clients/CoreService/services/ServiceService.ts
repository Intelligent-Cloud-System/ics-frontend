/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class ServiceService {

    /**
     * @returns string
     * @throws ApiError
     */
    public static appControllerGetHello(): CancelablePromise<string> {
        return __request({
            method: 'GET',
            path: `/`,
        });
    }

}