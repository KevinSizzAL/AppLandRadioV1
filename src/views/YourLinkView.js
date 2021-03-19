/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @floww
 */

import React, { Component } from 'react';
import ItemMenu from './../components/ItemMenu';
import SideMenu from 'react-native-side-menu';
import {connect} from 'react-redux';
import store from './../redux/store';
import { Ionicons } from '@expo/vector-icons';

import SideMenuCustomised from './../components/SideMenuCustomised';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import {COLOR_PALLETE} from './../commons/Color';
import Publication from './../components/Publication';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

class YourLinkView extends Component{
  constructor(){
    super();
  }

  render() {
    const menu = <SideMenuCustomised/>;
    return (
    	<Container>
          <StatusBar barStyle="light-content"/>
          <Header style={[COLOR_PALLETE.headerTabs, {height: Platform.OS === 'ios' ? 70:80}]} hasTabs />
          <Content style={styles.body}>
            <Publication/>
            <Publication/>
            <Publication/>
          </Content>
            <View style={[styles.floatButton, COLOR_PALLETE.borderPrimary]}>
                <View style={styles.float1}>
                  <TouchableOpacity onPress={()=>{this.setState({mostrarFiltroUniversidades: true})}} style={{flexDirection: 'row'}}>
                    <Ionicons style={[styles.icon1, COLOR_PALLETE.txtPrimary]} name="md-camera"/>
                    <Text style={[styles.txt1, COLOR_PALLETE.txtPrimary]}>Tomar foto</Text>
                  </TouchableOpacity>
                </View>
                <Text style={[styles.txt3, COLOR_PALLETE.txtPrimary]}>|</Text>
                <View style={styles.float2}>
                  <TouchableOpacity onPress={()=>{this.setState({mostrarFiltroServicios: true})}}  style={{flexDirection: 'row'}}>
                    <Ionicons style={[styles.icon2, COLOR_PALLETE.txtPrimary]} name="md-videocam"/>
                    <Text style={[styles.txt2, COLOR_PALLETE.txtPrimary]}>Grabar</Text>
                  </TouchableOpacity>
                </View>
            </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    padding: 10
  },
  txt3: {
    fontSize: 22,
    marginLeft: 10,
  },
  txt1: {
    marginLeft: 5,
    fontSize: 13,
    color: '#3BAFDA',
    fontWeight: '600',
    marginTop: 2
  },
  txt2: {
    marginLeft: 5,
    fontSize: 13,
    color: '#3BAFDA',
    fontWeight: '600',
    marginTop: 2
  },
  icon1: {
    fontSize: 20,
  },
  icon2: {
    fontSize: 20,
  },
  float1: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  float2: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  floatButton: {
    position: 'absolute',
    width: 230,
    height: 45,
    alignSelf: 'center',
    bottom: 15,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    borderRadius: 30,
    padding: 5,
    borderWidth: 1.2,
  },
});

export default connect(mapStateToProps)(YourLinkView);

