import React from 'react';
import Typography from '@mui/material/Typography';

import { bytesToSize } from 'shared/bytes-size';

import { FileResponse } from 'clients/CoreService';
import {
	CardCheckbox,
	CustomLinearProgress,
	FileCard,
	FileIcon,
	FileItemContainer,
} from './FileItem.styles';
import { renderLongName } from '../renderers/renderLongName';

export type FileInfo = Pick<FileResponse, 'basename' | 'size' | 'path'> & {
	isLoading?: boolean;
};

export interface FileItemProps {
	file: FileInfo;
	displayCheckbox: boolean;
	checked?: boolean;
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
}

export function FileItem({ file, checked, setChecked, displayCheckbox }: FileItemProps) {
	const isCheckDisabled = file.isLoading || !file.basename;

	const handleClick = () => {
		if (isCheckDisabled || !file.path) return;
		if (checked) {
			setChecked(prev => prev.filter(path => path !== file.path));
		} else {
			setChecked(pathes => [...pathes, file.path]);
		}
	};

	const fileSize = bytesToSize(file.size);

	return (
		<FileItemContainer>
			<FileCard onClick={handleClick}>
				{file.isLoading && <CustomLinearProgress />}
				{displayCheckbox && <CardCheckbox checked={!!checked} disabled={isCheckDisabled} />}
				<FileIcon />
			</FileCard>
			<Typography>{renderLongName(`${file.basename} (${fileSize})`)}</Typography>
		</FileItemContainer>
	);
}
