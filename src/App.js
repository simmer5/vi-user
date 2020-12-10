import React, { useState, useRef, useEffect } from 'react'
import './App.css'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import userService from './services/users'

import AddUserForm from './components/AddUserForm'
import UserCard from './components/UserCard'

function App() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		userService.getAll().then(initialContacts => {
			setUsers(initialContacts)
		})
	}, [])

	return (
		<Box component='div'>
			<Container maxWidth='lg'>
				<Grid container spacing={1}>
					<Paper
						variant='outlined'
						style={{ width: '100%', margin: 10, padding: 10 }}
					>
						<Grid item xs={12} sm={12} md={6} lg={6}>
							<AddUserForm />
						</Grid>
					</Paper>
					<Grid container spacing={4}>
						{users.map(user => (
							<>
								<Grid item xs={12} sm={6} md={4} lg={3}>
									<UserCard
										fullName={user.fullName}
										email={user.email}
										city={user.adrress}
										street={user.street}
										houseNr={user.houseNr}
										zip={user.zip}
									/>
								</Grid>
							</>
						))}

						{/* <Grid item xs={12} sm={6} md={4} lg={3}>
							<UserCard />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<UserCard />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<UserCard />
						</Grid>
						<Grid item xs={12} sm={6} md={4} lg={3}>
							<UserCard />
						</Grid> */}
					</Grid>
				</Grid>
			</Container>
		</Box>
	)
}

export default App
