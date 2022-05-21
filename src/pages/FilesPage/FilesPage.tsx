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
import { FileManagerService, ListResponse } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { entities } from 'consts/entities';
import { FileInfo } from './components/FileItem/FileItem';
import { FolderItem } from './components/FolderItem';

function FilesPage() {
	const coreUrl: string = process.env.REACT_APP_CORE_URL || '';
	const queryClient = useQueryClient();
	const [currentLocation, setCurrentLocation] = useState<string>('/');
	const [processingFiles, setProcessingFiles] = useState<Array<FileInfo>>([]);
	const [checkedIds, setCheckedIds] = useState<Array<string>>([]);

	const { data: existingFiles, isLoading: isFilesLoading } = useQuery(
		[entities.file, currentLocation],
		() => FileManagerService.list(currentLocation),
		{
			onError: useSnackbarOnError(),
		},
	);

	const onDrop = useCallback(() => {}, []);

	const { getRootProps, isDragActive } = useDropzone({ onDrop });

	const files = useMemo(
		() => [...(existingFiles?.files || []), ...processingFiles],
		[existingFiles, processingFiles],
	);

	const folders = useMemo(() => [...(existingFiles?.folders || [])], [existingFiles]);

	const isLoading = useMemo(() => isFilesLoading, [isFilesLoading]);

	return (
		<>
			<Container maxWidth={false}>
				<Divider orientation='horizontal' variant='middle' />
				<FlexBox>
					<FileMenuButton startIcon={<AddIcon />}>
						<input
							type={'file'}
							id={'upload-file-btn'}
							hidden
							multiple={true}
							onChange={(event: ChangeEvent<HTMLInputElement>) => {}}
						/>
						<label htmlFor={'upload-file-btn'}>Upload</label>
					</FileMenuButton>
					<FileMenuButton
						startIcon={<DownloadIcon />}
						onClick={() => {}}
						disabled={!(checkedIds.length === 1)}
					>
						Save
					</FileMenuButton>
					<FileMenuButton
						startIcon={<DeleteIcon />}
						onClick={() => {}}
						disabled={checkedIds.length === 0}
					>
						Delete
					</FileMenuButton>
				</FlexBox>
				<Divider orientation='horizontal' variant='middle' />
				<FilesContainer {...getRootProps()} style={isDragActive ? { borderColor: '#512da8' } : {}}>
					<FilesGridContainer>
						{isLoading && <LinearProgress />}
						{folders &&
							folders.map(folder => (
								<Grid item key={`${folder.path}`}>
									<FolderItem
										folder={folder}
										checked={!!folder.path && checkedIds.includes(folder.path)}
										setChecked={setCheckedIds}
										setLocation={setCurrentLocation}
									/>
								</Grid>
							))}
						{files &&
							files.map(file => {
								return (
									<Grid item key={`${file.basename}-${file.lastModifiedAt}`}>
										<FileItem
											file={file}
											displayCheckbox={!!checkedIds.length}
											checked={!!file.basename && checkedIds.includes(file.basename)}
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
