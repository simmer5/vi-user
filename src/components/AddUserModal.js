import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const AddUserModal = ({
	openAddUserModal,
	handelCloseAddUserModal,
	onFullNameChange,
	onEmailChange,
	onCityChange,
	onHouseNrChange,
	onStreetChange,
	onZipChange,
	onNewUserSave,
	updatedFullName,
	updatedEmail,
	updatedCity,
	updatedHouseNr,
	updatedStreet,
	updatedZip,
}) => {
	return (
		<>
			<Dialog open={openAddUserModal} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Add new user</DialogTitle>
				<form onSubmit={onNewUserSave}>
					<DialogContent>
						<TextField
							name='fullName'
							required
							margin='dense'
							label='Full name'
							type='text'
							fullWidth
							value={updatedFullName}
							onChange={onFullNameChange}
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
							onChange={onEmailChange}
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
							onChange={onCityChange}
						/>
						<TextField
							name='street'
							required
							margin='dense'
							id='name'
							label='Street'
							type='text'
							fullWidth
							value={updatedStreet}
							onChange={onStreetChange}
						/>
						<TextField
							name='houseNr'
							required
							margin='dense'
							id='houseNr'
							label='House number'
							type='text'
							fullWidth
							value={updatedHouseNr}
							onChange={onHouseNrChange}
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
							onChange={onZipChange}
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handelCloseAddUserModal} color='primary'>
							Cancel
						</Button>
						<Button type='submit' color='primary'>
							Add New User
						</Button>
					</DialogActions>
				</form>
			</Dialog>
		</>
	)
}
export default AddUserModal
