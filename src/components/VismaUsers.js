import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import userService from '../services/users'
import { getGeoData } from '../services/geo'

import UserCard from './UserCard'
import EditUserModal from './EditUserModal'
import AddUserModal from './AddUserModal'

const VismaUsers = () => {
	const [users, setUsers] = useState([])
	const [address, setAddress] = useState([])
	const [updatedUser, setUpdatedUser] = useState({
		fullName: '',
		email: '',
		lat: '',
		lng: '',
		address: {
			city: '',
			street: '',
			houseNr: '',
			zip: '',
		},
	})
	const [openEditModal, setOpenEditModal] = useState(false)
	const [openAddUserModal, setOpenAddUserModal] = useState(false)
	const [userId, setUserId] = useState('')

	// eslint-disable-next-line react-hooks/exhaustive-deps
	useEffect(async () => {
		const initialUsers = await userService.getAll()
		setUsers(initialUsers)
	}, [])

	const handelDeleteBtnClick = id => {
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
	const onChangeSave = (e, userId) => {
		e.preventDefault()

		console.log('newUpdatedUser', updatedUser)
		userService
			.update(userId, updatedUser)
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
	const onNewUserSave = async e => {
		e.preventDefault()
		const query = `${updatedUser.address.houseNr} ${updatedUser.address.street} ${updatedUser.address.city}`

		const returnedData = await getGeoData(query)

		const filteredObj = await returnedData.data.filter(
			data =>
				data.region.toLowerCase() === updatedUser.address.city.toLowerCase() &&
				data.number === updatedUser.address.houseNr
		)
		setUpdatedUser({
			...updatedUser,
			lat: filteredObj[0].latitude,
			lng: filteredObj[0].longitude,
		})

		userService
			.create(updatedUser)
			.then(console.log('CIA UPDATED USERIS', updatedUser))
			.then(returnedUser => {
				setUsers(users.concat(returnedUser))
			})
			.then(setOpenAddUserModal(false))
			.then(alert('New User Created.'))
			.catch(error => {
				alert('Error Alert!', error)
			})
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
				onFullNameChange={e =>
					setUpdatedUser({ ...updatedUser, fullName: e.target.value })
				}
				onEmailChange={e =>
					setUpdatedUser({ ...updatedUser, email: e.target.value })
				}
				onCityChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, city: e.target.value },
					})
				}
				onStreetChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, street: e.target.value },
					})
				}
				onHouseNrChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, houseNr: e.target.value },
					})
				}
				onZipChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, zip: e.target.value },
					})
				}
				onChangeSave={e => onChangeSave(e, userId)}
			/>
			<AddUserModal
				openAddUserModal={openAddUserModal}
				handelCloseAddUserModal={() => setOpenAddUserModal(false)}
				onFullNameChange={e =>
					setUpdatedUser({ ...updatedUser, fullName: e.target.value })
				}
				onEmailChange={e =>
					setUpdatedUser({ ...updatedUser, email: e.target.value })
				}
				onCityChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, city: e.target.value },
					})
				}
				onStreetChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, street: e.target.value },
					})
				}
				onHouseNrChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, houseNr: e.target.value },
					})
				}
				onZipChange={e =>
					setUpdatedUser({
						...updatedUser,
						address: { ...updatedUser.address, zip: e.target.value },
					})
				}
				onNewUserSave={e => onNewUserSave(e)}
				disabled={false}
			/>
		</>
	)
}

export default VismaUsers
