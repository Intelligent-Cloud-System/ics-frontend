import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import styled from 'styled-components';

export const UPContainer = styled(Container).attrs({
	maxWidth: 'xl',
})`
	margin-top: 2rem;
	color: ${({ theme }) => theme.palette.text.primary};
`;

export const FlexBox = styled(Box)`
	margin-top: 2rem;
	display: flex;
	justify-content: center;
	align-items: flex-start;
`;
