/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeleteFileRequest } from '../models/DeleteFileRequest';
import type { FileDeleteResponse } from '../models/FileDeleteResponse';
import type { FileResponse } from '../models/FileResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FileService {

    /**
     * @returns FileResponse
     * @throws ApiError
     */
    public static list(): CancelablePromise<Array<FileResponse>> {
        return __request({
            method: 'GET',
            path: `/files/all`,
        });
    }

    /**
     * @param formData
     * @returns FileResponse
     * @throws ApiError
     */
    public static upload(
        formData: {
            file?: Blob;
        },
    ): CancelablePromise<FileResponse> {
        return __request({
            method: 'POST',
            path: `/files/upload`,
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param id
     * @returns any
     * @throws ApiError
     */
    public static download(
        id: number,
    ): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/files/download/${id}`,
        });
    }

    /**
     * @param requestBody
     * @returns FileDeleteResponse
     * @throws ApiError
     */
    public static delete(
        requestBody: DeleteFileRequest,
    ): CancelablePromise<FileDeleteResponse> {
        return __request({
            method: 'DELETE',
            path: `/files/delete`,
            body: requestBody,
            mediaType: 'application/json',
        });
    }

}