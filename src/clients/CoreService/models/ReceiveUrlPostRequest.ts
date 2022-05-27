/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UploadSingleFileInfo } from './UploadSingleFileInfo';

export type ReceiveUrlPostRequest = {
    location: string;
    fileInfos: Array<UploadSingleFileInfo>;
}
