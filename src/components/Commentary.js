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
  Dimensions,
  Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux';

import { Ionicons } from '@expo/vector-icons';

import {COLOR_PALLETE} from './../commons/Color';
import ItemUser from './ItemUser';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';
export default class Commentary extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const dateToFormat = '1976-04-19T12:59-0500';
    return (
      <View style={styles.root}>
        <View style={styles.col1}>
          <ItemUser config={{nickName: this.props.config.nickName, auth: this.props.config.auth, photo: this.props.config.photo}}/>
        </View>
        <View style={styles.col2}>
          <Text style={styles.name}>{this.props.config.nickName}</Text>
          <View style={styles.box}>
            <Text style={styles.content}>{this.props.config.content}</Text>
          </View>
          <Text style={styles.time}><Ionicons style={styles.icon} name="md-time" /> <Moment element={Text} locale="es" fromNow>{this.props.config.date}</Moment></Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  box: {
    borderColor: '#CCC', 
    borderWidth: 1,
    borderRadius: Platform.OS === 'ios' ? 20:18,
    padding: 10,
    marginTop: 5
  },
  icon: {
    fontSize: 14
  },
  name: {
    fontSize: Platform.OS === 'ios' ? 16:14,
    fontWeight: Platform.OS === 'ios' ? '500':'100',
  },
  time: {
    color: '#606060',
    marginTop: 2,
    fontSize: 12
  },
  content: {
    fontSize: Platform.OS === 'ios' ? 15:13,
  },
  root: {
    flexDirection: 'row',
    padding: 10
  },
  col1: {
    flex: 1
  },
  col2: {
    flex: 4
  }
});