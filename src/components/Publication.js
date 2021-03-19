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
import {Actions} from 'react-native-router-flux';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import { Ionicons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/Ionicons';
import {COLOR_PALLETE} from './../commons/Color';
import ItemUser from './ItemUser';

export default class Publication extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
        <Card>
          <Body style={styles.card}>
            <View style={styles.header}>
              <View style={styles.col1}>
                <ItemUser config={{nickName: 'Brayan'}}/>
              </View>
              <View style={styles.col2}>
                <Text style={styles.name}>Brayan Medina</Text>
                <Text style={styles.time}><Ionicons style={styles.icon} name="md-time" /> Hace 1 minuto</Text>
              </View>
              <View style={styles.col3}><Ionicons style={styles.icon2} name="md-more" /></View>
            </View>
            <View style={styles.layoutDescription}>
              <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</Text>
            </View>
            <Image style={styles.image} source={require('./../img/publicacion1.jpg')} />
            <View style={styles.footer}>
              <View style={styles.colL1}>
                <Ionicons style={styles.iconFooter} name="ios-heart-outline"/>
                <Text style={styles.textFooter}>48</Text>
              </View>
              <View style={styles.colL2}>
                <Ionicons style={styles.iconFooter} name="ios-chatbubbles"/>
                <Text style={styles.textFooter}>48</Text>
              </View>
              <View style={styles.colL3}></View>
            </View>
          </Body>
        </Card>
    );
  }
}

const styles = StyleSheet.create({
  textFooter: {
    fontSize: 16,
    marginLeft: 10,
    color: '#505050'
  },
  iconFooter: {
    fontSize: 25,
    color: '#505050'
  },
  colL1: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  colL2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  colL3: {
    flex: 3
  },
  footer: {
    height: 40,
    width: Dimensions.get('window').width - 22,
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10
  },
  layoutDescription: {
    padding: 10
  },
  image: {
    marginTop: 10,
    height: 300,
    width: Dimensions.get('window').width - 22
  },
  col3: {
    flex: 1,
    alignItems: 'flex-end'
  },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  col1: {
    flex: 1
  },
  col2: {
    flex: 5,
    paddingLeft: 25
  },
  header: {
    flexDirection: 'row'
  },
  icon: {
    fontSize: 14
  },
  icon2: {
    fontSize: 25,
    marginRight: 20
  },
  name: {
    fontSize: 16,
    fontWeight: '500'
  },
  time: {
    color: '#606060',
    marginTop: 2,
    fontSize: 12
  },
});