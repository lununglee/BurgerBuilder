import React from 'react'

import styles from './SideDrawer.module.css'

import Aux from '../../../hoc/Aux'
import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'
import Backdrop from '../../UI/Backdrop/Backdrop'

const sideDrawer = (props) => {
	let attachedStyles = [styles.SideDrawer, styles.Close]
	if (props.open) {
		attachedStyles = [styles.SideDrawer, styles.Open]
	}
	return (
		<Aux>
			<Backdrop show={props.open} click={props.close}/>
			<div className={attachedStyles.join(' ')}>
				<div className={styles.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	)
}

export default sideDrawer
