import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { stringAvatar } from 'shared/string-avatar';
import { AccountButton, FlexBoxColumn, UAvatar, UCard } from './Account.styles';

const user = {
	name: 'Name Surname',
	timezone: 'GTM-7',
};

export const Account = () => (
	<UCard>
		<CardContent>
			<FlexBoxColumn>
				<UAvatar {...stringAvatar('Name Surname')} />
				<Typography color='textPrimary' gutterBottom variant='h5'>
					{user.name}
				</Typography>
				<Typography color='textSecondary' variant='body2'>
					{user.timezone}
				</Typography>
			</FlexBoxColumn>
		</CardContent>
		<Divider />
		<CardActions>
			<AccountButton fullWidth>Upload picture</AccountButton>
		</CardActions>
	</UCard>
);
