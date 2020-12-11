import React, { useState, useEffect } from 'react'

import Grid from '@material-ui/core/Grid'

import userService from '../services/users'

import UserCard from './UserCard'
import EditUserModal from './EditUserModal'

const VismaUsers = () => {
	const [users, setUsers] = useState([])
	const [openEditModal, setOpenEditModal] = useState(false)
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
	}

	return (
		<>
			<Grid container spacing={4}>
				{users.map((user, idx) => (
					<Grid key={idx} item xs={12} sm={6} md={4} lg={4}>
						<UserCard
							userData={user}
							handelDeleteBtnClick={() => handelDeleteBtnClick(user.id)}
							handelEditBtnClick={() => handelOpenEditModal(user.id)}
							onHouseNrChange={e => setUpdatedHouseNr(e.target.value)}
						/>
					</Grid>
				))}
			</Grid>
			<EditUserModal
				userId={userId}
				openModal={openEditModal}
				handelCloseEditModal={() => {
					setUserId('')
					setOpenEditModal(false)
				}}
				onFullNameChange={e => setUpdatedFullName(e.target.value)}
				onEmailChange={e => setUpdatedEmail(e.target.value)}
				onCityChange={e => setUpdatedCity(e.target.value)}
				onStreetChange={e => setUpdatedStreet(e.target.value)}
				onZipChange={e => setUpdatedZip(e.target.value)}
				onChangeSave={() => onChangeSave(userId)}
			/>
		</>
	)
}

export default VismaUsers
