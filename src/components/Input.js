import React from 'react'
import PropTypes from 'prop-types'

import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

const InputMui = ({
	placeholder,
	number,
	handelChange,
	label,
	errAlert,
	msgCode,
	inputRef,
}) => {
	const errMsg = [
		'Fødselsnummer er godkjent.',
		'Fødselsnummer mangler siffer.',
		'Feil fødselsnummer.',
	]
	const inputProps = {
		maxLength: 11,
		value: number,
	}
	return (
		<>
			<Typography component='label'>{label}</Typography>
			<TextField
				inputRef={inputRef}
				type='text'
				inputProps={inputProps}
				onChange={handelChange}
				placeholder={placeholder}
				variant='outlined'
				fullWidth
				margin='dense'
				error={errAlert}
				helperText={errMsg[msgCode]}
			/>
		</>
	)
}
InputMui.propTypes = {
	//a number from input
	number: PropTypes.string,
	//function to track changes on input
	handelChange: PropTypes.func,
	//input label
	label: PropTypes.string,
	//sets error UI
	errAlert: PropTypes.bool,
	//code for message
	msgCode: PropTypes.number,
	//ref for input
	inputRef: PropTypes.object,
}
export default InputMui
