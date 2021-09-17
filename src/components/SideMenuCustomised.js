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
  Linking,
  Platform
} from 'react-native';

import ItemSideMenu from './ItemSideMenu';
import {Actions} from 'react-native-router-flux';
import {COLOR_PALLETE, LOGOS} from './../commons/Color';

export default class SideMenuCustomised extends Component {

  constructor(props){
    super(props);

    this.state = {
      listaOpciones: [
        {
          titulo: 'Trasmisión al Aire',
          icono: 'md-play',
          action: () => {
            Actions.suOpinion();
          }
        },
        {
          titulo: 'Tu opinión cuenta',
          icono: 'md-chatbubbles',
          action: () => {
            this.props.config.openPopupDialog();
          }
        },
        {
          titulo: 'Redes Sociales',
          icono: 'md-share',
          action: () => {
            Actions.redesSociales();
          }
        },
        {
          titulo: 'Contáctanos',
          icono: 'md-call',
          action: () => {
            Actions.suOpinion();
          }
        },
        {
          titulo: 'Síguenos en Facebook',
          icono: 'logo-facebook',
          action: () => {
            Linking.openURL('fb://www.facebook.com/radiohithonduras/').catch(err => console.error('An error occurred', err));
          }
        },
        {
          titulo: 'Síguenos en Twitter',
          icono: 'logo-twitter',
          action: () => {
          }
        },
        {
          titulo: 'Síguenos en Instagram',
          icono: 'logo-instagram',
          action: () => {
          }
        },
      ]
    }
  }

  render() {
    return (
      <View style={[styles.root, COLOR_PALLETE.sideMenu]}>
        <View style={styles.row3}>
        </View>
        <View style={styles.row1}>
          <Image style={styles.logo} source={LOGOS.secondary}/>
        </View>
        <View style={styles.row2}>
          <Text style={styles.lblSocialMedia}>Más opciones</Text>
          <ItemSideMenu config={this.state.listaOpciones[1]}/>
          <ItemSideMenu config={this.state.listaOpciones[3]}/>
          <Text style={styles.lblSocialMedia}>Nuestras redes sociales</Text>
          <ItemSideMenu config={this.state.listaOpciones[4]}/>
          <ItemSideMenu config={this.state.listaOpciones[5]}/>
          <ItemSideMenu config={this.state.listaOpciones[6]}/>
          <TouchableOpacity><Text style={styles.cerrarSesion}>Cerrar sesión</Text></TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cerrarSesion: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#FFF'
  },
  lblSocialMedia: {
    color: '#FFF',
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 15
  },
  logo: {
    //height: Platform.OS === 'ios' ? 120:100,
    //width: Platform.OS === 'ios' ? 160:140,
    height: Platform.OS === 'ios' ? 120:90,
    width: Platform.OS === 'ios' ? 160:120,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  row1: {
    flex: 2,
    paddingTop: 20,
    justifyContent: 'center'
  },
  row2: {
    flex: Platform.OS === 'ios' ? 10:12,
    paddingTop: 20,
  },
  row3: {
    flex: 1
  },
  root: {
    flex: 1,
  }
});