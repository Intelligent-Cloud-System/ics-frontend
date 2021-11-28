import { Button, Grid, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const GridCenter = styled(Grid).attrs({
	display: 'flex',
	direction: 'column',
	justifyContent: 'center',
	alignItems: 'center',
	container: true,
})`
	margin-top: 10rem;
`;

export const Form = styled.form`
	padding: 1rem;
	width: 50%;
	min-width: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const WTextField = styled(TextField).attrs({
	fullWidth: true,
})`
	margin-top: 1rem;
`;

export const WButton = styled(Button).attrs({
	variant: 'outlined',
	fullWidth: true,
})`
	margin-top: 2rem;
`;

export const WLink = styled(Link)`
	text-decoration: none;
	color: black;
`;
