import axios from 'axios'

const baseUrl = 'http://api.positionstack.com/v1/forward'

const getGeoData = async newObject => {
	const params = {
		access_key: 'API KEY',
		query: 'Greverudveien 14',
	}
	const request = axios.get(baseUrl, { params })
	const response = await request
	return response.data
}

export default getGeoData
