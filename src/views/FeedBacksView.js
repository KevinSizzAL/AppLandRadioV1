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
import ItemArticle from './../components/ItemArticle';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions
} from 'react-native';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

class FeedBacksView extends Component{
  constructor(){
    super();
  }

  render() {
    const menu = <SideMenuCustomised/>;
    return (
    	<Container>
          <StatusBar barStyle="light-content"/>
          <Header style={COLOR_PALLETE.headerTabs} hasTabs />
          <Content>
            <View style={styles.header}>
              <Text>FeedBacksView</Text>
            </View>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({

});

export default connect(mapStateToProps)(FeedBacksView);

