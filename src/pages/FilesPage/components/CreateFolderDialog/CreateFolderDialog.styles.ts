import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';

export const DialogAppBar = styled(AppBar)`
	position: relative;
	background-color: ${({ theme }) => theme.palette.grey[300]};
`;

export const DialogToolbar = styled(Toolbar)`
	display: flex;
	justify-content: space-between;
`;

export const FixedSizeDialog = styled(Dialog).attrs({
	maxWidth: 'xs',
})``;

export const DialogMenuButton = styled(IconButton)`
	color: ${({ theme }) => theme.palette.primary.main};
	font-size: 1rem;
`;
