import styled from 'styled-components';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

export const FilesGridContainer = styled(Grid).attrs({
	container: true,
	spacing: { xs: 2, md: 3 },
	columns: { xs: 4, sm: 8, md: 12 },
})`
	padding: 1rem;
`;

export const FilesContainer = styled(Paper)`
	background-color: ${({ theme }) => theme.palette.grey[500]};
	border: solid 2px ${({ theme }) => theme.palette.grey[300]};
	border-top-left-radius: 1rem;
	overflow: auto;
	height: 80vh;
	margin: 1rem;
`;
