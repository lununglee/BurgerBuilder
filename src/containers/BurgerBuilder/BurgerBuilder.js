import React, { Component } from 'react'
import Axios from '../../axios'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
	bacon: 0.7,
	cheese: 0.4,
	salad: 0.5,
	meat: 1.3
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4.00,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		Axios.get('https://burger-builder-3000.firebaseio.com/ingredients.json')
			.then(response => {
				this.setState({ingredients: response.data})
			})
			.catch(error => {
				this.setState({error: true})
			})
	}

	addIngredientHandler = (type) => {
		const updatedCount = this.state.ingredients[type] + 1
		const updatedIngredient = {
			...this.state.ingredients
		}
		updatedIngredient[type] = updatedCount
		const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type]
		this.setState({ingredients: updatedIngredient, totalPrice: updatedPrice})
		this.updatePurchaseState(updatedIngredient)
	}

	removeIngredientHandler = (type) => {
		if (this.state.ingredients[type] <= 0)
			return
		const updatedCount = this.state.ingredients[type] - 1
		const updatedIngredient = {
			...this.state.ingredients
		}
		updatedIngredient[type] = updatedCount
		const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type]
		this.setState({ingredients: updatedIngredient, totalPrice: updatedPrice})
		this.updatePurchaseState(updatedIngredient)
	}

	updatePurchaseState = (updatedIngredient) => {
		const sum = Object.keys(updatedIngredient)
			.map(igKey => {
				return updatedIngredient[igKey]
			})
			.reduce((sum, el) => {
				return sum + el
			}, 0)
		this.setState({purchasable: sum > 0})
	}

	purchaseHandler = () => {
		this.setState({purchasing: true})
	}

	purchaseCancelHandler = () => {
		this.setState({purchasing: false})
	}

	purchaseContinueHandler = () => {
		// this.setState({loading: true})
		// // alert("You continued!")
		// const order = {
		// 	ingredients: this.state.ingredients,
		// 	price: this.state.totalPrice,
		// 	customerData: {
		// 		firstName: "Rebecca",
		// 		lastName: "Storm",
		// 		street: "1234 College Ln",
		// 		city: "Lalaland",
		// 		postal: "55555",
		// 		country: "Cloud City",
		// 		email: "rebecca.storm@testmail.com"
		// 	},
		// 	deliverMethod: "urgent"
		// }
		// Axios.post('/orders.json', order)
		// 	.then(response => {this.setState({loading: false, purchasing: false})})
		// 	.catch(error => {this.setState({loading: false, purchasing: false})})
		const queryParams = []
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}
		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
	}

	render () {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null

		let burger = this.state.error ? <p>Ingredients can't be laoded</p> : <Spinner />
		if (this.state.ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BuildControls
						addIngredient={this.addIngredientHandler}
						removeIngredient={this.removeIngredientHandler}
						disabled={disabledInfo}
						price={this.state.totalPrice} 
						purchasable={this.state.purchasable}
						order={this.purchaseHandler}/>
				</Aux>
			)
			orderSummary = <OrderSummary
			ingredients={this.state.ingredients}
			purchaseCancel={this.purchaseCancelHandler}
			purchaseContinue={this.purchaseContinueHandler}
			totalPrice={this.state.totalPrice}/>
		}
		if (this.state.loading) {
			orderSummary = <Spinner />
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					{orderSummary}
				</Modal>
				{burger}
			</Aux>
		)
	}
}

export default withErrorHandler(BurgerBuilder, Axios)
