import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export interface FileHeaderProps {
	file: File;
	onDelete: (file: File) => void;
}

export function FileHeader({ file, onDelete }: FileHeaderProps) {
	return (
		<Card style={{ minWidth: '300px' }}>
			<CardHeader
				action={
					<IconButton onClick={() => onDelete(file)} aria-label='add to favorites'>
						<DeleteIcon />
					</IconButton>
				}
			/>
			<CardContent>
				<Typography variant='body2'>{file.name}</Typography>
			</CardContent>
		</Card>
	);
}
