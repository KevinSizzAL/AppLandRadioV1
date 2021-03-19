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
import NewsFilter from './../components/NewsFilter';
import {db, firebaseAuth} from './../commons/FirebaseConection';

import {
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

class NoticiasView extends Component{
  constructor(){
    super();
    this.state = {
      newsList: []
    }
  }

  componentWillMount = () =>{
    let that = this;
    this.getNews(null);
  }

  getNews = (categoryCode) => {
    let that = this;
    let reference = db.collection("news/").get();
    if(categoryCode)
      reference = db.collection("news/").where('categoryCode' , '==', categoryCode).get();
    reference
      .then(function(querySnapshot) {
        let list = [];
        querySnapshot.forEach(function(doc) {
          list.push(doc.data());
        });
        that.setState({newsList: list});
      })
      .catch(function(error) {
          alert('Ha ocurrido un error, intentelo mas tarde')
      });
  }

  newsRender = () => {
    let list = [];
    for(let i = 0; i<this.state.newsList.length; i++)
      list.push(<ItemArticle config={this.state.newsList[i]}/>);
    return list;
  }

  render() {
    const menu = <SideMenuCustomised/>;
    return (
    	<Container>
          <StatusBar barStyle="light-content"/>
          <Header style={[COLOR_PALLETE.headerTabs, {height: Platform.OS === 'ios' ? 70:80}]} hasTabs />
          <Content>
          	<NewsFilter event={this.getNews}/>
            {this.newsRender()}
  	      </Content>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
});

export default connect(mapStateToProps)(NoticiasView);

