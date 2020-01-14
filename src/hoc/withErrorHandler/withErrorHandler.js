import React, { Component } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Aux/Aux'

import * as Sentry from '@sentry/browser'

const withErrorHandler = (WrappedComponent, Axios) => {
	return class extends Component {
		state = {
			error: null,
			eventId: null
		}

		componentWillMount () {
			this.reqInterceptor = Axios.interceptors.request.use(req => {
				this.setState({error: null})
				return req
			})
			this.resInterceptor = Axios.interceptors.response.use(res => res , error => {
				this.setState({error: error})
			})	
		}

		componentWillUnmount () {
			Axios.interceptors.request.eject(this.reqInterceptor)
			Axios.interceptors.request.eject(this.resInterceptor)
		}

		errorConfirmedHandler = () => {
			this.setState({error: null})
		}

		static getDerivedStateFromError() {
			return { hasError: true };
		}
	  
		componentDidCatch(error, errorInfo) {
			Sentry.withScope((scope) => {
				scope.setExtras(errorInfo);
				const eventId = Sentry.captureException(error);
				this.setState({eventId});
			});
		}

		render () {
			return (
				<Aux>
					<Modal show={this.state.error} modalClosed={this.errorConfirmedHandler}>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<button onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}>Report feedback</button>
					<WrappedComponent {...this.props}/>
				</Aux>
			)
		}
	}
}

export default withErrorHandler
