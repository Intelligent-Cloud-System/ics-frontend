import React, { ChangeEvent, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AccountButton, FlexEndBox } from './AccountProfileDetails.styles';

export const AccountProfileDetails = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	return (
		<form autoComplete='off' noValidate>
			<Card>
				<CardHeader subheader='The information can be edited' title={'demo@email.com'} />
				<Divider />
				<CardContent>
					<Grid container spacing={3}>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='First name'
								onChange={(e: ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
								required
								value={firstName}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Last name'
								onChange={(e: ChangeEvent<HTMLInputElement>) => setLastName(e.target.value)}
								required
								value={lastName}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='Old password'
								onChange={(e: ChangeEvent<HTMLInputElement>) => setOldPassword(e.target.value)}
								type={'password'}
								value={oldPassword}
							/>
						</Grid>
						<Grid item md={6} xs={12}>
							<TextField
								fullWidth
								label='New password'
								onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)}
								type={'password'}
								value={newPassword}
							/>
						</Grid>
					</Grid>
				</CardContent>
				<Divider />
				<FlexEndBox>
					<AccountButton variant='outlined'>Save details</AccountButton>
				</FlexEndBox>
			</Card>
		</form>
	);
};
