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
import {Card, CardItem, Body } from 'native-base';

import {COLOR_PALLETE} from './../commons/Color';

export default class ItemCalendar extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <TouchableOpacity
        onPress={
          () =>{
            this.props.event(this.props.data);
          }
        }
      >
        <Card>
          <Body>
            <View style={styles.root}>
              <View style={styles.col1}>
                <Image style={styles.image} source={{uri: this.props.data.image}}/>
              </View>
              <View style={styles.col2}>
                <Text style={styles.title}>{this.props.data.title}</Text>
                <Text style={styles.time}>{this.props.data.startTime} - {this.props.data.endTime}</Text>
              </View>
            </View>
          </Body>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80
  },
  time: {
    marginTop: 3,
    color: '#707070'
  },
  title: {
    fontSize: 16
  },
  icon: {
    color: '#FFF',
    fontSize: 30
  },
  col1: {
    backgroundColor: '#f48a1f',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80
  },
  col2: {
    flex: 10,
    justifyContent: 'center',
    paddingLeft: 25
  },
  root: {
    height: 80,
    width: Dimensions.get('window').width - 30,
    flexDirection: 'row'
  }
});