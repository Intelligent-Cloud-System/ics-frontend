import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const UHeader = styled(Typography).attrs({
	variant: 'h6',
})`
	color: ${({ theme }) => theme.palette.text.primary};
	margin-left: 1rem;
	font-family: sans-serif;
`;

export const FakeLink = styled(Box).attrs({
	component: 'span',
})`
	cursor: pointer;
	&: hover {
		color: ${({ theme }) => theme.palette.primary.main};
		text-decoration: underline;
	}
`;

export const NotActiveLink = styled(Box).attrs({
	component: 'span',
})`
	font-weight: ${({ theme }) => theme.typography.fontWeightBold};
`;
