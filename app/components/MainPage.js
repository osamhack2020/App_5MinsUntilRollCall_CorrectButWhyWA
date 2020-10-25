import React, { useState } from 'react';

import {
	View,
	StyleSheet,
	Image,
	Text,
} from 'react-native';

import {
	Button,
	TextInput
} from 'react-native-paper';

import ReactNativeBiometrics from 'react-native-biometrics';

const MainPage = ({ navigation }) => {
	const [milID, setMilID] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.holder}>
				<Image source={require('../assets/logo.png')} />
			</View>
			<View style={styles.holder}>
				<Text style={styles.title}>전달, 전달, 점호 5분전</Text>
			</View>
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
		backgroundColor: '#c5d6fe',
	},
	image: {
	  width: 128,
	  height: 128,
	},
	holder: {
		flexDirection: 'row',
		alignItems: 'center',
		margin: 24
	},
	title: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#5f8cf5',
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