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
	const [checkedItems, setCheckedItems] = useState<Array<string>>([]);

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
		setCheckedItems([]);
	}, [currentLocation]);

	return (
		<>
			<Container maxWidth={false}>
				<ControlMenu
					location={currentLocation}
					disabledDownload={
						checkedItems.length !== 1 || checkedItems.some(item => item.endsWith('/'))
					}
					disabledDelete={checkedItems.length === 0 && checkedItems.length === 0}
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
										checked={!!folder.path && checkedItems.includes(folder.path)}
										setChecked={setCheckedItems}
										setLocation={setCurrentLocation}
									/>
								</Grid>
							))}
						{files &&
							files.map(file => {
								return (
									<Grid item key={`${file.path}-${file.lastModifiedAt}`}>
										<FileItem
											file={file}
											displayCheckbox={!!checkedItems.length}
											checked={!!file.path && checkedItems.includes(file.path)}
											setChecked={setCheckedItems}
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
