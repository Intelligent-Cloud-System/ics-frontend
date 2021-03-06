import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import LinearProgress from '@mui/material/LinearProgress';

import { FilesContainer, FilesGridContainer } from './FilePage.styles';
import theme from 'themes';

// helpers
import { FileItem } from './components/FileItem';
import { FileManagerService, PostUrlInfo } from 'clients/CoreService';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { entities } from 'consts/entities';
import { FileInfo } from './components/FileItem/FileItem';
import { FolderItem } from './components/FolderItem';
import { ControlMenu } from './components/ControlMenu';
import { LocationLinks } from './components/LocationLinks';
import { uploadFileToS3 } from 'shared/fileUploadUtil';
import { downloadFilesFromSignedUrls } from './components/utils/downloadFilesByLink';
import { getBasename } from 'shared/util';
import useSocket from '../../hooks/socket/useSocket';

function FilesPage() {
	const queryClient = useQueryClient();
	const onError = useSnackbarOnError();
	const [currentLocation, setCurrentLocation] = useState<string>('');
	const [processingFiles, setProcessingFiles] = useState<Array<FileInfo>>([]);
	const [checkedItems, setCheckedItems] = useState<Array<string>>([]);

	const { data: content, isLoading: isContentLoading } = useQuery(
		[entities.file, currentLocation],
		() => FileManagerService.list(currentLocation),
		{
			onError,
		},
	);

	const { mutate: uploadFiles } = useMutation(
		[entities.file],
		async (files: Array<File>) => {
			const { urls } = await FileManagerService.getSignedPostUrls({
				location: currentLocation,
				fileInfos: files.map(({ name, size }) => ({ name, size })),
			});

			return Promise.all(
				urls.map((postUrl: PostUrlInfo) => {
					const fileName = getBasename(postUrl.path);
					const file = files.find(file => file.name === fileName);
					if (!file) {
						const error = new Error(`Bad link generation for file ${fileName}`);
						onError(error);
						return error;
					}
					return uploadFileToS3(postUrl, file).then(() => {
						setProcessingFiles(processingFiles =>
							processingFiles?.filter(processedFile => processedFile.basename !== file.name),
						);
					});
				}),
			);
		},
		{
			onError,
			onSuccess: () => queryClient.invalidateQueries(entities.file),
			onMutate: (files: File[]) => {
				setProcessingFiles(processingFiles => {
					return [
						...processingFiles,
						...files.map(file => ({
							basename: file.name,
							size: file.size,
							path: `${currentLocation}/${file.name}`,
							isLoading: true,
						})),
					];
				});
			},
		},
	);

	const { mutate: deleteFiles, isLoading: isDeleteLoading } = useMutation(
		[entities.file],
		(items: Array<string>) => {
			return FileManagerService.delete({ paths: items });
		},
		{
			onError: useSnackbarOnError(),
			onSuccess: () => queryClient.invalidateQueries(entities.file),
			onSettled: () => setCheckedItems([]),
		},
	);

	const { mutate: downloadFile, isLoading: isDownloadLoading } = useMutation(
		[entities.file],
		async (filePathes: string[]) => {
			const request = {
				location: currentLocation,
				names: filePathes.map(filePath => getBasename(filePath)),
			};
			return FileManagerService.getSignedGetUrls(request);
		},
		{
			onError,
			onSuccess: downloadFilesFromSignedUrls,
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
		() => [...(content?.files || []), ...processingFiles],
		[content, processingFiles],
	);

	const folders = useMemo(() => [...(content?.folders || [])], [content]);

	const isLoading = useMemo(
		() => isContentLoading || isDeleteLoading || isDownloadLoading,
		[isContentLoading, isDeleteLoading, isDownloadLoading],
	);

	useEffect(() => {
		setCheckedItems([]);
	}, [currentLocation]);

	useSocket([
		{
			type: 'FilesListUpdated',
			listener: async () => {
				await queryClient.invalidateQueries(entities.file);
			},
		},
	]);

	return (
		<Container maxWidth={false}>
			<ControlMenu
				location={currentLocation}
				disabledDownload={checkedItems.length !== 1 || checkedItems.some(i => i.endsWith('/'))}
				disabledDelete={checkedItems.length === 0}
				onChangeUpload={event => uploadFiles(Array.from(event.target.files || []))}
				onClickDownload={() => downloadFile(checkedItems)}
				onClickDelete={() => deleteFiles(checkedItems)}
			/>
			<LocationLinks location={currentLocation} setLocation={setCurrentLocation} />
			<FilesContainer
				{...getRootProps()}
				style={isDragActive ? { borderColor: theme.palette.primary.main } : {}}
			>
				<FilesGridContainer>
					{isLoading && <LinearProgress />}
					{folders &&
						folders.map(folder => (
							<Grid item key={folder.path}>
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
								<Grid item key={file.path}>
									<FileItem
										file={file}
										checked={!!file.path && checkedItems.includes(file.path)}
										displayCheckbox={!!checkedItems.length}
										setChecked={setCheckedItems}
									/>
								</Grid>
							);
						})}
				</FilesGridContainer>
			</FilesContainer>
		</Container>
	);
}

export default FilesPage;
