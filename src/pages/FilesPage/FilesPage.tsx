import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import { FilesContainer, FilesGridContainer } from './FilePage.styles';

// helpers
import { FileItem } from './components/FileItem';
import { FileManagerService } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { entities } from 'consts/entities';
import { FileInfo } from './components/FileItem/FileItem';
import { FolderItem } from './components/FolderItem';
import { ControlMenu } from './components/ControlMenu';
import { LocationLinks } from './components/LocationLinks';

function FilesPage() {
	const [currentLocation, setCurrentLocation] = useState<string>('');
	const [processingFiles, setProcessingFiles] = useState<Array<FileInfo>>([]);
	const [checkedFolders, setCheckedFolders] = useState<Array<string>>([]);
	const [checkedFiles, setCheckedFiles] = useState<Array<string>>([]);

	const { data: existingContent, isLoading: isContentLoading } = useQuery(
		[entities.file, currentLocation],
		() => FileManagerService.list(currentLocation),
		{
			onError: useSnackbarOnError(),
		},
	);

	const onDrop = useCallback(() => {}, []);

	const { getRootProps, isDragActive } = useDropzone({ onDrop });

	const files = useMemo(
		() => [...(existingContent?.files || []), ...processingFiles],
		[existingContent, processingFiles],
	);

	const folders = useMemo(() => [...(existingContent?.folders || [])], [existingContent]);

	const isLoading = useMemo(() => isContentLoading, [isContentLoading]);

	useEffect(() => {
		setCheckedFolders([]);
		setCheckedFiles([]);
	}, [currentLocation]);

	return (
		<>
			<Container maxWidth={false}>
				<ControlMenu
					location={currentLocation}
					disabledDownload={!(checkedFiles.length === 1)}
					disabledDelete={checkedFiles.length === 0 && checkedFolders.length === 0}
					onChangeUpload={(event: ChangeEvent<HTMLInputElement>) => {}}
					onClickDownload={() => {}}
					onClickDelete={() => {}}
				/>
				<Divider orientation='horizontal' variant='middle' />
				<LocationLinks location={currentLocation} setLocation={setCurrentLocation} />
				<Divider orientation='horizontal' variant='middle' />
				<FilesContainer {...getRootProps()} style={isDragActive ? { borderColor: '#512da8' } : {}}>
					<FilesGridContainer>
						{isLoading && <LinearProgress />}
						{folders &&
							folders.map(folder => (
								<Grid item key={`${folder.path}`}>
									<FolderItem
										folder={folder}
										checked={!!folder.path && checkedFolders.includes(folder.path)}
										isCheckedFile={!!checkedFiles.length}
										setChecked={setCheckedFolders}
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
											displayCheckbox={!!checkedFiles.length && !checkedFolders.length}
											isCheckedFolder={!!checkedFolders.length}
											checked={!!file.basename && checkedFiles.includes(file.basename)}
											setChecked={setCheckedFiles}
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
