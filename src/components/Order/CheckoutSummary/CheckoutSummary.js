import React from 'react'

import styles from './CheckoutSummary.module.css'

import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'

const checkoutSummary = (props) => {
	return (
		<div className={styles.CheckoutSummary}>
			<h1>Hope it tastes good</h1>
			<div style={{width: '100%', margin: 'auto'}}>
				<Burger ingredients={props.ingredients}/>
			</div>
			<Button
				btnType="Danger"
				click>CANCEL</Button>
			<Button
				btnType="Success"
				click>CONTINUE</Button>
		</div>
	)
}

export default checkoutSummary