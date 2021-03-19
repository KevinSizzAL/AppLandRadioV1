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

import {COLOR_PALLETE, LOGOS, CONFIG} from './../commons/Color';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import Moment from 'react-moment';

export default class ItemArticle extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={() => {
          //alert(JSON.stringify(this.props.config))
          Actions.detalleArticulo({data: this.props.config});
        }}>
        <Card>
          <CardItem>
            <Body>
              <View style={styles.header}>
                <Image style={styles.logo} source={LOGOS.samll}/>
                <Text style={styles.title}>{CONFIG.name} | <Moment element={Text} locale="es" fromNow>{this.props.config.date}</Moment></Text>
              </View>
              <View style={styles.article}>
                <View style={styles.col1}>
                  <Text style={styles.articleTitle}>{this.props.config.title}</Text>
                  <Text style={styles.description}>{this.props.config.description}...</Text>
                </View>
                <View style={styles.col2}>
                  <Image style={styles.image} source={{uri: this.props.config.banner}} />
                </View>
              </View>
            </Body>
          </CardItem>
        </Card>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    backgroundColor: '#DDD'
  },
  description: {
    marginTop: 5,
    color: '#505050'
  },
  articleTitle: {
    fontSize: 17,
    fontWeight: '600'
  },
  article: {
    width: Dimensions.get('window').width/1.1,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row'
  },
  col1: {
    flex: 2,
    padding: 10
  },
  col2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginLeft: 10,
    color: '#505050',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  logo: {
    //height: 30,
    //width: 30,
    //backgroundColor: '#DDD'
    //borderRadius: 15,
    height: 25,
    width: 30
  }
});