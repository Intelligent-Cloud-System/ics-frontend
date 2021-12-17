import React, { FC, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

import {
	FileMenuButton,
	FilesContainer,
	FilesGridContainer,
	FlexBox,
	UHeader,
} from './FilePage.styles';

// helpers
import FileItem from './components/FileItem';

function FilesPage() {
	const [selectedID, setSelectedID] = useState(0);
	const onDrop = useCallback((acceptedFiles: File[]) => {
		console.log(acceptedFiles);
		console.log(selectedID);
	}, []);
	const { getRootProps, isDragActive } = useDropzone({ onDrop });

	return (
		<>
			<Container maxWidth={false}>
				<FlexBox>
					<FileMenuButton startIcon={<AddIcon />}>Upload</FileMenuButton>
					<FileMenuButton startIcon={<DownloadIcon />}>Save</FileMenuButton>
					<FileMenuButton startIcon={<DeleteIcon />}>Delete</FileMenuButton>
				</FlexBox>
				<UHeader>Files</UHeader>
				<Divider orientation='horizontal' variant='middle' />
				<FilesContainer {...getRootProps()} style={isDragActive ? { borderColor: '#512da8' } : {}}>
					<FilesGridContainer>
						<Grid item onClick={event => setSelectedID(4)}>
							<FileItem file={{ name: 'file', size: '2142343 KB' }}></FileItem>
						</Grid>
						<Grid item>
							<FileItem file={{ name: 'file', size: '213 KB' }}></FileItem>
						</Grid>
						<Grid item>
							<FileItem file={{ name: 'file', size: '213 KB' }}></FileItem>
						</Grid>
					</FilesGridContainer>
				</FilesContainer>
			</Container>
		</>
	);
}

export default FilesPage;
