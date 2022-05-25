/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { UploadSingleFileInfo } from './UploadSingleFileInfo';

export type UploadFileRequest = {
    location: string;
    fileInfos: Array<UploadSingleFileInfo>;
}
