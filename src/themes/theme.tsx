import { createTheme, responsiveFontSizes, ThemeOptions } from '@mui/material/styles';

import { shadows } from 'themes/shadows';

const themeOptions: ThemeOptions = {
	palette: {
		primary: { main: '#389DE0', contrastText: '#ffffff' },
		secondary: { main: '#E91E63', contrastText: '#ffffff' },
		background: { default: '#f4f5f7', paper: '#ffffff' },
		text: { primary: '#253858', secondary: '#68758B' },
		action: { active: '#6b778c' },
		success: { main: '#4caf50', contrastText: '#ffffff', light: '#EDF7ED' },
		warning: { main: '#ff9800', contrastText: '#ffffff' },
		error: { main: '#f44336', contrastText: '#ffffff' },
		grey: {
			'50': '#BDBDBD',
			'300': '#E0E0E0',
			'500': '#D0D4DB',
			'700': '#DFDFDF',
			'800': '#F4F5F7',
			A700: '#616161',
		},
	},
	shadows: shadows,
	direction: 'ltr',
	shape: { borderRadius: '4px' },
	typography: {
		fontFamily: 'Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
		fontWeightLight: 300,
		fontWeightRegular: 400,
		fontWeightMedium: 500,
		fontWeightBold: 600,
		button: { fontWeight: 600 },
		h1: { fontWeight: 300, fontSize: '3.5rem' },
		h2: { fontWeight: 300, fontSize: '3rem' },
		h3: { fontWeight: 400, fontSize: '2.25rem' },
		h4: { fontWeight: 400, fontSize: '2rem' },
		h5: { fontWeight: 400, fontSize: '1.5rem' },
		h6: { fontWeight: 500, fontSize: '1.125rem' },
		subtitle1: { fontSize: '14px' }, // for Data-Grid cells
		subtitle2: { fontSize: '12px' },
		overline: { fontWeight: 600 },
	},
};

export default responsiveFontSizes(createTheme(themeOptions));
