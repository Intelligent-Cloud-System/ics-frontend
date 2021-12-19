import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';

export const FlexEndBox = styled(Box)`
	display: flex;
	justify-content: flex-end;
	padding: 1rem;
`;

export const AccountButton = styled(Button)`
	background-color: #512da8;
	color: #ffffff;
	&: hover {
		background-color: #ffffff;
		color: #512da8;
	}
`;
