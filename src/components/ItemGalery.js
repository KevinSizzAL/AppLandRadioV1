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

import {COLOR_PALLETE} from './../commons/Color';
export default class ItemGalery extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <TouchableOpacity 
        style={{marginTop: 5}}
        onPress={() => {
          this.props.event(this.props.config.type, this.props.config.index, this.props.config.video);
        }}>
        <View>
          {this.props.config.type == 'image' ? <Image style={styles.image} source={{uri: this.props.config.url}} /> : <Image style={styles.video} source={{uri: this.props.config.url}} />}
          {this.props.config.type == 'video' ? <View style={styles.playCircle}><Ionicons style={styles.playIcon} name="md-play" /></View> : null}
          <View style={styles.itemGalery}>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  playCircle: {
    position: 'absolute',
    alignSelf: 'center',
    height: 50,
    width: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    marginTop: 100
  },
  playIcon: {
    fontSize: 30,
    marginLeft: 8,
    marginTop: 2,
    color: '#FFF'
  },
  likes: {
    color: '#FFF',
    alignSelf: 'flex-end',
    paddingRight: 10,
    marginTop: 5,
    position: 'absolute'
  },
  description: {
    color: '#FFF',
    fontSize: 12
  },
  title: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    width: Dimensions.get('window').width/3.2,
    height: 125,
    backgroundColor: '#DDD'
  },
  video: {
    width: Dimensions.get('window').width,
    height: 250,
    backgroundColor: '#DDD'
  },
  darkLayout: {
    height: 65,
    backgroundColor: 'rgba(0,0,0,0.75)',
    marginTop: 50,
    padding: 15
  },
  itemGalery: {
    width: Dimensions.get('window').width/3.2
  }
});