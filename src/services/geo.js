import axios from 'axios'

const baseUrl = 'http://api.positionstack.com/v1/forward'

export const getGeoData = async query => {
	const params = {
		access_key: `${process.env.REACT_APP_GEO_KEY}`,
		query: query,
	}
	console.log('Cia pduotas queris', query)
	const request = axios.get(baseUrl, { params })
	const response = await request

	return response.data
}
