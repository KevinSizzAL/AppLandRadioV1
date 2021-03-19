import React from 'react';
import {Text, View} from 'react-native'
import { Provider } from 'react-redux';
import Config from './src/Config';
import store from './src/redux/store';

export default class App extends React.Component {
  render() {
    return (
      // <View style={{flex:1, justifyContent:'center', alignSelf:'center'}} ><Text>werhgvkjrkbhvbbkdjhfvbdhfhvbhj</Text></View>
      
      <Provider store={store}>
          <Config/>
      </Provider>
    );
  }
}
