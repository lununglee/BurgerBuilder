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
import logger from 'redux-logger'
import { Provider } from 'react-redux'
import ingredientReducer from './store/reducers/ingredientReducer'

// SENTRY.IO
import * as Sentry from '@sentry/browser'
import ErrorBoundary from '../src/hoc/withErrorHandler/ErrorBoundary'

const rootReducer = combineReducers({
	ing: ingredientReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))

const app = (
	<Provider store={store}>
		<BrowserRouter>
			<ErrorBoundary>
				<App />
			</ErrorBoundary>
		</BrowserRouter>
	</Provider>
)

Sentry.init({ dsn: 'https://178500217b2442ff8755d3fccbbcdc2c@sentry.42.us.org/13',
	maxBreadcrumbs: 50,
	debug: true, 
});

ReactDOM.render( app, document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
