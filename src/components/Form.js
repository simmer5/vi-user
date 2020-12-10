import React, { useState, useRef, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import Input from './components/Input'

const Form = () => {
	const [number, setNumber] = useState('')
	const [errAlert, setErrAlert] = useState(false)
	const [msgCode, setMsgCode] = useState(null)
	const inputRef = useRef(null)

	useEffect(() => {
		inputRef.current.focus()
	}, [])

	const onInputChange = e => {
		setNumber(e.target.value)

		return e.target.value.length === 0
			? setErrAlert(false) || setMsgCode(null)
			: null
	}
	const clearInput = () => {
		inputRef.current.value = ''
	}
	const handelFormSubmit = e => {
		e.preventDefault()
	}

	return (
		<Box component='div'>
			<Container maxWidth='sm'>
				<Grid container spacing={1}>
					<Paper
						variant='outlined'
						style={{ width: '100%', margin: 10, padding: 10 }}
					>
						<Grid item xs={12} sm={12} md={12}>
							<form onSubmit={handelFormSubmit}>
								<Input
									inputRef={inputRef}
									label='FØDSELSNUMMER'
									handelChange={onInputChange}
									errAlert={errAlert}
									msgCode={msgCode}
								/>
							</form>
						</Grid>
					</Paper>
				</Grid>
			</Container>
		</Box>
	)
}

export default Form
