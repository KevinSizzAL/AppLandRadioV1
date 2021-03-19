import React from 'react';
import {Actions} from 'react-native-router-flux';
import {COLOR_PALLETE} from './../commons/Color';
import {Card, CardItem, Body } from 'native-base';
import ItemUser from './ItemUser';
import Like from './Like';
import { 
  StyleSheet, 
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/es';

export default class ProposedQuestion extends React.Component {

    constructor(){
      super();
    }

   render() {
    return (
      <Card>
        <CardItem>
          <Body>
            <View style={styles.root}>
              <View style={styles.col1}><ItemUser config={this.props.data}/></View>
              <View style={styles.col2}>
                <View style={styles.col21}>
                  <Text style={styles.question}>{this.props.data.question}</Text>
                  <Text style={styles.name}>{this.props.data.nickName}</Text>
                  <Text style={[styles.date, styles.grayColor]}><Moment element={Text} locale="es" fromNow>{this.props.data.date}</Moment></Text>
                </View>
                <View style={styles.col22}>
                  {this.props.config.show ? <Like action={this.props.likeEvent} data={this.props.data}/>:null}
                </View>
              </View>
            </View>
          </Body>
        </CardItem>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  grayColor: {
    color: '#696969'
  },
  likes: {
    fontSize: 10
  },
  date: {
    fontSize: 10
  },
  question: {
    fontSize: 17
  },
  root: {
    flexDirection: 'row'
  },
  col1: {
    flex: 1,
    justifyContent: 'center'
  },
  col2: {
    flex: 4,
    flexDirection: 'row'
  },
  col21: {
    flex: 6,
    justifyContent: 'center',
  },
  col22: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
