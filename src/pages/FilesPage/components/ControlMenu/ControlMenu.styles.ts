import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';

export const FileMenuButton = styled(IconButton)`
	color: ${({ theme }) => theme.palette.primary.main};
	font-size: 1rem;
`;

export const FlexBox = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 0.5rem;
`;
