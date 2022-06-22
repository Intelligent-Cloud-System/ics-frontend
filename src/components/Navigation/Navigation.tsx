import React, { useContext, useState } from 'react';
import path from 'path';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import CloudIcon from '@mui/icons-material/Cloud';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';

import {
	NavToolbar,
	FlexBox,
	InlineBlock,
	MBreadcrumbs,
	PopoverContainer,
	PopoverButton,
	NLink,
	UAvatar,
} from './Navigation.styles';

import { useLogout } from 'hooks/auth/useLogout';
import { stringAvatar } from 'shared/string-avatar';
import { UserResponse } from 'clients/CoreService';
import { UserContext } from 'context/UserContext';
import { useNavigate } from 'react-router-dom';
import { appPaths } from 'App.routes';

export default function Navigation() {
	const user = useContext<UserResponse | null>(UserContext);
	const [username] = useState<string>(`${user?.firstName} ${user?.lastName}`);
	const [userid] = useState<string>(`${user?.id}`);
	const [opened, setOpened] = useState<boolean>(false);

	const avatarContainerRef = React.useRef<HTMLDivElement>(null);
	const logout = useLogout();

	const handleClick = (): void => setOpened(!opened);
	const handleClose = (): void => setOpened(false);
	const navigate = useNavigate();

	return (
		<>
			<NavToolbar>
				<Container maxWidth={false}>
					<FlexBox>
						<FlexBox>
							<NLink href={`/${appPaths.files.path}`}>
								<CloudIcon sx={{ mr: 0.5 }} fontSize='large' />
								<Typography variant='h4' display='inline-block'>
									ICS
								</Typography>
							</NLink>

							<Divider orientation='vertical' variant='middle' flexItem sx={{ ml: 2, mr: 2 }} />
							<MBreadcrumbs aria-label='breadcrumb'>
								<NLink href={`/${appPaths.files.path}`}>
									<StorageRoundedIcon sx={{ mr: 0.5 }} fontSize='small' />
									Files
								</NLink>
							</MBreadcrumbs>
						</FlexBox>

						<InlineBlock>
							<UAvatar
								{...stringAvatar(username, userid)}
								ref={avatarContainerRef}
								onClick={handleClick}
							/>
							<Popover
								anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
								transformOrigin={{ vertical: 'top', horizontal: 'right' }}
								anchorEl={avatarContainerRef.current}
								open={opened}
								onClose={handleClose}
							>
								<PopoverContainer>
									<Typography variant='button'>{username}</Typography>
									<Divider orientation='horizontal' variant='middle' flexItem />
									<PopoverButton
										startIcon={<SettingsIcon />}
										onClick={() =>
											navigate(path.join(appPaths.profile.path, appPaths.profile.subPaths.settings))
										}
									>
										Settings
									</PopoverButton>
									<PopoverButton
										startIcon={<LogoutIcon />}
										onClick={() => {
											logout();
										}}
									>
										Logout
									</PopoverButton>
								</PopoverContainer>
							</Popover>
						</InlineBlock>
					</FlexBox>
				</Container>
			</NavToolbar>
		</>
	);
}
