import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import Card from '@mui/material/Card';

export const FlexEndBox = styled(Box)`
	display: flex;
	justify-content: flex-end;
	padding: 1rem;
`;

export const AccountButton = styled(Button)`
	background-color: ${({ theme }) => theme.palette.primary.main};
	color: ${({ theme }) => theme.palette.grey[800]};
	&: hover {
		background-color: ${({ theme }) => theme.palette.grey[800]};
		color: ${({ theme }) => theme.palette.primary.main};
	}
`;

export const UCard = styled(Card)`
	background-color: ${({ theme }) => theme.palette.grey[800]};
`;
