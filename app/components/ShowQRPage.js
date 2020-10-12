import React, { useState, useEffect } from 'react';

import {
	View,
	Text,
	StyleSheet,
} from 'react-native';

import {
	Button,
	ProgressBar
} from 'react-native-paper';

import QRCode from 'react-native-qrcode-svg';

const ShowQRPage = ({ navigation, route }) => {
	const { uniqueId } = route.params;
	const [info, setInfo] = useState({
		id: uniqueId,
		time: new Date(),
	});
	const [progress, setProgress] = useState(0);
	const maxProgress = 10;

	useEffect(() => {
		const progressId = setInterval(() => {
			setProgress(p => Math.min(maxProgress, p + 1));
		}, 1000);
		return () => {
			if(progressId) clearInterval(progressId);
		};
	}, []);

	useEffect(() => {
		if(progress == maxProgress) {
			setTimeout(() => {
				navigation.goBack();
			}, 1000);
		}
	}, [progress, navigation]);

	return (
		<View style={styles.container}>
			<View style={styles.holder}>
				<QRCode value={JSON.stringify(info)}
					size={256}
					color='black'
					backgroundColor='white' />
			</View>
			<Text style={styles.paragraph}>{JSON.stringify(info)}</Text>
			<ProgressBar style={styles.progressbar}
				progress={progress / maxProgress} />
			<View style={styles.holder}>
				<Text>{maxProgress - progress}초 남았습니다.</Text>
			</View>
			<Button style={styles.button} mode="contained"
				labelStyle={styles.buttontext}
				onPress={() => navigation.goBack()}>Back to Main</Button>
		</View>
	);
};

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
	progressbar: {
		marginTop: 16
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

export default ShowQRPage;