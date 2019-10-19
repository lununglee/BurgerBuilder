import React, { Component } from 'react'
import Axios from '../../../axios'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/Forms/Input/Input'

class ContactData extends Component {
	state = {
		orderForm: {
			firstName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your first name'
				},
				value: ''
			},
			lastName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your last name'
				},
				value: ''
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: ''
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'City'
				},
				value: ''
			},
			postal: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code'
				},
				value: ''
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: ''
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email'
				},
				value: ''
			},
			deliverMethod: {
				elementType: 'select',
				elementConfig: {
					options: [{value: 'fastest', displayValue: 'Fastest'}],
					options: [{value: 'cheapest', displayValue: 'Cheapest'}]
				},
				value: ''
			}
		},
		loading: false,
	}

	orderHandler = (event) => {
		event.preventDefault()
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price
		}
		Axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false})
				this.props.history.push('/')
			})
			.catch(error => {this.setState({loading: false})})
	}

	render () {
		let form = (
			<form>
					<Input inputElement="..." elementConfig="..." value="..." />
					<Input inputtype="input" type="text" name="lastName" placeholder="Your Last Name" />
					<Input inputtype="input" type="email" name="email" placeholder="Your Email" />
					<Input inputtype="input" type="text" name="street" placeholder="Your Street" />
					<Input inputtype="input" type="text" name="city" placeholder="Your City" />
					<Input inputtype="input" type="text" name="postal" placeholder="Your Postal Code" />
					<Input inputtype="input" type="options" name="country" placeholder="Your Country" />
				</form>
		)
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={styles.ContactData}>
				<h4>Enter your contact data</h4>
					{form}
				<Button btnType="Success" click={this.orderHandler}>ORDER</Button>
			</div>
		)
	}
}

export default ContactData
