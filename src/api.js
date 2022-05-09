import axios from 'axios' 
import config from './config'
const getToken = () => window.localStorage.getItem('token')

export const appClient = (t) => {
	const client = axios.create({baseURL: config.appHost})
	client.defaults.headers.common['token'] = t
	return client
}

export const api = {
	getStaticFiles: (params, callback) => {
		appClient(getToken()).get('/data', {params})
			.then(r => callback(r.data))
			.catch(e => console.log("Error on /data:", e))
	},
	getLastUnits: (params, callback) => {
		appClient(getToken()).get('/data/db', {params})
			.then(r => callback(r.data))
			.catch(e => console.log("Error on /data/db:", e))
	},
}