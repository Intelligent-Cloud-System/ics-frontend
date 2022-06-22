import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import styled from 'styled-components';

export const UAvatar = styled(Avatar)`
	height: 80px;
	margin-bottom: 2rem;
	width: 80px;
	font-size: 2rem;
	color: ${({ theme }) => theme.palette.primary.main};
`;

export const FlexBoxColumn = styled(Box)`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const AccountButton = styled(Button)`
	background-color: ${({ theme }) => theme.palette.grey[800]};
	color: ${({ theme }) => theme.palette.primary.main};
`;

export const UCard = styled(Card)`
	background-color: ${({ theme }) => theme.palette.grey[800]};
	min-width: 20em;
	margin-right: 2rem;
`;
