import React from 'react'

import styles from './Order.module.css'

const order = (props) => {
	const ingredients = []
	for (let ingredientName in props.ingredients) {
		ingredients.push({
			name: ingredientName,
			amount: props.ingredients[ingredientName]
		})
	}

	const ingredientOutput = ingredients.map(igKey => {
		return <span style={{
			textTransform: 'capitalize',
			display: 'inline-block',
			margin: '0 8px',
			border: '1px solid #ccc',
			padding: '5px'
		}}>{igKey.name} ({igKey.amount})</span>
	})

	return (
		<div className={styles.Order}>
			<p>Ingredients: {ingredientOutput}</p>
			<p>Price: <strong>{props.price.toFixed(2)}</strong></p>
		</div>
	)
}

export default order