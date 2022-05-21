/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FileResponse } from './FileResponse';
import type { FolderResponse } from './FolderResponse';

export type ListResponse = {
    folders: Array<FolderResponse>;
    files: Array<FileResponse>;
}
