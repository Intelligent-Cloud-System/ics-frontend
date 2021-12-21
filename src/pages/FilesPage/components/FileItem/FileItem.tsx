import React from 'react';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { bytesToSize } from 'shared/bytes-size';

import { FileResponse } from 'clients/CoreService';
import { CardCheckbox, WCard } from '.';

export type FileInfo = Pick<FileResponse, 'name' | 'size'> & {
	id?: number;
	isLoading?: boolean;
};

export interface FileItemProps {
	file: FileInfo;
	displayCheckbox: boolean;
	checked?: boolean;
	setChecked: React.Dispatch<React.SetStateAction<number[]>>;
}

export function FileItem({ file, checked, setChecked, displayCheckbox }: FileItemProps) {
	const isCheckDisabled = file.isLoading || !file.id;

	const handleClick = () => {
		if (!isCheckDisabled && file.id !== undefined) {
			if (checked) {
				setChecked(ids => {
					return ids.filter(id => id !== file.id);
				});
			} else {
				setChecked(ids => [...ids, file.id as number]);
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
						<Typography variant='body2'>{file.name}</Typography>
						<Typography variant='body2'>{bytesToSize(file.size)}</Typography>
					</div>
				</Box>
			</CardContent>
		</WCard>
	);
}
