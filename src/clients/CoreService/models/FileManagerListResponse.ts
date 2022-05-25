/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileResponse } from './FileResponse';
import type { FolderResponse } from './FolderResponse';

export type FileManagerListResponse = {
    folders: Array<FolderResponse>;
    files: Array<FileResponse>;
}
