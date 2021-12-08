import React from 'react';
import { Container, Typography, Divider, Avatar, Popover } from '@mui/material';

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
} from './Navigation.styles';

import { useLogout } from 'hooks/auth/useLogout';
import { stringAvatar } from 'shared/string-avatar';

export default function Navigation() {
	const [opened, setOpened] = React.useState<boolean>(false);
	const avatarContainerRef = React.useRef<HTMLDivElement>(null);
	const logout = useLogout();

	const handleClick = (): void => setOpened(!opened);
	const handleClose = (): void => setOpened(false);

	return (
		<>
			<NavToolbar>
				<Container maxWidth={false}>
					<FlexBox>
						<FlexBox>
							<NLink href='/'>
								<CloudIcon sx={{ mr: 0.5 }} fontSize='large' />
								<Typography variant='h4' display='inline-block'>
									ICS
								</Typography>
							</NLink>

							<Divider orientation='vertical' variant='middle' flexItem sx={{ ml: 2 }} />
							<MBreadcrumbs aria-label='breadcrumb'>
								<NLink href='/'>
									<StorageRoundedIcon sx={{ mr: 0.5 }} fontSize='small' />
									Files
								</NLink>
							</MBreadcrumbs>
						</FlexBox>

						<InlineBlock>
							<Avatar
								{...stringAvatar('Name Surname')}
								ref={avatarContainerRef}
								onClick={handleClick}
								style={{ cursor: 'pointer' }}
							/>
							<Popover
								anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
								transformOrigin={{ vertical: 'top', horizontal: 'right' }}
								anchorEl={avatarContainerRef.current}
								open={opened}
								onClose={handleClose}
							>
								<PopoverContainer>
									<Typography variant='button'>Name Surname</Typography>
									<Divider orientation='horizontal' variant='middle' flexItem />
									<PopoverButton startIcon={<SettingsIcon />} onClick={logout}>
										Settings
									</PopoverButton>
									<PopoverButton startIcon={<LogoutIcon />} onClick={logout}>
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
