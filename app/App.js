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
	StatusBar,
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
						}} />
					<Stack.Screen name="SchedulePage"
						component={InputSchedulePage} />
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
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
// const styles = StyleSheet.create({
// });

export default App;