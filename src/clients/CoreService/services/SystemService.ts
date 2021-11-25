/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleResponse } from '../models/SimpleResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class SystemService {

    /**
     * @param test1
     * @returns SimpleResponse
     * @throws ApiError
     */
    public static systemControllerHealthy(
        test1: string,
    ): CancelablePromise<SimpleResponse> {
        return __request({
            method: 'POST',
            path: `/system/healthy`,
            query: {
                'test1': test1,
            },
        });
    }

}