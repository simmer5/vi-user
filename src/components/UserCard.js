import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import RoomIcon from '@material-ui/icons/Room'

const useStyles = makeStyles({
	root: {
		minWidth: '20vw',
		margin: '0.5rem',
	},
	content: {
		display: 'flex',
		flexDirection: 'column',
	},
	icon: {
		alignSelf: 'flex-end',
		position: 'absolute',
	},
	title: {
		marginTop: '1rem',
	},
	pos: {
		marginBottom: 12,
	},
})

export default function UserCard(userData) {
	const classes = useStyles()

	const { fullName, email, address, lat, lng } = userData.userData
	const baseMap = `https://www.openstreetmap.org/export/embed.html?bbox=25.38333,54.73333,25.319481,55.321175&layer=mapnik&marker=${lat},${lng}`
	return (
		<>
			<Card className={classes.root}>
				<CardContent className={classes.content}>
					<a className={classes.icon} href={baseMap} target='_tab'>
						<RoomIcon color='primary' fontSize='large' />
					</a>

					<Typography variant='h5' component='h2'>
						{fullName}
					</Typography>

					<Typography variant='body2' component='p'>
						{email}
					</Typography>
					<Typography
						className={classes.title}
						color='textSecondary'
						gutterBottom
					>
						Address
					</Typography>
					<Typography variant='body2' component='p'>
						{address.street} {address.houseNr}
						<br />
						{address.city} {address.zip}
					</Typography>
				</CardContent>
				<CardActions style={{ justifyContent: 'flex-end' }}>
					<Button
						variant='outlined'
						color='secondary'
						onClick={userData.handelDeleteBtnClick}
					>
						Delete
					</Button>
					<Button
						variant='outlined'
						color='primary'
						onClick={userData.handelEditBtnClick}
					>
						Edit
					</Button>
				</CardActions>
			</Card>
		</>
	)
}
