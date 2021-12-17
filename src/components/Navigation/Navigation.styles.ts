import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import { deepPurple } from '@mui/material/colors';
import styled from 'styled-components';

const color = deepPurple[700];

export const NavToolbar = styled(Toolbar)`
	background-color: #e0e0e0;
`;

export const FlexBox = styled(Box)`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const InlineBlock = styled(Box)`
	display: inline-block;
`;

export const MBreadcrumbs = styled(Breadcrumbs)`
	margin-left: 1.5rem;
	font-size: 1.1em;
	font-weight: 600;
`;

export const PopoverContainer = styled.div`
	display: flex;
	flex-direction: column;
	padding: 1.2rem;
	text-align: center;
`;

export const PopoverButton = styled(Button).attrs({
	variant: 'outlined',
})`
	margin-top: 1rem;
	color: #512da8;
	border-color: #512da8;
`;

export const NLink = styled(Link).attrs({
	underline: 'hover',
	sx: { display: 'flex', alignItems: 'center' },
	color,
})``;
