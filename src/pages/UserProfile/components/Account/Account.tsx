import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { stringAvatar } from 'shared/string-avatar';
import { AccountButton, FlexBoxColumn, UAvatar, UCard } from './Account.styles';

interface AccountProps {
	username: string;
	userid: string;
}

export const Account = ({ username, userid }: AccountProps): JSX.Element => (
	<UCard>
		<CardContent>
			<FlexBoxColumn>
				<UAvatar {...stringAvatar(username, userid)} />
				<Typography color='textPrimary' gutterBottom variant='h5'>
					{username}
				</Typography>
			</FlexBoxColumn>
		</CardContent>
		<Divider />
		<CardActions>
			<AccountButton fullWidth>Upload picture</AccountButton>
		</CardActions>
	</UCard>
);
