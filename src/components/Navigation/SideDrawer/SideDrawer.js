import React from 'react'

import styles from './SideDrawer.module.css'

import Logo from '../../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItems'

const sideDrawer = () => {
	return (
		<div className={styles.SideDrawer}>
			<Logo />
			<nav>
				<NavigationItems />
			</nav>
		</div>
	)
}

export default sideDrawer
