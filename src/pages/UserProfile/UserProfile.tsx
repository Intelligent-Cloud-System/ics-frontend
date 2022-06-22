import React, { useContext } from 'react';
import { Divider, Typography } from '@mui/material';
import Account from './components/Account';
import AccountProfileDetails from './components/AccountProfileDetails';
import { FlexBox, UPContainer } from './UserProfile.styles';
import { UserContext } from 'context/UserContext';
import { UserResponse } from 'clients/CoreService';

function UserProfile() {
	const user = useContext<UserResponse | null>(UserContext);

	return (
		<>
			<UPContainer>
				<Typography variant='h5'>My Profile</Typography>
				<Divider orientation='horizontal' variant='middle' flexItem />
				<FlexBox>
					{user && (
						<>
							<Account username={`${user.firstName} ${user.lastName}`} userid={`${user.id}`} />
							<AccountProfileDetails
								email={user.email}
								firstName={user.firstName}
								lastName={user.lastName}
							/>
						</>
					)}
				</FlexBox>
			</UPContainer>
		</>
	);
}

export default UserProfile;
