import React, { useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { LinearProgress } from '@mui/material';

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
import { FileItem } from './components/FileItem';
import { FileService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { entities } from 'consts/entities';
import { FileInfo } from './components/FileItem/FileItem';

function FilesPage() {
	const queryClient = useQueryClient();
	const [processingFiles, setProcessingFiles] = useState<Array<FileInfo>>([]);

	const { data: existingFiles, isLoading: isFilesLoading } = useQuery(
		[entities.file],
		() => FileService.list(),
		{
			onError: useSnackbarOnError(),
		},
	);

	const { mutate: uploadFiles } = useMutation(
		[entities.file],
		(files: Array<File>) => {
			return Promise.all(
				files.map(async (file: File) => {
					await FileService.upload({ file });

					await queryClient.invalidateQueries(entities.file);
					setProcessingFiles(processingFiles =>
						processingFiles?.filter(processedFile => processedFile.name !== file.name),
					);
				}),
			);
		},
		{
			onError: useSnackbarOnError(),
			onSuccess: () => queryClient.invalidateQueries(entities.file),
			onMutate: (files: File[]) => {
				setProcessingFiles(processingFiles => {
					return [
						...processingFiles,
						...files.map(file => ({ name: file.name, size: file.name, loading: true })),
					];
				});
			},
		},
	);

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			uploadFiles(acceptedFiles);
		},
		[uploadFiles],
	);

	const { getRootProps, isDragActive } = useDropzone({ onDrop });

	const files = useMemo(
		() => [...(existingFiles || []), ...processingFiles],
		[existingFiles, processingFiles],
	);

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
						{isFilesLoading && <LinearProgress />}
						{files &&
							files.map(file => {
								return (
									<Grid item key={`${file.id}-${file.name}`}>
										<FileItem file={file}></FileItem>
									</Grid>
								);
							})}
					</FilesGridContainer>
				</FilesContainer>
			</Container>
		</>
	);
}

export default FilesPage;
