// REDUX PACKAGES
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

// ROUTING PACKAGES
import { BrowserRouter } from 'react-router-dom'

// REDUX PACKAGES
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import ingredientReducer from './store/reducers/ingredientReducer'

const rootReducer = combineReducers({
	ing: ingredientReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>
)

ReactDOM.render( app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
