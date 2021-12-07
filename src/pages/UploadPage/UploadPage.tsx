import { Button, Card, CardContent, Grid, makeStyles } from '@material-ui/core';
import React, { useCallback, useState } from 'react';
import { FileError, FileRejection, useDropzone } from 'react-dropzone';
import styled from 'styled-components';
import { ContainerDropDown } from './UploadPage.styles';

// components
import { UploadError } from './SingleFileUpload/UploadError';

// helpers
import { getNewId } from 'shared/get-id';
import { FileHeader } from './SingleFileUpload/FileHeader';

export interface UploadableFile {
	id: string;
	file: File;
	errors: FileError[];
	url?: string;
}

function UploadPage() {
	const [files, setFiles] = useState<UploadableFile[]>([]);
	const onDrop = useCallback((accFiles: File[], rejFiles: FileRejection[]) => {
		const mappedAcc = accFiles.map(file => ({ file, errors: [], id: getNewId() }));
		const mappedRej = rejFiles.map(r => ({ ...r, id: getNewId() }));
		setFiles(curr => [...curr, ...mappedAcc, ...mappedRej]);
	}, []);

	function onUpload(file: File, url: string) {
		setFiles(curr =>
			curr.map(fw => {
				if (fw.file === file) {
					return { ...fw, url };
				}
				return fw;
			}),
		);
	}

	function onDelete(file: File) {
		setFiles(curr => curr.filter(fw => fw.file !== file));
	}

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		onDrop,
		maxSize: 300 * 1024, // 300KB
	});

	/*const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		maxSize: 300 * 1024, // 300KB
	});*/

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		try {
			console.log(files);
			setFiles([]);
		} catch (e) {
			console.log('Fail. Error: ', e);
		}
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
									{files.map(fileWrapper => (
										<Grid xl={6} item key={fileWrapper.id}>
											{fileWrapper.errors.length ? (
												<UploadError
													file={fileWrapper.file}
													errors={fileWrapper.errors}
													onDelete={onDelete}
												/>
											) : (
												<FileHeader file={fileWrapper.file} onDelete={onDelete} />
											)}
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
