import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import { useMutation, useQueryClient } from 'react-query';
import { TransitionProps } from '@mui/material/transitions';

import { useSnackbarOnError } from 'hooks/notification/useSnackbarOnError';
import { entities } from 'consts/entities';
import { CreateFolderRequest, FileManagerService } from 'clients/CoreService';
import {
	DialogAppBar,
	DialogToolbar,
	FixedSizeDialog,
	DialogMenuButton,
} from './CreateFolderDialog.styles';

const Transition = React.forwardRef(function Transition(
	props: TransitionProps & {
		children: React.ReactElement;
	},
	ref: React.Ref<unknown>,
) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export interface CreateFolderDialogProps {
	location: string;
}

export function CreateFolderDialog({ location }: CreateFolderDialogProps) {
	const queryClient = useQueryClient();
	const [open, setOpen] = React.useState(false);
	const [folderName, setFolderName] = React.useState<string>('');

	const { mutate: createFolder } = useMutation(
		[entities.file],
		(folder: CreateFolderRequest) => {
			return FileManagerService.createFolder(folder);
		},
		{
			onError: useSnackbarOnError(),
			onSettled: () => {
				queryClient.invalidateQueries(entities.file);
				setOpen(false);
			},
		},
	);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setFolderName('');
		setOpen(false);
	};

	const handleSave = () => {
		createFolder({ location, name: folderName });
		setFolderName('');
	};

	return (
		<div>
			<DialogMenuButton onClick={handleClickOpen}>
				<div>
					<CreateNewFolderIcon />
				</div>
			</DialogMenuButton>
			<FixedSizeDialog fullWidth open={open} onClose={handleClose} TransitionComponent={Transition}>
				<DialogAppBar>
					<DialogToolbar>
						<DialogMenuButton onClick={handleClose}>
							<CloseIcon />
						</DialogMenuButton>
						<DialogMenuButton onClick={handleSave}>
							<SaveIcon />
						</DialogMenuButton>
					</DialogToolbar>
				</DialogAppBar>
				<List>
					<ListItem>
						<TextField
							fullWidth
							label='Folder name'
							value={folderName}
							onChange={e => setFolderName(e.target.value)}
						/>
					</ListItem>
				</List>
			</FixedSizeDialog>
		</div>
	);
}
