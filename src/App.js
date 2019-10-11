import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import Layout from './hoc/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from './containers/Checkout/Checkout'

class App extends Component {
	render () {
		return (
			<div className="App">
				<Layout>
					<Switch>
						<Route to="/checkout" component={Checkout}/>
						<Route to="/" exact component={BurgerBuilder}/>
					</Switch>
				</Layout>
			</div>
		)
	}
}

export default App;
