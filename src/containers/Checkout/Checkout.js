// REACT PACKAGES
import React, { Component } from 'react'
import { Route } from 'react-router-dom'

// REDUX PACKAGES
import { connect } from 'react-redux'

// LOCAL IMPORTS
import ContactData from './ContactData/ContactData'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'

class Checkout extends Component {

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
					ingredients={this.props._ingredients}
					checkoutCancel={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler}/>
				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData}/>)}/>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		_ingredients: state.ing.ingredients,
		_price: state.ing.price
	}
}

export default connect(mapStateToProps)(Checkout)
