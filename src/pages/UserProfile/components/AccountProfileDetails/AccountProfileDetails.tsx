import React, { ChangeEvent, useState } from 'react';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { AccountButton, FlexEndBox, UCard } from './AccountProfileDetails.styles';

interface AccountProfileDetailsProps {
	email: string;
	firstName: string;
	lastName: string;
}

export const AccountProfileDetails = (props: AccountProfileDetailsProps): JSX.Element => {
	const [firstName, setFirstName] = useState(props.firstName);
	const [lastName, setLastName] = useState(props.lastName);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');

	return (
		<form autoComplete='off' noValidate>
			<UCard>
				<CardHeader subheader='The information can be edited' title={props.email} />
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
			</UCard>
		</form>
	);
};
