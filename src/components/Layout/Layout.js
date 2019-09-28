import React from 'react';

import styles from './Layout.module.css'

import Aux from '../../hoc/Aux'
import Toolbar from '../Navigation/Toolbar/Toolbar'

const layout = (props) => {
	return (
		<Aux>
			<Toolbar />
			<div>Toolbar, SideDrawer, BackDrop</div>
			<main className={styles.Content}>
				{props.children}
			</main>
		</Aux>
	)
}

export default layout
