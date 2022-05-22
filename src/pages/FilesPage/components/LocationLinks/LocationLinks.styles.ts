import styled from 'styled-components';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export const UHeader = styled(Typography).attrs({
	variant: 'h6',
})`
	color: #636363;
	margin-left: 1rem;
	font-family: sans-serif;
`;

export const FakeLink = styled(Box).attrs({
	component: 'span',
})`
	cursor: pointer;
	&: hover {
		color: #512da8;
		text-decoration: underline;
	}
`;

export const NotActiveLink = styled(Box).attrs({
	component: 'span',
})`
	font-weight: 600;
`;
