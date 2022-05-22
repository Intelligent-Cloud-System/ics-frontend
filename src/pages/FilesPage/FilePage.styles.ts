import styled from 'styled-components';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

export const FilesGridContainer = styled(Grid).attrs({
	container: true,
	spacing: { xs: 2, md: 3 },
	columns: { xs: 4, sm: 8, md: 12 },
})`
	padding: 1rem;
`;

export const FilesContainer = styled(Box)`
	background-color: #e0e0e0;
	overflow-y: scroll;
	overflow-x: hidden;
	border: solid 2px #e0e0e0;
	border-radius: 1rem;
	height: 70vh;
	margin: 1rem 2rem 2rem;
`;
