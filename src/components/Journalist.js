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
  TouchableOpacity
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button';
import { Ionicons } from '@expo/vector-icons';

import {COLOR_PALLETE} from './../commons/Color';

export default class Journalist extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.root}>
        <Image style={styles.img} source={{uri: this.props.data.profile}} />
        <Text style={styles.name}>{this.props.data.name}</Text>
        <Button style={styles.socialBtn} textStyle={{fontSize: 14}}>
          <Text style={styles.textBtn}><Ionicons style={styles.facebook} name="logo-facebook"/> Facebook</Text>
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  name: {
    color: '#303030'
  },
  facebook: {
    fontSize: 14,
    color: '#4367b2'
  },
  textBtn: {
    fontSize: 11,
    color: '#505050'
  },
  socialBtn: {
    height: 20,
    marginTop: 5,
    borderColor: '#DDD', 
    borderWidth: 1,
    borderRadius: 15
  },
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 30
  },
});