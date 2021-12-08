import { Button, Card, CardContent, Grid } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { ContainerDropDown } from './UploadPage.styles';

// helpers
import { FileHeader } from './SingleFileUpload/FileHeader';
import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';

function UploadPage() {
	const [files, setFiles] = useState<Array<File>>([]);

	const snackbarOnError = useSnackbarOnError();

	const onDrop = useCallback(
		(acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
			if (rejectedFiles.length) {
				const rejectedFilenames = rejectedFiles.map(file => file.file.name);
				snackbarOnError(new Error(`Can't download files ${rejectedFilenames.join(', ')}`));
			}

			setFiles(curr => [...curr, ...acceptedFiles]);
		},
		[setFiles, snackbarOnError],
	);

	function onDelete(file: File) {
		setFiles(curr => curr.filter(f => f !== file));
	}

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop,
	});

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		console.log(files);
	};

	return (
		<>
			<form>
				<Card>
					<CardContent>
						<Grid container spacing={2} direction='column'>
							<React.Fragment>
								<Grid item>
									<ContainerDropDown
										{...getRootProps({ isDragActive, isDragAccept, isDragReject })}
									>
										<input {...getInputProps()} />
										<p>Drag n drop some files here, or click to select files</p>
									</ContainerDropDown>
								</Grid>
								<Grid container item spacing={2}>
									{files.map(file => (
										<Grid xl={6} item key={file.name}>
											<FileHeader file={file} onDelete={onDelete} />
										</Grid>
									))}
								</Grid>
							</React.Fragment>
							<Grid item>
								<Button variant='contained' color='primary' onClick={handleSubmit} type='submit'>
									Submit
								</Button>
							</Grid>
						</Grid>
					</CardContent>
				</Card>
			</form>
		</>
	);
}

export default UploadPage;
