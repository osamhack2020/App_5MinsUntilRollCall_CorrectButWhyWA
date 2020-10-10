import React from 'react';

import {
	View,
	Image,
	StyleSheet,
} from 'react-native';

import {
	Button
} from 'react-native-paper';
import {
	NavigationContainer
} from '@react-navigation/native';
import {
	createStackNavigator
} from '@react-navigation/stack';

const MainPage = ({ navigation }) => {
	return (
		<View style={styles.container}>
			<Button style={styles.button} mode="contained"
				labelStyle={styles.buttontext}
				onPress={() => navigation.navigate('QRPage')}>
				Show QR
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