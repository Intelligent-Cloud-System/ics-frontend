import React from 'react';
import { Container, IconButton, Typography, Button } from '@mui/material';
import { NavToolbar, FlexBox, InlineBlock, SearchField } from './Navigation.styles';

import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';
import { deepPurple } from '@mui/material/colors';

const color = deepPurple[400];

export default function Navigation() {
	return (
		<>
			<NavToolbar>
				<Container maxWidth={false}>
					<FlexBox>
						<FlexBox>
							<Button style={{ color }}>
								<CloudIcon></CloudIcon>
								<Typography variant='h5' display='inline-block'>
									ICS
								</Typography>
							</Button>
							<SearchField
								InputProps={{
									endAdornment: (
										<IconButton>
											<SearchIcon style={{ color }} />
										</IconButton>
									),
								}}
							/>
						</FlexBox>

						<InlineBlock>
							<IconButton>
								<SettingsIcon style={{ color }}></SettingsIcon>
							</IconButton>
							<IconButton>
								<PersonIcon style={{ color }}></PersonIcon>
							</IconButton>
							<IconButton>
								<PowerSettingsNewIcon style={{ color }}></PowerSettingsNewIcon>
							</IconButton>
						</InlineBlock>
					</FlexBox>
				</Container>
			</NavToolbar>
		</>
	);
}
