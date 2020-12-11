import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

import userService from '../services/users'

const EditUserModal = ({ userData }) => {
	const [open, setOpen] = useState(false)
	const [data, setData] = useState({})
	const [updatedFullName, setUpdatedFullName] = useState('')
	const [updatedEmail, setUpdatedEmail] = useState('')
	const [updatedCity, setUpdatedCity] = useState('')
	const [updatedHouseNr, setUpdatedHouseNr] = useState('')
	const [updatedStreet, setUpdatedStreet] = useState('')
	const [updatedZip, setUpdatedZip] = useState('')

	useEffect(() => {
		setData(userData.userData)
	}, [userData.userData])

	console.log('Data is User Modal', data)

	const handleClickOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}

	const onFullNameChange = e => {
		setUpdatedFullName(e.target.value)
	}
	const onEmailChange = e => {
		setUpdatedEmail(e.target.value)
	}
	const onCityChange = e => {
		setUpdatedCity(e.target.value)
	}
	const onHouseNrChange = e => {
		setUpdatedHouseNr(e.target.value)
	}
	const onStreetChange = e => {
		setUpdatedStreet(e.target.value)
	}
	const onZipChange = e => {
		setUpdatedZip(e.target.value)
	}
	const onChangeSave = () => {
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

		userService.update(data.id, newUpdatedUser)
		console.log('Useris atnaujintas')
	}

	return (
		<>
			<Button variant='outlined' color='primary' onClick={handleClickOpen}>
				Edit
			</Button>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>Update User</DialogTitle>
				<DialogContent>
					<TextField
						name='fullName'
						required
						margin='dense'
						label='Full name'
						type='text'
						fullWidth
						value={updatedFullName}
						onChange={e => onFullNameChange(e)}
					/>
					<TextField
						name='email'
						required
						margin='dense'
						id='email'
						label='Email'
						type='email'
						fullWidth
						value={updatedEmail}
						onChange={e => onEmailChange(e)}
					/>
					<TextField
						name='city'
						required
						margin='dense'
						id='city'
						label='City'
						type='text'
						fullWidth
						value={updatedCity}
						onChange={e => onCityChange(e)}
					/>
					<TextField
						name='street'
						required
						margin='dense'
						id='name'
						label='Street'
						type='text'
						fullWidth
						value={updatedHouseNr}
						onChange={e => onHouseNrChange(e)}
					/>
					<TextField
						name='houseNr'
						required
						margin='dense'
						id='houseNr'
						label='House number'
						type='text'
						fullWidth
						value={updatedStreet}
						onChange={e => onStreetChange(e)}
					/>
					<TextField
						name='zip'
						required
						margin='dense'
						id='zip'
						label='Zip'
						type='text'
						fullWidth
						value={updatedZip}
						onChange={e => onZipChange(e)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color='primary'>
						Cancel
					</Button>
					<Button onClick={onChangeSave} color='primary'>
						Save
					</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}
export default EditUserModal
