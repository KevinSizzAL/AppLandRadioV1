import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import {Actions} from 'react-native-router-flux';
import {COLOR_PALLETE} from './../commons/Color';
import { 
  StyleSheet, 
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class Like extends React.Component {

    constructor(){
      super();
    }

   like = () => {
    this.props.data.like = !this.props.data.like;
    this.props.data.likes += this.props.data.like ? 1:-1;
    this.props.action(this.props.data.code, this.props.data.like, this.props.data.likes);
   }

   render() {
    return (
      <View>
        <TouchableOpacity onPress={this.like}>
          {this.props.data.like ? <Ionicons style={[styles.heart, styles.red]} name="md-heart" />:<Ionicons style={styles.heart} name="md-heart-outline" />}
        </TouchableOpacity>
        <Text style={[styles.likes, styles.grayColor]}>{this.props.data.likes}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heart: {
    fontSize: 26
  },
  red: {
    color: 'red'
  },
  grayColor: {
    color: '#696969',
    textAlign: 'center'
  },
  likes: {
    fontSize: 10
  },
});
