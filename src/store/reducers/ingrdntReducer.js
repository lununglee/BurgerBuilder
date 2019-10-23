import * as actionTypes from '../actions'

const initialState = {
	ingredients: {
		bacon: 0,
		cheese: 0,
		salad: 0,
		meat: 0
	},
	totalPrice: 4
}

const ingrdntReducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.ADD_INGRDIENT:
			return {
				...state,
				[action.ingredientName]: state.ingredients[action.ingredientName] + 1
			}
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				[action.ingredientName]: state.ingredients[action.ingredientName] - 1
		}
		default:
			return state
	}
}

export default ingrdntReducer
