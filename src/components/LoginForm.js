import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';

class LoginForm extends Component {
// eslint-disable-next-line no-undef
	state = {
		email: '',
		password: '',
		error: '',
		loading: false
	};

	onButtonPress() {
		const { email, password } = this.state;

		this.setState({ error: '', loading: true });

		firebase.auth().signInWithEmailAndPassword(email, password)
			// Success on Signing In
			.then(this.onLoginSuccess.bind(this))
			// If Fail: Try to create an account
			.catch(() => {
				firebase.auth().createUserWithEmailAndPassword(email, password)
					// Success on Signing up
					.then(this.onLoginSuccess.bind(this))
					// If Fails: Show the error message
					.catch(this.onLoginFail.bind(this));
			});
	}

	onLoginFail() {
		this.setState({
			error: 'Authentication Failed.',
			loading: false
		});
	}

	onLoginSuccess() {
		this.setState({
			email: '',
			password: '',
			error: '',
			loading: false
		});
	}

	renderButton() {
		const { loading } = this.state;

		if (loading) {
			return <Spinner size={'small'} />;
		}

		return (
			<Button onPress={this.onButtonPress.bind(this)}>
				Log in
			</Button>
		);
	}

	render() {
		return (
			<Card>
				<CardSection>
					<Input
						value={this.state.email}
						onChangeText={email => this.setState({ email })}
						label={'email'}
						placeholder={'your@email.com'}
					/>
				</CardSection>

				<CardSection>
					<Input
						value={this.state.password}
						onChangeText={password => this.setState({ password })}
						label={'Password'}
						placeholder={'password'}
						secureTextEntry
					/>
				</CardSection>

				<Text style={styles.errorTextStyle}>{this.state.error}</Text>

				<CardSection>
					{this.renderButton()}
				</CardSection>
			</Card>
		);
	}
}

const styles = {
	errorTextStyle: {
		fontSize: 20,
		alignSelf: 'center',
		color: 'red'
	}
};

export default LoginForm;
