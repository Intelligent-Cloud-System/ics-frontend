import React from 'react';
import { Divider, Typography } from '@mui/material';
import Account from './components/Account';
import AccountProfileDetails from './components/AccountProfileDetails';
import { FlexBox, UPContainer } from './UserProfile.styles';

function UserProfile() {
	return (
		<>
			<UPContainer>
				<Typography variant='h5'>My Profile</Typography>
				<Divider orientation='horizontal' variant='middle' flexItem />
				<FlexBox>
					<Account />
					<AccountProfileDetails />
				</FlexBox>
			</UPContainer>
		</>
	);
}

export default UserProfile;
