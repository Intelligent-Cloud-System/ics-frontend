import React from 'react';
import Typography from '@mui/material/Typography';
import {
	FolderItemCard,
	FolderItemCheckbox,
	FolderItemContainer,
	FolderItemIcon,
} from './FolderItem.styles';
import { FolderResponse } from 'clients/CoreService';
import { renderLongName } from '../renderers/renderLongName';

export interface FolderItemProps {
	folder: FolderResponse;
	checked?: boolean;
	setChecked: React.Dispatch<React.SetStateAction<string[]>>;
	setLocation: React.Dispatch<React.SetStateAction<string>>;
}

export function FolderItem({ folder, checked, setChecked, setLocation }: FolderItemProps) {
	const handleClick = () => {
		if (folder.path !== undefined) {
			if (checked) {
				setChecked(ids => {
					return ids.filter(basename => basename !== folder.path);
				});
			} else {
				setChecked(checked => [...checked, folder.path]);
			}
		}
	};

	const folderName = folder.path.split('/').at(-2);

	return (
		<FolderItemContainer>
			<FolderItemCard onClick={() => setLocation(folder.path)}>
				<FolderItemCheckbox
					onClick={e => {
						e.stopPropagation();
						handleClick();
					}}
					checked={!!checked}
				/>
				<FolderItemIcon />
			</FolderItemCard>
			<Typography>{renderLongName(folderName)}</Typography>
		</FolderItemContainer>
	);
}
