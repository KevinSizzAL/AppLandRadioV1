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
import {COLOR_PALLETE, CONFIG} from './../commons/Color';
import ItemArticle from './../components/ItemArticle';
import {db, firebaseAuth} from './../commons/FirebaseConection';
import Moment from 'react-moment';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  Platform
} from 'react-native';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

class NewsDetailView extends Component{
  constructor(){
    super();
    this.state = {
      newsContent: '',
      artitle: {}
    }
  }

  componentWillMount = () =>{
      this.setState({article: this.props.navigation.state.params.data})
      //Obtenemos la informacion de la noticia seleccionada
      db.collection("newsContent/").where('newsCode', '==', this.props.navigation.state.params.data.code).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //alert(JSON.stringify(doc.data()))
          this.setState({newsContent: doc.data().content})
        });
      })
      .catch(function(error) {
          alert('Ha ocurrido un error, intentelo mas tarde')
      });
  }

  render() {
    const menu = <SideMenuCustomised/>;
    return (
    	<Container>
          <StatusBar barStyle="light-content"/>
          <Header style={[COLOR_PALLETE.headerTabs, {height: Platform.OS === 'ios' ? 70:80}]} hasTabs />
          <Content>
            <View style={styles.header}>
              <Text style={styles.title}>{this.state.article.title}</Text>
              <View style={styles.header2}>
                <Image style={styles.logo} source={require('./../img/smallLogoAppland.png')}/>
                <Text style={styles.title2}>{CONFIG.name} | <Moment element={Text} locale="es" fromNow>{this.state.article.date}</Moment></Text>
              </View>
            </View>
            <Image style={styles.image} source={{uri: this.state.article.banner}} />
            <View style={styles.bodyLayout}>
              <Text style={styles.body}>{this.state.newsContent}</Text>
            </View>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  bodyLayout: {
    margin: 20
  },
  body: {
    fontSize: 15,
    lineHeight: 22,
    color: '#505050',
  },
  image: {
    width: Dimensions.get('window').width/1.1,
    height: 200,
    alignSelf: 'center',
    backgroundColor: '#DDD'
  },
  header: {
    padding: 20
  },
  title: {
    fontSize: 22,
  },
  title2: {
    marginLeft: 10,
    color: '#505050',
  },
  header2: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5
  },
  logo: {
    //height: 30,
    //width: 30,
    //borderRadius: 15,
    //backgroundColor: '#DDD',
    height: 25,
    width: 30,
  }
});

export default connect(mapStateToProps)(NewsDetailView);

