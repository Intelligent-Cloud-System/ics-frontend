import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// validator
import yup from '../../instances/form-validator';

const theme = createTheme();

export default function SignIn() {
	const history = useHistory();
	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = new FormData(event.currentTarget);
		history.push('/home');
	};

	const form = useFormik({
		enableReinitialize: true,
		initialValues: {
			email: '',
			password: '',
		},
		validationSchema: yup.object({
			email: yup.string().required('Email is required').email('Not valid email'),
			password: yup.string().required('No password provided.'),
		}),
		onSubmit: async data => {
			console.log(data);
			history.push('/home');
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
						Sign in
					</Typography>
					<Box component='form' onSubmit={form.handleSubmit} noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							value={form.values.email}
							onChange={form.handleChange}
							onBlur={form.handleBlur}
							error={form.touched.email && Boolean(form.errors.email)}
							helperText={form.touched.email && form.errors.email}
						/>
						<TextField
							margin='normal'
							required
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
						<Button
							type='submit'
							fullWidth
							variant='contained'
							sx={{ mt: 3, mb: 2 }}
							disabled={!form.isValid || !form.dirty || form.isSubmitting}
						>
							Sign In
						</Button>
						<Typography variant='button' component={Link} to='/register'>
							{"Don't have an account? Sign Up"}
						</Typography>
					</Box>
				</Box>
			</Container>
		</ThemeProvider>
	);
}
