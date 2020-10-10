import React from 'react';

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import {
	Button
} from 'react-native-paper';

export default function ShowQRPage({ navigation, route }) {
	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>Welcome to ShowQRPage!!</Text>
			<Button style={styles.button} mode="contained"
        labelStyle={styles.buttontext}
        onPress={() => navigation.goBack()}>Back to Main</Button>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#ecf0f1',
		padding: 8,
	},
	paragraph: {
		margin: 24,
		fontSize: 18,
		fontWeight: 'bold',
		textAlign: 'center',
	},
  button: {
    width: '100%',
    padding: 4,
    marginTop: 24
  },
  buttontext: {
    fontSize: 16,
    fontStyle: 'bold',
  },
});