import React, { Component } from 'react'

import Aux from '../../hoc/Aux'

import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
	bacon: 0.7,
	cheese: 0.4,
	salad: 0.5,
	meat: 1.3
}

class BurgerBuilder extends Component {
	state = {
		ingredients: {
			bacon: 0,
			cheese: 0,
			salad: 0,
			meat: 0
		},
		totalPrice: 4.00,
		purchasable: false,
		purchasing: false
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
		alert("You continued!")
	}

	render () {
		const disabledInfo = {
			...this.state.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}
		return (
			<Aux>
				<Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
					<OrderSummary
						ingredients={this.state.ingredients}
						purchaseCancel={this.purchaseCancelHandler}
						purchaseContinue={this.purchaseContinueHandler}
						totalPrice={this.state.totalPrice}/>
				</Modal>
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
	}
}

export default BurgerBuilder
