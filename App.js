import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants'
import Home from './components/Home'
import CreateEmployee from './components/CreateEmployee'
import Profile from './components/Profile'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import {reducer} from './reducers/reducer'

const store = createStore(reducer)

const Stack = createStackNavigator();

const myOptions = {
  title:"My Sweet Home",
  headerTintColor: "white",
  headerStyle:{
    backgroundColor: "#006aff"
  }
 }

function App() {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={myOptions} />
        <Stack.Screen name="Create" component={CreateEmployee} options={{...myOptions, title: "Create Employee"}} />
        <Stack.Screen name="Profile" component={Profile} options={{...myOptions, title: "Profile"}} />
        {/* <Stack.Screen name="Settings" component={Settings} /> */}
      </Stack.Navigator>
    </View>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    // alignItems: 'center',
    // flexDirection: 'row',
    // justifyContent: 'center',
  },
});