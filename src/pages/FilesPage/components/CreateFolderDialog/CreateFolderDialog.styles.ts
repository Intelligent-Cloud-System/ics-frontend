import styled from 'styled-components';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

export const DialogAppBar = styled(AppBar)`
	position: relative;
`;

export const DialogToolbar = styled(Toolbar)`
	display: flex;
	justify-content: space-between;
`;

export const FixedSizeDialog = styled(Dialog).attrs({
	maxWidth: 'xs',
})``;

export const DialogMenuButton = styled(IconButton)`
	background-color: #ffffff;
	color: #512da8;
	font-size: 1rem;
`;
