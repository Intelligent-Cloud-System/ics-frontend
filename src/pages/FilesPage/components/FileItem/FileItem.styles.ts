import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from '@mui/material/Box';

export const FileIcon = styled(InsertDriveFileIcon)`
	font-size: 90px;
	color: ${({ theme }) => theme.palette.primary.main};
	margin-bottom: 6px;
`;

export const FileCard = styled(Card)`
	background: transparent;
	box-shadow: none;
	position: relative;
	color: ${({ theme }) => theme.palette.text.primary};
`;

export const CardCheckbox = styled(Checkbox).attrs({
	size: 'small',
})`
	position: absolute;
	top: 0.6rem;
	left: 1rem;
	padding: 0;
	color: ${({ theme }) => theme.palette.text.primary} !important;
`;

export const FileItemContainer = styled(Box)`
	text-align: center;
`;
