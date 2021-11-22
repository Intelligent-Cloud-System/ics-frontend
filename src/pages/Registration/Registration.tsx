import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// validator
import yup from '../../instances/form-validator';

const theme = createTheme();

export default function SignIn() {
	const history = useHistory();

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validationSchema: yup.object({
			firstName: yup
				.string()
				.required('First Name is required')
				.matches(/^[A-Z][a-z ]*$/, 'Please enter valid first name')
				.max(40),
			lastName: yup
				.string()
				.required('Last Name is required')
				.matches(/^[A-Za-z ]*$/, 'Please enter valid last name')
				.max(40),
			email: yup.string().required('Email is required').email('Not valid email'),
			password: yup
				.string()
				.required('No password provided.')
				.matches(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
					'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
				),
			confirmPassword: yup
				.string()
				.required('You have to confirm password')
				.oneOf([yup.ref('password'), null], 'Passwords must match'),
		}),
		onSubmit: async data => {
			console.log(data);
			history.push('/login');
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}></Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box component='form' onSubmit={form.handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							fullWidth
							id='firstName'
							label='First Name'
							name='firstName'
							autoFocus
							value={form.values.firstName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.touched.firstName && Boolean(form.errors.firstName)}
							helperText={form.touched.firstName && form.errors.firstName}
						/>
						<TextField
							margin='normal'
							fullWidth
							id='lastName'
							label='Last Name'
							name='lastName'
							value={form.values.lastName}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.touched.lastName && Boolean(form.errors.lastName)}
							helperText={form.touched.lastName && form.errors.lastName}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							value={form.values.email}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.touched.email && Boolean(form.errors.email)}
							helperText={form.touched.email && form.errors.email}
						/>
						<TextField
							margin='normal'
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							value={form.values.password}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.touched.password && Boolean(form.errors.password)}
							helperText={form.touched.password && form.errors.password}
						/>
						<TextField
							margin='normal'
							fullWidth
							name='confirmPassword'
							label='Confirm password'
							type='password'
							id='confirmPassword'
							value={form.values.confirmPassword}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.touched.confirmPassword && Boolean(form.errors.confirmPassword)}
							helperText={form.touched.confirmPassword && form.errors.confirmPassword}
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							disabled={!form.isValid || !form.dirty || form.isSubmitting}
						>
							Sign In
						</Button>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
