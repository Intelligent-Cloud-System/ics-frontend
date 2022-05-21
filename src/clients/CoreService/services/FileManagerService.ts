/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateFolderRequest } from '../models/CreateFolderRequest';
import type { FolderResponse } from '../models/FolderResponse';
import type { ListResponse } from '../models/ListResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FileManagerService {

    /**
     * @param location
     * @returns ListResponse
     * @throws ApiError
     */
    public static list(
        location: string,
    ): CancelablePromise<ListResponse> {
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

}