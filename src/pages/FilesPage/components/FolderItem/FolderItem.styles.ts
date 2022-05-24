import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export const FolderItemIcon = styled(FolderIcon)`
	font-size: 6.25rem;
	color: ${({ theme }) => theme.palette.primary.main};
	margin-bottom: -0.625rem;
`;

export const FolderItemCard = styled(Card)`
	background: transparent;
	box-shadow: none;
	position: relative;
`;

export const FolderItemCheckbox = styled(Checkbox).attrs({
	size: 'medium',
})`
	position: absolute;
	top: 1.6rem;
	right: 0.6rem;
	padding: 0;
	color: ${({ theme }) => theme.palette.grey[50]} !important;
`;

export const FolderItemContainer = styled(Box)`
	text-align: center;
	cursor: pointer;
`;
