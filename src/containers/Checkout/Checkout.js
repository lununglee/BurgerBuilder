import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import ContactData from './ContactData/ContactData'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

	state = {
		ingredients: {
			bacon: 1,
			cheese: 1,
			salad: 1,
			meat: 1
		},
		confirmPurchase: null
	}

	componentDidMount () {
		const query = new URLSearchParams(this.props.location.search)
		const ingredients = {}
		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1]
		}
		this.setState({ingredients: ingredients})
	}

	checkoutCancelHandler = () => {
		this.setState({confirmPurchase: false})
		this.props.history.goBack()
	}

	checkoutContinueHandler = () => {
		this.setState({confirmPurchase: true})
		this.props.history.replace('/checkout/contact-data')
	}

	render () {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.state.ingredients}
					checkoutCancel={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler}/>
				<Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
			</div>
		)
	}
}

export default Checkout
