/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	ScrollView,
	View,
	Text,
	StatusBar
} from 'react-native';

import MainPage from './components/MainPage';
import ShowQRPage from './components/ShowQRPage';
import InputSchedulePage from './components/InputSchedulePage';

import {
	Button,
	DefaultTheme,
	Provider as PaperProvider,
} from 'react-native-paper';
import {
	NavigationContainer
} from '@react-navigation/native';
import {
	createStackNavigator
} from '@react-navigation/stack';

import {
	getUniqueId,
} from 'react-native-device-info';
import AsyncStorage from '@react-native-community/async-storage';

const Stack = createStackNavigator();

const theme = {
	...DefaultTheme,
	roundness: 2,
	colors: {
		...DefaultTheme.colors,
		primary: '#24355C'
	}
};

const App = () => {
	const uniqueId = getUniqueId();

	async function saveSchedule(schedule) {
		try {
			console.log("save: " + JSON.stringify(schedule));
			await AsyncStorage.setItem("@@schedule", JSON.stringify(schedule));
		} catch (e) {
			console.log("saveSchedule: (" + 	e.name + ") " + e.message);
		}
	}
	
	async function getSchedule() {
		try {
			const value = await AsyncStorage.getItem("@@schedule");
			var valid = true;
			const arr = JSON.parse(value, function(key, val) {
				return val;
			});
			if (Array.isArray(arr)) {
				for(const each of arr) {
					if(!(each.hasOwnProperty('date') && each.hasOwnProperty('isMN') && each.hasOwnProperty('status'))) {
						valid = false;
					}
				}
			}
			else {
				valid = false;
			}
			console.log("valid: " + valid);
			console.log("value: " + value);
			if(valid) return arr;
			else return [];
		} catch (e) {
			console.log("getSchedule: (" + 	e.name + ") " + e.message);
		}
	}

	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="MainPage">
					<Stack.Screen name="MainPage"
						component={MainPage}
						options={{
							title: "전달, 전달, 점호 5분전"
						}} />
					<Stack.Screen name="QRPage"
						component={ShowQRPage}
						options={{
							headerShown: false
						}}
						initialParams={{
							uniqueId: uniqueId,
							getSchedule: getSchedule
						}} />
					<Stack.Screen name="SchedulePage"
						component={InputSchedulePage}
						initialParams={{
							saveSchedule: saveSchedule,
							getSchedule: getSchedule
						}} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
	
}

const styles = StyleSheet.create({
});

export default App;