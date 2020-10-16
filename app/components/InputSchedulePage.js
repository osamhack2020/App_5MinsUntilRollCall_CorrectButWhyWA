import React, { useState, useEffect } from 'react';

import {
	View,
	Text,
	StyleSheet,
	FlatList,
} from 'react-native';

import {
	Button,
	IconButton,
	Avatar,
  	Menu
} from 'react-native-paper';

function getDates(year, month) {
	var date = new Date(year, month, 1);
	var dates = [new Date(year, month, 0), new Date(year, month, 1)];
	while(date.getMonth() == month) {
		dates.push(new Date(date));
		date.setDate(date.getDate() + 1);
    	dates.push(new Date(date));
	}
	return dates;
}

function DropDownMenu({ date, isDayNight, callback }) {
	const [visible, setVisible] = useState(false);
	const [status, setStatus] = useState("출석");

	return (
		<Menu visible={visible}
			onDismiss={() => {setVisible(false)}}
			anchor={<Button style={{marginLeft: 8}} contentStyle={styles.picker} mode="outlined" onPress={() => {setVisible(true)}}>{status}</Button>}>
			{["출석", "근무", "휴가"].map((option) => 
				<Menu.Item onPress={() => {setStatus(option); setVisible(false); callback(date, isDayNight, option);}} title={option} />
			)}
		</Menu>
	);
  }

export default function InputSchedulePage({ navigation, route }) {
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());
	const [dates, setDates] = useState([]);
	var flatListRef;
	const item = new Date(2020, 10 - 1, 1);

	useEffect(() => {
		setDates(getDates(year, month));
	}, [year, month]);

	function callback(date, isDayNight, option) {
		console.log("dateCallback: " + date);
		console.log("isDayNightCallback: " + isDayNight);
		console.log("optionCallback: " + option);
	}

	return (
		<View style={styles.container}>
			<View style={styles.monthcontroller}>
				<IconButton icon="chevron-left" onPress={() => {
					setMonth(month => month - 1);
					flatListRef.scrollToIndex({animated: false, index: 0, viewPosition: 0});
				}} />
				<Text style={styles.month}>{month + 1}월</Text>
				<IconButton icon="chevron-right" onPress={() => {
					setMonth(month => month + 1);
					flatListRef.scrollToIndex({animated: false, index: 0, viewPosition: 0});
				}} />
			</View>

			<View style={styles.header}>
				<Text style={styles.columnheader}>저녁</Text>
				<Text style={styles.columnheader}>아침</Text>
			</View>

			<FlatList style={styles.columns}
				ref={(ref) => {
					flatListRef = ref;
				}}
				data={dates}
				horizontal={false}
				renderItem={({item, index}) => 
					<View style={styles.item}>
						<Avatar.Text style={styles.badge} size={30} label={item.getDate()} />
						<DropDownMenu style={styles.dropdown} date={item} isDayNight={index % 2 == 0 ? 'day' : 'night'} callback={callback.bind(this)} />
					</View>
				}
				numColumns={2} />

			<Button style={styles.button} mode="contained"
				labelStyle={styles.buttontext}
				onPress={() => navigation.goBack()}>
				Back to Main
			</Button>
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
	button: {
		width: '100%',
		padding: 4,
		marginTop: 24
	},
	buttontext: {
		fontSize: 16,
		fontStyle: 'bold',
	},
	monthcontroller: {
		flexDirection: 'row',
		alignItems: 'stretch',
		justifyContent: 'space-between'
	},
	month: {
		fontSize: 18,
		fontStyle: 'bold',
	},
	columns: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'stretch',
	},
	item: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 24,
		marginHorizontal: 8,
	},
	badge: {
		flex: 0,
		alignSelf: 'center',
	},
	dropdown: {
		flex: 1,
    flexDirection: 'row',
		marginLeft: 8,
	},
	picker: {
		width: '100%',
		borderRadius: 4
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	columnheader: {
		fontSize: 18,
		fontStyle: 'bold'
	}
});