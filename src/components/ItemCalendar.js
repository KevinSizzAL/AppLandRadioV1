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
import {getJSON} from '../functions/getJSON'
import {LOGOS} from '../commons/Color'

export default class ItemCalendar extends Component {

  constructor(props){
    super(props);
  }

  render() {
    const {data} = this.props
    const getJSONInstance = (value='', undefined_response) => getJSON(data, [value], undefined_response)
    const image = getJSONInstance('image', null) ? {uri: getJSONInstance('image', '') } : LOGOS.primary
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
                <Image style={styles.image} source={image}/>
              </View>
              <View style={styles.col2}>
                <Text style={styles.title}>{getJSONInstance('title', 'Sin título del programa')}</Text>
                <Text style={styles.time}>{getJSONInstance('startTime', '00')} - {getJSONInstance('endTime', '00')}</Text>
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