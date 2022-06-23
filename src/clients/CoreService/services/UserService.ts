/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GetUrlResponse } from '../models/GetUrlResponse';
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

    /**
     * This is probably the solution we will need in the future
     * when migrating to web sockets
     * @returns UserResponse
     * @throws ApiError
     */
    public static currentUser(): CancelablePromise<UserResponse> {
        return __request({
            method: 'GET',
            path: `/users/current`,
        });
    }

    /**
     * @param userId
     * @returns GetUrlResponse
     * @throws ApiError
     */
    public static userIcon(
        userId: number,
    ): CancelablePromise<GetUrlResponse> {
        return __request({
            method: 'GET',
            path: `/users/icon`,
            query: {
                'userId': userId,
            },
        });
    }

}