import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Box from '@mui/material/Box';

export const FileIcon = styled(InsertDriveFileIcon)`
	font-size: 90px;
	color: #6e52b3;
	margin-bottom: 6px;
`;

export const FileCard = styled(Card)`
	background: transparent;
	box-shadow: none;
	position: relative;
`;

export const CardCheckbox = styled(Checkbox).attrs({
	size: 'small',
})`
	position: absolute;
	top: 0.4rem;
	right: 0.4rem;
	padding: 0;
`;

export const FileItemContainer = styled(Box)`
	text-align: center;
`;
