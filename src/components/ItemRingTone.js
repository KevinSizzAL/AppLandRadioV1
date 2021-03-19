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

import { Ionicons } from '@expo/vector-icons';

import {COLOR_PALLETE} from './../commons/Color';
import {Actions} from 'react-native-router-flux';

export default class ItemRingTone extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <TouchableOpacity onPress={() => {this.props.event(1)}}>
        <View style={styles.root}>
          <Image style={styles.image} source={{uri: this.props.config.albumArtUrl}} />
          <View style={styles.itemGalery}>
            <View style={styles.informationVideo}>
              <Text style={styles.title}>{this.props.config.title}</Text>
              <Text style={styles.description}>{this.props.config.artist}</Text>
              <Text style={styles.duration}><Ionicons style={styles.music} name="md-musical-notes" /> {this.props.config.duration} minutos</Text>
            </View>
            <View style={styles.playSection}>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  playSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  playIcon: {
    fontSize: Platform.OS === 'ios' ? 25:20,
    alignSelf: 'center',
  },
  col2: {
    flex: 2,
    justifyContent: 'center'
  },
  itemGalery: {
    flex: 1,
    flexDirection: 'row'
  },
  music: {
    fontSize: 15,
  },
  description: {
    marginTop: 2,
    color: '#757575'
  },
  duration: {
    marginTop: Platform.OS === 'ios' ? 2:6,
    color: '#757575',
    fontSize: Platform.OS === 'ios' ? 12:10
  },
  title: {
    fontSize: 17
  },
  informationVideo: {
    paddingLeft: 15,
    paddingTop: 5,
    flex: 5
  },
  root: {
    flexDirection: 'row',
    marginTop: 8,
    backgroundColor: '#FFF'
  },
  image: {
    height: Platform.OS === 'ios' ? 80:65,
    width: Platform.OS === 'ios' ? 90:70,
    backgroundColor: '#DDD',
    alignSelf: 'center'
  }

});