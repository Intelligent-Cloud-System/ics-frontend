import { Toolbar, Box, TextField } from '@mui/material';
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

export const SearchField = styled(TextField).attrs({
	size: 'small',
	label: 'Search',
})`
	margin: 0 2rem;
`;
