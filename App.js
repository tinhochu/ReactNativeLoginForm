import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
	componentWillMount() {
		firebase.initializeApp({
			apiKey: 'AIzaSyDu0yMzaBdSsdkSvdP8_uUCSJu0-23RWCc',
			authDomain: 'auth-ea7da.firebaseapp.com',
			databaseURL: 'https://auth-ea7da.firebaseio.com',
			projectId: 'auth-ea7da',
			storageBucket: 'auth-ea7da.appspot.com',
			messagingSenderId: '364987926600'
		});
	}

	render() {
		return (
			<View>
				<Header headerText={'Authentication'} />
				<LoginForm />
			</View>
		);
	}
}

export default App;
