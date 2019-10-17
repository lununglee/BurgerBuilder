import React, { Component } from 'react'
import Axios from '../../../axios'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'
import Spinner from '../../../components/UI/Spinner/Spinner'

class ContactData extends Component {
	state = {
		contactData: {
			firstName: '',
			lastName: '',
			email: '',
			address: {
				street: '',
				city: '',
				postal: '',
				country: ''	
			}
		},
		loading: false,
	}

	orderHandler = (event) => {
		event.preventDefault()
		this.setState({loading: true})
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			customerData: {
				firstName: "ASDASDASd",
				lastName: "Storm",
				street: "1234 College Ln",
				city: "Lalaland",
				postal: "55555",
				country: "Cloud City",
				email: "rebecca.storm@testmail.com"
			},
			deliverMethod: "urgent"
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
					<input className={styles.Input} type="text" name="firstName" placeholder="Your First Name" />
					<input className={styles.Input} type="text" name="lastName" placeholder="Your Last Name" />
					<input className={styles.Input} type="text" name="email" placeholder="Your Email" />
					<input className={styles.Input} type="text" name="street" placeholder="Your Street" />
					<input className={styles.Input} type="text" name="city" placeholder="Your City" />
					<input className={styles.Input} type="text" name="postal" placeholder="Your Postal Code" />
					<input className={styles.Input} type="text" name="country" placeholder="Your Country" />
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
