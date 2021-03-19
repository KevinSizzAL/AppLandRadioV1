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

export default class CustomButton extends React.Component {

    constructor(){
      super();
    }

   render() {
    return (
        <View style={[styles.floatButton, {borderColor: '#ddd'}, COLOR_PALLETE.customButton]}>
            <View style={styles.float1}>
              <TouchableOpacity onPress={this.props.action} style={{flexDirection: 'row'}}>
                <Ionicons style={[styles.icon1]} name="md-bulb"/>
                <Text style={[styles.txt1]}>{this.props.title}</Text>
              </TouchableOpacity>
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  txtPrimary: {
    color: '#484646'
  },
  txt3: {
    fontSize: 22,
    marginLeft: 10,
  },
  txt1: {
    marginLeft: 5,
    fontSize: 13,
    color: '#FFF',
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
    color: '#FFF',
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
