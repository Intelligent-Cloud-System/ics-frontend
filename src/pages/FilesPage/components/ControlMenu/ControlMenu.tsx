import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import { FileMenuButton, FlexBox } from './ControlMenu.styles';

export interface ControlMenuProps {
	disabledDownload: boolean;
	disabledDelete: boolean;
	onChangeUpload: React.ChangeEventHandler<HTMLInputElement>;
	onClickDownload: React.MouseEventHandler<HTMLButtonElement>;
	onClickDelete: React.MouseEventHandler<HTMLButtonElement>;
}

export function ControlMenu({
	disabledDownload,
	disabledDelete,
	onChangeUpload,
	onClickDownload,
	onClickDelete,
}: ControlMenuProps) {
	return (
		<FlexBox>
			<FileMenuButton startIcon={<AddIcon />}>
				<input
					type={'file'}
					id={'upload-file-btn'}
					hidden
					multiple={true}
					onChange={onChangeUpload}
				/>
				<label htmlFor={'upload-file-btn'}>Upload</label>
			</FileMenuButton>
			<FileMenuButton
				startIcon={<DownloadIcon />}
				onClick={onClickDownload}
				disabled={disabledDownload}
			>
				Save
			</FileMenuButton>
			<FileMenuButton startIcon={<DeleteIcon />} onClick={onClickDelete} disabled={disabledDelete}>
				Delete
			</FileMenuButton>
		</FlexBox>
	);
}
