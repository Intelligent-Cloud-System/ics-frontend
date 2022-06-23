import React from 'react';
import UploadRoundedIcon from '@mui/icons-material/UploadRounded';
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { FileMenuButton, FlexBox, Label } from './ControlMenu.styles';
import { CreateFolderDialog } from '../CreateFolderDialog';

export interface ControlMenuProps {
	location: string;
	disabledDownload: boolean;
	disabledDelete: boolean;
	onChangeUpload: React.ChangeEventHandler<HTMLInputElement>;
	onClickDownload: React.MouseEventHandler<HTMLButtonElement>;
	onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export function ControlMenu({
	location,
	disabledDownload,
	disabledDelete,
	onChangeUpload,
	onClickDownload,
	onClickDelete,
}: ControlMenuProps) {
	return (
		<FlexBox>
			<CreateFolderDialog location={location} />
			<FileMenuButton>
				<input
					type={'file'}
					id={'upload-file-btn'}
					hidden
					multiple={true}
					onChange={onChangeUpload}
				/>
				<Label htmlFor={'upload-file-btn'}>
					<UploadRoundedIcon />
				</Label>
			</FileMenuButton>
			<FileMenuButton onClick={onClickDownload} disabled={disabledDownload}>
				<div>
					<DownloadRoundedIcon />
				</div>
			</FileMenuButton>
			<FileMenuButton onClick={onClickDelete} disabled={disabledDelete}>
				<div>
					<DeleteRoundedIcon />
				</div>
			</FileMenuButton>
		</FlexBox>
	);
}
