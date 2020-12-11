import React from 'react'
import './App.css'
import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
import VismaUsers from './components/VismaUsers'

function App() {
	return (
		<Box component='main'>
			<Container maxWidth='lg'>
				<VismaUsers />
			</Container>
		</Box>
	)
}

export default App
