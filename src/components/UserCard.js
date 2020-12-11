import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

import EditUserModal from './EditUserModal'

const useStyles = makeStyles({
	root: {
		minWidth: '20vw',
		margin: '0.5rem',
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
})

export default function UserCard(userData, { handelDeleteBtnClick }) {
	const classes = useStyles()
	console.log('Prop userData is user card', userData)
	const { fullName, email, address } = userData.userData

	return (
		<>
			<Card className={classes.root}>
				<CardContent>
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
				<CardActions>
					<EditUserModal userData={userData} />

					<Button
						variant='outlined'
						color='primary'
						onClick={handelDeleteBtnClick}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
		</>
	)
}
