import React, { useState, useEffect } from 'react'
import './App.css'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'

import userService from './services/users'

import UserCard from './components/UserCard'

function App() {
	const [users, setUsers] = useState([])

	useEffect(() => {
		userService.getAll().then(initialContacts => {
			setUsers(initialContacts)
		})
	}, [])

	const handelDeleteBtnClick = id => {
		console.log('Klikas veikia', id)
		if (window.confirm('Do you realy want to delete?')) {
			userService.deleteUser(id).then(() => {
				setUsers(users.filter(user => user.id !== id))
			})
		}
	}

	return (
		<>
			{/* <Box component='div'>
				<EditUserModal />
			</Box> */}

			<Box component='div'>
				<Container maxWidth='lg'>
					<Grid container spacing={4}>
						{users.map((user, idx) => (
							<Grid key={idx} item xs={12} sm={6} md={4} lg={4}>
								<UserCard
									userData={user}
									handelDeleteBtnClick={() => handelDeleteBtnClick(user.id)}
								/>
							</Grid>
						))}
					</Grid>
				</Container>
			</Box>
		</>
	)
}

export default App
