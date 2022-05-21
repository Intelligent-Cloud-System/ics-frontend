import styled from 'styled-components';
import FolderIcon from '@mui/icons-material/Folder';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';

export const FolderItemIcon = styled(FolderIcon)`
	font-size: 100px;
	color: #6e52b3;
	margin-bottom: -10px;
`;

export const FolderItemCard = styled(Card)`
	display: inline-block;
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
	color: #ffffff !important;
`;

export const FolderItemContainer = styled(Box)`
	text-align: center;
	cursor: pointer;
`;
