/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RegisterUserRequest } from '../models/RegisterUserRequest';
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class UserService {

    /**
     * @param requestBody
     * @returns UserResponse
     * @throws ApiError
     */
    public static register(
        requestBody: RegisterUserRequest,
    ): CancelablePromise<UserResponse> {
        return __request({
            method: 'POST',
            path: `/users/register`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}