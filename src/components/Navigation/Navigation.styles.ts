import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import styled from 'styled-components';
import { Avatar } from '@mui/material';

export const UAvatar = styled(Avatar)`
	color: ${({ theme }) => theme.palette.primary.main};
	cursor: 'pointer';
`;

export const NavToolbar = styled(Toolbar)`
	background-color: ${({ theme }) => theme.palette.grey[300]};
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
	color: ${({ theme }) => theme.palette.primary.main};
	border-color: ${({ theme }) => theme.palette.primary.main};
`;

export const NLink = styled(Link).attrs({
	underline: 'hover',
	sx: { display: 'flex', alignItems: 'center' },
})`
	color: ${({ theme }) => theme.palette.primary.main};
`;
