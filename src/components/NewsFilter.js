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
  Dimensions,
  ScrollView,
  Platform
} from 'react-native';
import {db, firebaseAuth} from './../commons/FirebaseConection';
import {COLOR_PALLETE} from './../commons/Color';
import ItemNewsFilter from './ItemNewsFilter';

export default class NewsFilter extends Component {

  constructor(props){
    super(props);
    this.state = {
      newsCategories: []
    }
  }

  componentWillMount = () =>{
    let that = this;
    //Brayan: Obtenemos la lista de categorias
    db.collection("newsCategories/").get()
      .then(function(querySnapshot) {
        let list = [{selected: true, code: null, title: 'Todas', background: '#2980b9', icon: 'https://firebasestorage.googleapis.com/v0/b/radio-hit.appspot.com/o/iconNewsCategory%2Fselect-all.png?alt=media&token=4aeb3f37-4a71-4802-9ede-063eca76821c'}];
        querySnapshot.forEach(function(doc) {
          list.push({selected: false, ...doc.data()});
        });
        that.setState({newsCategories: list});
      })
      .catch(function(error) {
          alert('Ha ocurrido un error, intentelo mas tarde')
      });
  }

  selectItem = (code) => {
    let list = this.state.newsCategories;
    for(let i = 0; i<list.length; i++){
      if(list[i].code == code){
        if(!list[i].selected)
          this.props.event(list[i].code);
        list[i].selected = true;
      }
      else
        list[i].selected = false;
    }
    this.setState({newsCategories: list});
  }

  renderItems = () => {
    let content = [];
    for(let i = 0; i<this.state.newsCategories.length; i++){
      content.push(<ItemNewsFilter event={this.selectItem} config={this.state.newsCategories[i]}/>);
    }
    return content;
  }

  render() {
    return (
        <View style={[styles.root, COLOR_PALLETE.headerTabs]}>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.renderItems()}
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    height: Platform.OS === 'ios' ? 120:110,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  }
});