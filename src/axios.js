import Axios from 'axios'

const instance = Axios.create({
	baseURL: 'https://burger-builder-3000.firebaseio.com/'
})

export default instance
