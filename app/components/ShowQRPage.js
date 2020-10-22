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
	const { uniqueId, getSchedule } = route.params;
	const [info, setInfo] = useState({
		id: uniqueId,
		time: new Date(),
		schedule: []
	});
	const [progress, setProgress] = useState(0);
	const [imageData, setImageData] = useState("");
	const maxProgress = 10;

	var qrRef;

	useEffect(() => {
		const progressId = setInterval(() => {
			setProgress(p => Math.min(maxProgress, p + 1));
		}, 1000);
		getSchedule().then((data) => {
			setInfo({id: uniqueId, time: new Date(), schedule: data});
		});

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
		if(progress == Math.floor(maxProgress / 2)) {
			qrRef.toDataURL((dataURL) => {
				console.log("dataURL: " + dataURL);
				setImageData(dataURL);
			});
		}
	}, [progress, navigation]);

	return (
		<View style={styles.container}>
			<View style={styles.holder}>
				<QRCode value={JSON.stringify(info)}
					size={256}
					color='black'
					backgroundColor='white'
					getRef={(ref) => {qrRef = ref;}} />
			</View>
			<Text style={styles.paragraph}>{JSON.stringify(info)}</Text>
			<Text style={styles.paragraph}>{"length: " + imageData.length + ", data: " + imageData.substring(0, 20)}</Text>
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