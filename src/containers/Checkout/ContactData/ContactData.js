import React, { Component } from 'react'

import styles from './ContactData.module.css'

import Button from '../../../components/UI/Button/Button'

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
		}
	}
	render () {
		return (
			<div className={styles.ContactData}>
				<h4>Enter your contact data</h4>
				<form>
					<input className={styles.Input} type="text" name="firstName" placeholder="Your First Name" />
					<input className={styles.Input} type="text" name="lastName" placeholder="Your Last Name" />
					<input className={styles.Input} type="text" name="email" placeholder="Your Email" />
					<input className={styles.Input} type="text" name="street" placeholder="Your Street" />
					<input className={styles.Input} type="text" name="city" placeholder="Your City" />
					<input className={styles.Input} type="text" name="postal" placeholder="Your Postal Code" />
					<input className={styles.Input} type="text" name="country" placeholder="Your Country" />
				</form>
				<Button btnType="Success">ORDER</Button>
			</div>
		)
	}
}

export default ContactData
