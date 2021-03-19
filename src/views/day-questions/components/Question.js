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
  TouchableOpacity,
  Platform
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import Button from 'apsl-react-native-button';

import { Ionicons } from '@expo/vector-icons';
import {COLOR_PALLETE} from './../../../commons/Color';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import ItemUser from './../../../components/ItemUser';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';
import {firebaseAuth} from './../../../commons/FirebaseConection';
export default class Question extends Component {

  constructor(props){
    super(props);
  }

  renderUsers = () => {
    let content = [];
    let users = this.props.config.listUsers.slice(0,5);
    for(let i = 0; i<users.length; i++)
      content.push(<ItemUser config={users[i]}/>);
    return content;
  }

  validate = () =>{
    let that = this;
    //Obtenemos el ID del usuario logueado
    firebaseAuth.onAuthStateChanged(user => {
      if(user){
        //this.props.config.userId = user.uid;
        Actions.comentarios({userId: user.uid, ...this.props.config});
      } else {
        Actions.loginModal();
      }
    })
    //Actions.loginModal(this.props.config);
  }

  render() {
    return (
      <TouchableOpacity 
        onPress={this.validate}>
        <Card>
          <CardItem>
            <Body>
              <Text style={styles.title}>{this.props.config.title}</Text>
              <Text style={styles.txtGray}><Text style={[COLOR_PALLETE.txtPrimary]}>{this.props.config.answersNumber} respuestas</Text> registradas hasta ahora</Text>
              <View style={styles.users}>
                {this.renderUsers()}
              </View>
              <View style={styles.options}>
                <View style={styles.col1}>
                  <Ionicons style={[styles.icon, styles.txtGray]} name="md-time"/>
                  <Text style={styles.txtGray}><Moment element={Text} locale="es" fromNow>{this.props.config.date}</Moment></Text>
                </View>
                <View style={styles.col2}>
                  <Text style={[styles.text2, COLOR_PALLETE.txtPrimary]}>INTERACTUAR</Text>
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
  text2: {
    fontSize: Platform.OS === 'ios' ? 16:14,
    alignSelf: 'flex-end'
  },
  txtGray: {
    color: '#606060'
  },
  btnOpinar: {
    borderColor: '#FFF'
  },
  icon: {
    fontSize: 18,
    marginRight: 5
  },
  col1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  col2: {
    flex: 1,
    alignItems: 'flex-end',
    alignItems: 'center'
  },
  options: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10
  },
  users: {
    flexDirection: 'row',
    marginTop: 20
  },
  title: {
    fontSize: Platform.OS === 'ios' ? 25:22
  }
});