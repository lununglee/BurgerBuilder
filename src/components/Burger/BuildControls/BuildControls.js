import React from 'react'

import styles from './BuildControls.module.css'

import BuildControl from './BuildControl/BuildControl'

const controls = [
	{label: "Bacon", type: "bacon"},
	{label: "Cheese", type: "cheese"},
	{label: "Salad", type: "salad"},
	{label: "Meat", type: "meat"}
]

const buildControls = (props) => {
	return (
		<div className={styles.BuildControls}>
			<p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
			{controls.map(ctrl => {
				return <BuildControl
						key={ctrl.label}
						label={ctrl.label}
						add={() => props.addIngredient(ctrl.type)} 
						remove={() => props.removeIngredient(ctrl.type)}
						disabled={props.disabled[ctrl.type]}/>
			})}
			<button 
				className={styles.OrderButton}
				disabled={!props.purchasable}
				onClick={props.order}>ORDER NOW</button>
		</div>
	)
}

export default buildControls
