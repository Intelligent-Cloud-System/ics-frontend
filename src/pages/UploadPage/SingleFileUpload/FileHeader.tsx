import { Button } from '@material-ui/core';
import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import DeleteIcon from '@material-ui/icons/Delete';

// assets
import filelogo from '../../../assets/file.png';

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
