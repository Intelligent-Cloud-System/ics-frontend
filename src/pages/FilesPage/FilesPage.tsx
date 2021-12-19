import React, { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

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
import { FileLinkResponse, FileService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { entities } from 'consts/entities';
import { FileInfo } from './components/FileItem/FileItem';

function FilesPage() {
	const coreUrl: string = process.env.REACT_APP_CORE_URL || '';
	const queryClient = useQueryClient();
	const [processingFiles, setProcessingFiles] = useState<Array<FileInfo>>([]);
	const [checkedIds, setCheckedIds] = useState<Array<number>>([]);

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
						...files.map(file => ({ name: file.name, size: file.size, isLoading: true })),
					];
				});
			},
		},
	);

	const { mutate: deleteFiles, isLoading: isDeleteLoading } = useMutation(
		[entities.file],
		(ids: Array<number>) => {
			return FileService.delete({ ids });
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries(entities.file);
				setCheckedIds([]);
			},
		},
	);

	const { mutate: saveFile, isLoading: isSaveLoading } = useMutation(
		[entities.file],
		async (fileId: number) => FileService.getFileLink(fileId),
		{
			onError: useSnackbarOnError(),
			onSuccess: (response: FileLinkResponse) => {
				window.open(coreUrl + response.link);
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

	const isLoading = useMemo(
		() => isFilesLoading || isDeleteLoading || isSaveLoading,
		[isFilesLoading, isDeleteLoading, isSaveLoading],
	);

	return (
		<>
			<Container maxWidth={false}>
				<FlexBox>
					<FileMenuButton startIcon={<AddIcon />}>
						<input
							type={'file'}
							id={'upload-file-btn'}
							hidden
							multiple={true}
							onChange={(event: ChangeEvent<HTMLInputElement>) => {
								uploadFiles(Array.from(event.target.files || []));
							}}
						/>
						<label htmlFor={'upload-file-btn'}>Upload</label>
					</FileMenuButton>
					<FileMenuButton
						startIcon={<DownloadIcon />}
						onClick={() => saveFile(checkedIds[0])}
						disabled={!(checkedIds.length === 1)}
					>
						Save
					</FileMenuButton>
					<FileMenuButton
						startIcon={<DeleteIcon />}
						onClick={() => {
							deleteFiles(checkedIds);
						}}
						disabled={checkedIds.length === 0}
					>
						Delete
					</FileMenuButton>
				</FlexBox>
				<UHeader>Files</UHeader>
				<Divider orientation='horizontal' variant='middle' />
				<FilesContainer {...getRootProps()} style={isDragActive ? { borderColor: '#512da8' } : {}}>
					<FilesGridContainer>
						{isLoading && <LinearProgress />}
						{files &&
							files.map(file => {
								return (
									<Grid item key={`${file.id}-${file.name}`}>
										<FileItem
											file={file}
											displayCheckbox={!!checkedIds.length}
											checked={!!file.id && checkedIds.includes(file.id)}
											setChecked={setCheckedIds}
										/>
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
