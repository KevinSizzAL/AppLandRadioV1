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

import {COLOR_PALLETE} from './../commons/Color';

export default class ItemNewsFilter extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <View style={styles.layout}>
        <TouchableOpacity onPress={()  => this.props.event(this.props.config.code)}>
          <View style={[styles.root, {backgroundColor: this.props.config.background}]}>
            <Image style={styles.icon} source={{uri: this.props.config.icon}} />
            {this.props.config.selected ? <View style={styles.select}></View>:null}
          </View>
        </TouchableOpacity>
        <Text style={styles.label}>{this.props.config.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  select: {
    width: Platform.OS === 'ios' ? 70:64,
    height: Platform.OS === 'ios' ? 70:64,
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: Platform.OS === 'ios' ? 35:32,
    borderColor: '#FFF', 
    borderWidth: 2,
  },
  layout: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 25
  },
  label: {
    color: '#FFF',
    alignSelf: 'center'
  },
  icon: {
    height: Platform.OS === 'ios' ? 35:32,
    width: Platform.OS === 'ios' ? 35:32,
    alignSelf: 'center'
  },
  root: {
    width: Platform.OS === 'ios' ? 70:64,
    height: Platform.OS === 'ios' ? 70:64,
    borderRadius: Platform.OS === 'ios' ? 35:32,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFF', 
    borderWidth: 1,
    alignSelf: 'center'
  }

});