/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFolderRequest } from '../models/CreateFolderRequest';
import type { FileManagerDeleteRequest } from '../models/FileManagerDeleteRequest';
import type { FileManagerListResponse } from '../models/FileManagerListResponse';
import type { FolderResponse } from '../models/FolderResponse';
import type { ReceiveUrlGetRequest } from '../models/ReceiveUrlGetRequest';
import type { ReceiveUrlPostRequest } from '../models/ReceiveUrlPostRequest';
import type { SignedGetUrlsResponse } from '../models/SignedGetUrlsResponse';
import type { SignedPostUrlsResponse } from '../models/SignedPostUrlsResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FileManagerService {

    /**
     * @param location
     * @returns FileManagerListResponse
     * @throws ApiError
     */
    public static list(
        location: string,
    ): CancelablePromise<FileManagerListResponse> {
        return __request({
            method: 'GET',
            path: `/file_manager/all`,
            query: {
                'location': location,
            },
        });
    }

    /**
     * @param requestBody
     * @returns FolderResponse
     * @throws ApiError
     */
    public static createFolder(
        requestBody: CreateFolderRequest,
    ): CancelablePromise<FolderResponse> {
        return __request({
            method: 'POST',
            path: `/file_manager/folder/create`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns FileManagerListResponse
     * @throws ApiError
     */
    public static delete(
        requestBody: FileManagerDeleteRequest,
    ): CancelablePromise<FileManagerListResponse> {
        return __request({
            method: 'DELETE',
            path: `/file_manager/files/delete`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns SignedPostUrlsResponse
     * @throws ApiError
     */
    public static getSignedPostUrls(
        requestBody: ReceiveUrlPostRequest,
    ): CancelablePromise<SignedPostUrlsResponse> {
        return __request({
            method: 'POST',
            path: `/file_manager/signed-urls/post`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * @param requestBody
     * @returns SignedGetUrlsResponse
     * @throws ApiError
     */
    public static getSignedGetUrls(
        requestBody: ReceiveUrlGetRequest,
    ): CancelablePromise<SignedGetUrlsResponse> {
        return __request({
            method: 'POST',
            path: `/file_manager/signed-urls/get`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}