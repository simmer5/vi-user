import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import userService from '../services/users'

import UserCard from './UserCard'
import EditUserModal from './EditUserModal'
import AddUserModal from './AddUserModal'

const VismaUsers = () => {
	const [users, setUsers] = useState([])
	const [openEditModal, setOpenEditModal] = useState(false)
	const [openAddUserModal, setOpenAddUserModal] = useState(false)
	const [userId, setUserId] = useState('')
	// === EDIT MODAL STATE =====
	const [updatedFullName, setUpdatedFullName] = useState('')
	const [updatedEmail, setUpdatedEmail] = useState('')
	const [updatedCity, setUpdatedCity] = useState('')
	const [updatedHouseNr, setUpdatedHouseNr] = useState('')
	const [updatedStreet, setUpdatedStreet] = useState('')
	const [updatedZip, setUpdatedZip] = useState('')

	useEffect(() => {
		userService.getAll().then(initialContacts => {
			setUsers(initialContacts)
		})
	}, [])

	const handelDeleteBtnClick = id => {
		console.log('Delete Klikas veikia', id)
		if (window.confirm('Do you realy want to delete user?')) {
			userService.deleteUser(id).then(() => {
				setUsers(users.filter(user => user.id !== id))
			})
		}
	}

	const handelOpenEditModal = id => {
		console.log('Editmodal atsidaro ', id)
		setUserId(id)
		setOpenEditModal(true)
	}
	// ======== EDIT USER ===============
	const onChangeSave = userId => {
		const newUpdatedUser = {
			fullName: updatedFullName,
			email: updatedEmail,
			address: {
				city: updatedCity,
				street: updatedStreet,
				houseNr: updatedHouseNr,
				zip: updatedZip,
			},
		}
		console.log('newUpdatedUser', newUpdatedUser)
		userService
			.update(userId, newUpdatedUser)
			.then(returnedUser => {
				setUsers(users.map(user => (user.id !== userId ? user : returnedUser)))
			})
			.catch(error => {
				alert('Error Alert!', error)
			})
		setOpenEditModal(false)
		alert('User updated.')
	}
	// ================ SAVE NEW USER ==============
	const onNewUserSave = () => {
		const newUser = {
			fullName: updatedFullName,
			email: updatedEmail,
			address: {
				city: updatedCity,
				street: updatedStreet,
				houseNr: updatedHouseNr,
				zip: updatedZip,
			},
		}

		userService
			.create(newUser)
			.then(returnedUser => {
				setUsers(users.concat(returnedUser))
			})
			.catch(error => {
				alert('Error Alert!', error)
			})

		alert('User updated.')
		setOpenAddUserModal(false)
	}

	return (
		<>
			<Grid container spacing={2} justify='flex-end'>
				<Grid item>
					<Button
						onClick={() => {
							setOpenAddUserModal(true)
						}}
						style={{ margin: '1rem' }}
						variant='contained'
						color='primary'
					>
						Add New User
					</Button>
				</Grid>
			</Grid>
			<Grid container spacing={4}>
				{users.map((user, idx) => (
					<Grid key={idx} item xs={12} sm={6} md={4} lg={4}>
						<UserCard
							userData={user}
							handelDeleteBtnClick={() => handelDeleteBtnClick(user.id)}
							handelEditBtnClick={() => handelOpenEditModal(user.id)}
						/>
					</Grid>
				))}
			</Grid>
			<EditUserModal
				openModal={openEditModal}
				handelCloseEditModal={() => {
					setUserId('')
					setOpenEditModal(false)
				}}
				onFullNameChange={e => setUpdatedFullName(e.target.value)}
				onEmailChange={e => setUpdatedEmail(e.target.value)}
				onCityChange={e => setUpdatedCity(e.target.value)}
				onStreetChange={e => setUpdatedStreet(e.target.value)}
				onHouseNrChange={e => setUpdatedHouseNr(e.target.value)}
				onZipChange={e => setUpdatedZip(e.target.value)}
				onChangeSave={() => onChangeSave(userId)}
			/>
			<AddUserModal
				openAddUserModal={openAddUserModal}
				handelCloseAddUserModal={() => setOpenAddUserModal(false)}
				onFullNameChange={e => setUpdatedFullName(e.target.value)}
				onEmailChange={e => setUpdatedEmail(e.target.value)}
				onCityChange={e => setUpdatedCity(e.target.value)}
				onStreetChange={e => setUpdatedStreet(e.target.value)}
				onHouseNrChange={e => setUpdatedHouseNr(e.target.value)}
				onZipChange={e => setUpdatedZip(e.target.value)}
				onNewUserSave={onNewUserSave}
			/>
		</>
	)
}

export default VismaUsers
