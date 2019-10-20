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
				value: '',
				validation: {
					required: true
				},
				valid: false,
				touched: false
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
				valid: false,
				touched: false
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
				valid: false,
				touched: false
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
				valid: false,
				touched: false
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
				valid: false,
				touched: false
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
				valid: false,
				touched: false
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
				valid: false,
				touched: false
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
				valid: true
			}
		},
		loading: false,	
		formIsValid: false
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
		updatedFormElement.touched = true
		updatedOrderForm[inputIdentifier] = updatedFormElement
		let formIsValid = true
		for (inputIdentifier in updatedOrderForm) {
			formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid
		}
		console.log(formIsValid)
		this.setState({orderForm: updatedOrderForm, formIsValid: formIsValid})
	}

	checkValidation = (value, rules) => {
		let isValid = true
		if (rules.required) {
			isValid = value.trim() !== '' && isValid
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid
		}
		if (rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid
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
						change={(event) => this.inputChangeHandler(event, formElement.id)}
						invalid={!formElement.config.valid}
						shouldValidate={formElement.config.validation}
						touched={formElement.config.touched}/>
				))}
				<Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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
