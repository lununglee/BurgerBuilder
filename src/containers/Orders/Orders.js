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
				this.setState({loading: false, orders: fetchOrders})
			})
			.catch(error => {
				this.setState({loading: false})
			})
	}

	render () {
		return (
			<div>
				{this.state.orders.map(order => (
					<Order
						key={order.id}
						ingredients={order.ingredients}
						price={+order.price}/>
				))}
			</div>
		)
	}
}

export default withErrorHandler(Orders, Axios)
