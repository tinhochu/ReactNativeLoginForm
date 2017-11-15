import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'firebase';
import { Header, Button, Spinner } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
	state = {
		loggedIn: null
	};

	componentWillMount() {
		firebase.initializeApp({
			apiKey: "AIzaSyDu0yMzaBdSsdkSvdP8_uUCSJu0-23RWCc",
			authDomain: "auth-ea7da.firebaseapp.com",
			databaseURL: "https://auth-ea7da.firebaseio.com",
			projectId: "auth-ea7da",
			storageBucket: "auth-ea7da.appspot.com",
			messagingSenderId: "364987926600"
		});

		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				this.setState({ loggedIn: true });
			} else {
				this.setState({ loggedIn: false });
			}
		});
	}


	renderContent() {
		switch (this.state.loggedIn) {
			case true:
				return (
					<Button onPress={() => firebase.auth().signOut()} >
						Log Out
					</Button>
				);
			case false:
				return <LoginForm />;
			default:
				return (
					<View style={{ marginTop: 50 }}>
						<Spinner size={'large'} />
					</View>
				);
		}
	}

	render() {
		return (
			<View>
				<Header headerText={'Authentication'} />
				{this.renderContent()}
			</View>
		);
	}
}

export default App;
