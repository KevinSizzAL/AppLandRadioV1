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

import { Ionicons } from '@expo/vector-icons';

export default class ItemSideMenu extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.config.action}>
        <View style={styles.root}>
          <View style={styles.col2}><Ionicons style={styles.icon} name={this.props.config.icono}/></View>
          <View style={styles.col3}><Text style={styles.titulo}>{this.props.config.titulo}</Text></View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: Platform.OS === 'ios' ? 16:15,
    color: '#FFF'
  },
  icon: {
    fontSize: Platform.OS === 'ios' ? 30:25,
    alignSelf: 'center',
    color: '#FFF'
  },
  root: {
    height: 50,
    flexDirection: 'row',
    borderBottomColor: '#CCC',
    borderBottomWidth: 0.5,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5
  },
  col2: {
    flex: 1.5,
    justifyContent: 'center'
  },
  col3: {
    flex: 6,
    justifyContent: 'center'
  },
  col1: {
    flex: 1,
    backgroundColor: '#000'
  },
});