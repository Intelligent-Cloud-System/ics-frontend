import React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { bytesToSize } from 'shared/bytes-size';

import { FileResponse } from 'clients/CoreService';
import { CardCheckbox, WCard } from '.';

export type FileInfo = Pick<FileResponse, 'basename' | 'size' | 'lastModifiedAt'> & {
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
		if (!isCheckDisabled && file.basename !== undefined) {
			if (checked) {
				setChecked(ids => {
					return ids.filter(basename => basename !== file.basename);
				});
			} else {
				setChecked(basenames => [...basenames, file.basename]);
			}
		}
	};

	return (
		<WCard onClick={handleClick}>
			{file.isLoading && <LinearProgress />}
			{displayCheckbox && <CardCheckbox checked={!!checked} disabled={isCheckDisabled} />}
			<CardContent>
				<Box sx={{ display: 'flex', alignContent: 'center' }}>
					<InsertDriveFileIcon fontSize='large' sx={{ mr: 1 }} />
					<div>
						<Typography variant='body2'>{file.basename}</Typography>
						<Typography variant='body2'>{bytesToSize(file.size)}</Typography>
					</div>
				</Box>
			</CardContent>
		</WCard>
	);
}
