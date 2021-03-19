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
import SideMenuCustomised from './../components/SideMenuCustomised';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import {COLOR_PALLETE} from './../commons/Color';
import Publication from './../components/Publication';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform
} from 'react-native';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

class ScialMediaView extends Component{
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
            <View><Text>Hola mundo</Text></View>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});

export default connect(mapStateToProps)(ScialMediaView);

