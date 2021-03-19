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
  Dimensions
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import {COLOR_PALLETE, CONFIG, LOGOS} from './../commons/Color';

export default class Player extends Component {

  constructor(props){
    super(props);
    this.state = {
      showPlayIcon: false
    }
  }

  pausarReproduccion = () => {
    this.setState({showPlayIcon: !this.state.showPlayIcon});
    //this.props.event();
  }

  render() {
    return (
      <View style={styles.root}>
        <View style={styles.col1}>
          <Image style={styles.image} source={require('./../img/smallLogoAppland.png')} />
        </View>
        <View style={styles.col2}>
          <Text style={styles.title}>{CONFIG.name} | {CONFIG.subName}!</Text>
          <Text style={styles.lbl1}>Transmisión al aire</Text>
        </View>
        <View style={styles.col3}>
          <TouchableOpacity onPress={this.props.event}>
            <Ionicons style={styles.icon} name="md-close"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lbl1: {
  },
  row1: {
    flexDirection: 'row'
  },
  title: {
    fontSize: 16
  },
  image: {
    //height: 50,
    //width: 50,
    height: 40,
    width: 50
  },
  icon: {
    fontSize: 25,
    color: '#777'
  },
  col3: {
    flex: 1,
    justifyContent: 'center'
  },
  col1: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  col2: {
    flex: 7,
    justifyContent: 'center',
    paddingLeft: 10
  },
  root: {
    height: 70,
    backgroundColor: '#FFF',
    flexDirection: 'row'
  }
});