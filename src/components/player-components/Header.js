import React, { Component } from 'react';

import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Actions} from 'react-native-router-flux';

const Header = ({
  message,
  onDownPress,
  onMessagePress,
}) => (
  <View style={styles.container}>
    <View style={styles.col1}>
    </View>
    <View style={styles.col2}>
      <Text style={styles.message}>Radio Hit</Text>
    </View>
    <View style={styles.col3}>
      <TouchableOpacity onPress={() => {Actions.pop();}}><Ionicons style={styles.closeIcon} name="md-close" /></TouchableOpacity>
    </View>
  </View>
);

export default Header;

const styles = StyleSheet.create({
  col1: {
    flex: 1
  },
  col2: {
    flex: 5
  },
  col3: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  closeIcon: {
    color: '#FFF',
    fontSize: 28,
  },
  container: {
    height: 72,
    paddingTop: 20,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: 'row',
  },
  message: {
    flex: 1,
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.72)',
    fontSize: 16,
  },
  button: {
    opacity: 0.72
  }
});
