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

function dateToString(date) {
	return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
}
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

function DropDownMenu({ date, isMN, status, callback }) {
	const [visible, setVisible] = useState(false);

	return (
		<Menu visible={visible}
			onDismiss={() => {setVisible(false)}}
			anchor={<Button style={{marginLeft: 8}} contentStyle={styles.picker} mode="outlined" onPress={() => {setVisible(true)}}>{status}</Button>}>
			{["출석", "근무", "휴가"].map((option) => 
				<Menu.Item onPress={() => {setVisible(false); callback(date, isMN, option);}} title={option} />
			)}
		</Menu>
	);
}

export default function InputSchedulePage({ navigation, route }) {
	const { saveSchedule, getSchedule } = route.params;
	const [year, setYear] = useState(new Date().getFullYear());
	const [month, setMonth] = useState(new Date().getMonth());
	const [dates, setDates] = useState([]);
	const [changed, setChanged] = useState([]);

	var flatListRef;
  
	useEffect(() => {
		setDates(getDates(year, month));
	}, [year, month]);

	useEffect(() => {
		getSchedule().then((data) => {
			console.log("data: " + JSON.stringify(data));
			setChanged(data);
		});
	}, []);

	function callback(date, isMN, option) {
		console.log("dateCallback: " + date);
		console.log("isMNCallback: " + isMN);
		console.log("optionCallback: " + option);
		setChanged(prev => {
			var curr = [...prev];
			const idx = curr.findIndex(element => (element.date === dateToString(date) && element.isMN === isMN));
			curr.splice(idx, (idx == -1) ? 0 : 1, {date: dateToString(date), isMN: isMN, status: option});
			saveSchedule(curr);
			return curr;
		});
		console.log("changed: " + JSON.stringify(changed));
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
				renderItem={({item, index}) => {
					const isMN = index % 2 == 0 ? 'N' : 'M';
					const element = changed.find(element => (element.date === dateToString(item) && element.isMN === isMN));
					return (<View style={styles.item}>
								<Avatar.Text style={styles.badge} size={30} label={item.getDate()} />
								<DropDownMenu style={styles.dropdown} date={item} isMN={isMN} status={
										element ? element.status : "출석"
									} callback={callback.bind(this)} />
							</View>);
       			 }}
     			extraData={changed}
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