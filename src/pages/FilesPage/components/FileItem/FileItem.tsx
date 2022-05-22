import React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import { bytesToSize } from 'shared/bytes-size';

import { FileResponse } from 'clients/CoreService';
import { CardCheckbox, FileCard, FileIcon, FileItemContainer } from './FileItem.styles';
import { renderLongName } from '../renderers/renderLongName';

export type FileInfo = Pick<FileResponse, 'basename' | 'size' | 'lastModifiedAt'> & {
	isLoading?: boolean;
};

export interface FileItemProps {
	file: FileInfo;
	displayCheckbox: boolean;
	checked?: boolean;
	isCheckedFolder: boolean;
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FileItem({
	file,
	checked,
	setChecked,
	displayCheckbox,
	isCheckedFolder,
}: FileItemProps) {
	const isCheckDisabled = file.isLoading || !file.basename;

	const handleClick = () => {
		if (isCheckDisabled || !file.basename || isCheckedFolder) return;
		if (checked) {
			setChecked(ids => {
				return ids.filter(basename => basename !== file.basename);
			});
		} else {
			setChecked(basenames => [...basenames, file.basename]);
		}
	};

	const fileSize = bytesToSize(file.size);

	return (
		<FileItemContainer>
			<FileCard onClick={handleClick}>
				{file.isLoading && <LinearProgress />}
				{displayCheckbox && <CardCheckbox checked={!!checked} disabled={isCheckDisabled} />}
				<FileIcon fontSize='large' sx={{ mr: 1 }} />
				<Typography>{renderLongName(`${file.basename} (${fileSize})`)}</Typography>
			</FileCard>
		</FileItemContainer>
	);
}
