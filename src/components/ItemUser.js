/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import {COLOR_PALLETE} from './../commons/Color';

export default class ItemUser extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View>
        {this.props.config.auth == 'facebook' ? <Image style={styles.photo} source={{uri: this.props.config.photo}}/> : <View style={styles.root}><Text style={styles.name}>{this.props.config.nickName[0]}</Text></View>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    fontSize: Platform.OS === 'ios' ? 24:20,
    alignSelf: 'center'
  },
  root: {
    height: Platform.OS === 'ios' ? 48:42,
    width: Platform.OS === 'ios' ? 48:42,
    backgroundColor: '#dfdfdf',
    borderRadius: Platform.OS === 'ios' ? 24:21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  photo: {
    height: Platform.OS === 'ios' ? 48:42,
    width: Platform.OS === 'ios' ? 48:42,
    borderRadius: Platform.OS === 'ios' ? 24:21,
    marginLeft: 10
  }
});