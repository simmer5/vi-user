import React from 'react'
import Typography from '@material-ui/core/Typography'
import Input from './Input'

const AddUserForm = ({
	onFormSubmit,
	newName,
	handelNameChange,
	newNumber,
	handelNumberChange,
}) => {
	return (
		<form onSubmit={onFormSubmit}>
			<div>
				<Input label='Full name' placeholder='Name & Surname' />
				<Input label='Email' placeholder='your email' />
				<Typography style={{ padding: '30px 0' }} variant='h4'>
					Address
				</Typography>
				<Input label='City' placeholder='Vilnius' />
				<Input label='Street' placeholder='Gedimino pr.' />
				<Input label='House number' placeholder='number' />
				<Input label='Zip code' placeholder='01234' />
			</div>
			<div>
				<button type='submit'>Add</button>
			</div>
		</form>
	)
}

export default AddUserForm
