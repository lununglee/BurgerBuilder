import React, { Component } from 'react'
import Axios from '../../axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Order from '../../components/Order/Order'

class Orders extends Component {
	state = {
		orders: [],
		loading: true
	}
	componentDidMount() {
		Axios.get('/orders.json')
			.then(response => {
				const fetchOrders = []
				console.log(response.data)
				for (let key in response.data) {
					fetchOrders.push({
						...response.data[key],
						id: key
					})
				}
				this.setState({loading: false})
			})
			.catch(error => {
				this.setState({loading: false})
			})
	}

	render () {
		return (
			<div>
				<Order />
				<Order />
			</div>
		)
	}
}

export default withErrorHandler(Orders, Axios)
