import React from 'react';

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import {
	Button
} from 'react-native-paper';

import QRCode from 'react-native-qrcode-svg';

export default function ShowQRPage({ navigation, route }) {
	const { uniqueId } = route.params;
	const info = {
		id: uniqueId,
		time: new Date(),
	};
	return (
		<View style={styles.container}>
			<View style={styles.holder}>
				<QRCode value={JSON.stringify(info)}
					size={256}
					color='black'
					backgroundColor='white' />
			</View>
			<Text style={styles.paragraph}>{JSON.stringify(info)}</Text>
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
		padding: 24,
	},
  holder: {
    alignItems: 'center',
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