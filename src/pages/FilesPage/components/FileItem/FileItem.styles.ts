import styled from 'styled-components';
import Checkbox from '@mui/material/Checkbox';
import Card from '@mui/material/Card';

export const WCard = styled(Card)`
	position: relative;
	minwidth: 10rem;
	borderradius: 0.5rem;
	padding-right: 1.5rem;
	cursor: pointer;
`;

export const CardCheckbox = styled(Checkbox).attrs({
	size: 'small',
})`
	position: absolute;
	top: 0.4rem;
	right: 0.4rem;
	padding: 0;
`;
