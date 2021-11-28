/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { SimpleResponse } from '../models/SimpleResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class SystemService {
	/**
	 * @param test
	 * @returns SimpleResponse
	 * @throws ApiError
	 */
	public static systemControllerHealthy(test: number): CancelablePromise<SimpleResponse> {
		return __request({
			method: 'POST',
			path: `/system/healthy`,
			query: {
				test: test,
			},
		});
	}
}
