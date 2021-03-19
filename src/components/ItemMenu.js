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

import {COLOR_PALLETE} from './../commons/Color';
export default class ItemMenu extends Component {

  constructor(props){
    super(props);
    this.state = {
      changeIcon: false
    }
  }

  event = () => {
    this.setState({changeIcon: this.props.config.action()});
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={this.event}>
        <View style={[styles.circle1, COLOR_PALLETE.primary1]}>
          <View style={styles.circle2}>
            {!this.state.changeIcon ? <Image style={[styles.icon, {width: this.props.config.dimension, height: this.props.config.dimension}]} source={this.props.config.icono}/> : <Image style={[styles.icon, {width: this.props.config.dimension, height: this.props.config.dimension}]} source={require('./../img/rounded-pause-button.png')}/>}
          </View>
        </View>
        <Text style={[styles.titulo, COLOR_PALLETE.colorTitleMenu]}>{this.props.config.titulo}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    alignSelf: 'center'
  },
  titulo: {
    alignSelf: 'center',
    fontSize: 16.5,
    color: '#000'
  },
  circle1: {
    height: Platform.OS === 'ios' ? 110:100,
    width: Platform.OS === 'ios' ? 110:100,
    alignSelf: 'center',
    borderRadius: Platform.OS === 'ios' ? 55:50,
    justifyContent: 'center',
    borderColor: '#fff', 
    borderWidth: 2,
  },
  circle2: {
    backgroundColor: '#DDD',
    height: Platform.OS === 'ios' ? 98:90,
    width: Platform.OS === 'ios' ? 98:90,
    alignSelf: 'center',
    borderRadius: Platform.OS === 'ios' ? 49:45,
    justifyContent: 'center'
  }
});