import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import styled from 'styled-components';

export const UAvatar = styled(Avatar)`
	height: 64px;
	margin-bottom: 2rem;
	width: 64px;
`;

export const FlexBoxColumn = styled(Box)`
	display: flex;
	align-items: center;
	flex-direction: column;
`;

export const AccountButton = styled(Button)`
	background-color: #ffffff;
	color: #512da8;
`;

export const UCard = styled(Card)`
	min-width: 20em;
	margin: 0 2rem;
`;
