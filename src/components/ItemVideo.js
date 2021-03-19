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

export default class ItemVideo extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <View style={styles.root}>
          <Image style={styles.image} source={require('./../img/video.jpg')} />
          <View style={styles.itemGalery}>
            <View style={styles.informationVideo}>
              <Text style={styles.title}>Titulo del video</Text>
              <Text style={styles.description}>Lorem ipsum dolor sit amet, conse...</Text>
              <Text style={styles.duration}><Ionicons name="md-play" /> 12:10 min</Text>
            </View>
          </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  description: {
    marginTop: 2,
    color: '#757575'
  },
  duration: {
    marginTop: 2,
    color: '#757575'
  },
  title: {
    fontSize: 17
  },
  informationVideo: {
    paddingLeft: 15,
    paddingTop: 5
  },
  root: {
    flexDirection: 'row',
    marginTop: 8,
    backgroundColor: '#FFF',
  },
  image: {
    height: 80,
    width: 130,
    borderRadius: 5,
    backgroundColor: '#DDD'
  }

});