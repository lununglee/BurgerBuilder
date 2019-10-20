import React, { Component } from 'react'
import Axios from '../../../axios'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'
import Input from '../../../components/Forms/Input/Input'
import { readFileSync } from 'fs'

class ContactData extends Component {
	state = {
		orderForm: {
			firstName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your first name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			lastName: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Your last name'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			street: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Street'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			city: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'City'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			postal: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Postal Code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5,
					maxLength: 5
				},
				valid: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Your email'
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			},
			deliverMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{value: 'fastest', displayValue: 'Fastest'},
						{value: 'cheapest', displayValue: 'Cheapest'}
					]
				},
				value: '',
				validation: {
					required: true
				},
				valid: false
			}
		},
		loading: false,
	}

	orderHandler = (event) => {
		event.preventDefault()
		this.setState({loading: true})
		const formData = {}
		for (let formElementIdentifier in this.state.orderForm) {
			formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value
		}
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData: formData
		}
		Axios.post('/orders.json', order)
			.then(response => {
				this.setState({loading: false})
				this.props.history.push('/')
			})
			.catch(error => {this.setState({loading: false})})
	}

	inputChangeHandler = (event, inputIdentifier) => {
		const updatedOrderForm = {...this.state.orderForm}
		const updatedFormElement = {...updatedOrderForm[inputIdentifier]}
		updatedFormElement.value = event.target.value
		updatedFormElement.valid = this.checkValidation(updatedFormElement.value, updatedFormElement.validation)
		updatedOrderForm[inputIdentifier] = updatedFormElement
		this.setState({orderForm: updatedOrderForm})
	}

	checkValidation = (value, rules) => {
		let isValid = false
		if (rules.required) {
			isValid = value.trim() !== ''
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength
		}
		return isValid
	}

	render () {
		const formElementsArray = []
		for (let key in this.state.orderForm) {
			formElementsArray.push({
				id: key,
				config: this.state.orderForm[key]
			})
		}
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElementsArray.map(formElement => (
					<Input
						elementType={formElement.config.elementType}
						elementConfig={formElement.config.elementConfig}
						value={formElement.config.value}
						key={formElement.id}
						change={(event) => this.inputChangeHandler(event, formElement.id)}/>
				))}
				<Button btnType="Success">ORDER</Button>
			</form>
		)
		if (this.state.loading) {
			form = <Spinner />
		}
		return (
			<div className={styles.ContactData}>
				<h4>Enter your contact data</h4>
				{form}
			</div>
		)
	}
}

export default ContactData
