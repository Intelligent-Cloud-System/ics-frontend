import styled from 'styled-components';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const FlexBox = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 2rem;
`;

export const UHeader = styled(Typography).attrs({
	variant: 'h5',
})`
	margin-left: 1rem;
`;

export const FilesGridContainer = styled(Grid).attrs({
	container: true,
	spacing: { xs: 2, md: 3 },
	columns: { xs: 4, sm: 8, md: 12 },
})`
	padding: 1rem;
`;

export const FileMenuButton = styled(Button)`
	background-color: #ffffff;
	color: #512da8;
	font-size: 1rem;
`;

export const FilesContainer = styled(Box)`
	background-color: #e0e0e0;
	overflow-y: scroll;
	overflow-x: hidden;
	border: solid 2px #e0e0e0;
	border-radius: 1rem;
	height: 70vh;
	margin: 2rem;
`;
