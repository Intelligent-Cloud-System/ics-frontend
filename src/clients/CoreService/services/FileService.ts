/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class FileService {

    /**
     * @returns any
     * @throws ApiError
     */
    public static list(): CancelablePromise<Array<any>> {
        return __request({
            method: 'GET',
            path: `/files/all`,
        });
    }

    /**
     * @param formData
     * @returns any
     * @throws ApiError
     */
    public static upload(
        formData: {
            file?: Blob;
        },
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/files/upload`,
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }

    /**
     * @param filename
     * @returns any
     * @throws ApiError
     */
    public static download(
        filename: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/files/download/${filename}`,
        });
    }

}