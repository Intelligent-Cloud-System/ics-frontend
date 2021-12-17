import React from 'react';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import { FileResponse } from '../../../../clients/CoreService';

export type FileInfo = Pick<FileResponse, 'name' | 'size'> & {
	id?: number;
	loading?: boolean;
};

export interface FileItemProps {
	file: FileInfo;
}

export function FileItem({ file }: FileItemProps) {
	return (
		<Card style={{ minWidth: '10rem', borderRadius: '0.5rem' }}>
			<CardContent>
				<Box sx={{ display: 'flex', alignContent: 'center' }}>
					<InsertDriveFileIcon fontSize='large' sx={{ mr: 1 }} />
					<div>
						<Typography variant='body2'>{file.name}</Typography>
						<Typography variant='body2'>{file.size}</Typography>
					</div>
				</Box>
			</CardContent>
		</Card>
	);
}
