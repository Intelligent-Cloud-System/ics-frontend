import React from 'react';
import { Container, IconButton, Typography, Link } from '@mui/material';
import { NavToolbar, FlexBox, InlineBlock, MBreadcrumbs } from './Navigation.styles';

import PersonIcon from '@mui/icons-material/Person';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageRoundedIcon from '@mui/icons-material/StorageRounded';
import { deepPurple } from '@mui/material/colors';

const color = deepPurple[700];

export default function Navigation() {
	return (
		<>
			<NavToolbar>
				<Container maxWidth={false}>
					<FlexBox>
						<FlexBox>
							<Link
								underline='none'
								sx={{ display: 'flex', alignItems: 'center' }}
								color={color}
								href='/'
							>
								<CloudIcon sx={{ mr: 0.5 }} fontSize='large' />
								<Typography variant='h4' display='inline-block'>
									ICS
								</Typography>
							</Link>

							<MBreadcrumbs aria-label='breadcrumb'>
								<Link
									underline='hover'
									sx={{ display: 'flex', alignItems: 'center' }}
									color={color}
									href='/'
								>
									<StorageRoundedIcon sx={{ mr: 0.5 }} fontSize='small' />
									Files
								</Link>
							</MBreadcrumbs>
						</FlexBox>

						<InlineBlock>
							<IconButton>
								<PersonIcon style={{ color }}></PersonIcon>
							</IconButton>
						</InlineBlock>
					</FlexBox>
				</Container>
			</NavToolbar>
		</>
	);
}
