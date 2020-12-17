import axios from 'axios'

// const params = {
// 	access_key: '8fb2ec63ce2fa042e99409646a6e7078',
// 	query: 'Greverudveien 14',
// }
//const geoData = () => {
const baseUrl = 'http://api.positionstack.com/v1/forward'
const API_KEY = '8fb2ec63ce2fa042e99409646a6e7078'

export const getGeoData = async query => {
	const params = {
		access_key: API_KEY,
		query: query,
	}
	console.log('Cia pduotas queris', query)
	const request = axios.get(baseUrl, { params })
	const response = await request
	return response.data
}

//export default geoData
