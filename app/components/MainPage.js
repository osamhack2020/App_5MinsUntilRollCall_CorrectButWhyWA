import React, { useState } from 'react';

import {
	View,
	Image,
	StyleSheet,
} from 'react-native';

import {
	Button,
	TextInput
} from 'react-native-paper';
import {
	NavigationContainer
} from '@react-navigation/native';
import {
	createStackNavigator
} from '@react-navigation/stack';

import ReactNativeBiometrics from 'react-native-biometrics';

const MainPage = ({ navigation }) => {
	const [milID, setMilID] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.holder}>
				<TextInput style={styles.textinput}
					label="Military ID"
					value={milID}
					onChangeText={milID => setMilID(milID)}
					/>
			</View>
			<Button style={styles.button} mode="contained"
				labelStyle={styles.buttontext}
				onPress={() => {
					ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
						.then((resultObject) => {
							const { success } = resultObject;

							if (success) {
								navigation.navigate('QRPage', {
									milID: milID,
									submit: true
								});
							} else {
								console.log('cancelled');
							}
						})
						.catch(() => {
							console.log('biometrics failed');
						});
				}}>
				Submit Phone
			</Button>
			<Button style={styles.button} mode="contained"
				labelStyle={styles.buttontext}
				onPress={() => {
					ReactNativeBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
						.then((resultObject) => {
							const { success } = resultObject;

							if (success) {
								navigation.navigate('QRPage', {
									milID: milID,
									submit: false
								});
							} else {
								console.log('cancelled');
							}
						})
						.catch(() => {
							console.log('biometrics failed');
						});
				}}>
				Get Phone
			</Button>
			<Button style={styles.button} mode="contained"
				labelStyle={styles.buttontext}
				onPress={() => navigation.navigate('SchedulePage')}>
				Input Schedule
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 24,
	},
	holder: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 24
	},
	textinput: {
		flex: 1
	},
	button: {
		width: '100%',
		padding: 4,
		margin: 8
	},
	buttontext: {
		fontSize: 16,
		fontStyle: 'bold',
	},
});

export default MainPage;