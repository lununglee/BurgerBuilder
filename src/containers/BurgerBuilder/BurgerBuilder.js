import React, { Component } from 'react'
import Axios from '../../axios'
import { connect } from 'react-redux'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actionTypes from '../../store/actions'

const INGREDIENT_PRICES = {
	bacon: 0.7,
	cheese: 0.4,
	salad: 0.5,
	meat: 1.3
}

class BurgerBuilder extends Component {
	state = {
		totalPrice: 4.00,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	// componentDidMount () {
	// 	Axios.get('https://burger-builder-3000.firebaseio.com/ingredients.json')
	// 		.then(response => {
	// 			this.setState({ingredients: response.data})
	// 		})
	// 		.catch(error => {
	// 			this.setState({error: true})
	// 		})
	// }

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
		const queryParams = []
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}
		queryParams.push('price=' + this.state.totalPrice)
		const queryString = queryParams.join('&')
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		})
	}

	render () {
		const disabledInfo = {
			...this.props._ingredients
		}

		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null

		let burger = this.state.error ? <p>Ingredients can't be laoded</p> : <Spinner />
		if (this.props._ingredients) {
			burger = (
				<Aux>
					<Burger ingredients={this.props._ingredients}/>
					<BuildControls
						addIngredient={this.props.onAddIngredient}
						removeIngredient={this.props.onRemoveIngredient}
						disabled={disabledInfo}
						price={this.state.totalPrice} 
						purchasable={this.state.purchasable}
						order={this.purchaseHandler}/>
				</Aux>
			)
			orderSummary = <OrderSummary
				ingredients={this.props._ingredients}
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

const mapStateToProps = (state) => {
	return {
		_ingredients: state.ing.ingredients
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onAddIngredient: (ingName) => dispatch({type: actionTypes.ADD_INGRDIENT, ingredientName: ingName}),
		onRemoveIngredient: (ingName) => dispatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios))
