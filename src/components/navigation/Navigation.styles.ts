import { Toolbar, Box, Breadcrumbs } from '@mui/material';
import styled from 'styled-components';

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
