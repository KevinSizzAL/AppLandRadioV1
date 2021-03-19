/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Router, Scene, Stack, Actions, Modal} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {connect} from 'react-redux';

import {COLOR_PALLETE} from './commons/Color';
import HomeView from './views/HomeView';
import MultimediaView from './views/MultimediaView';
import NewsView from './views/NewsView';
import NewsDetailView from './views/NewsDetailView';
import FeedBacksView from './views/FeedBacksView';
import ContactsView from './views/ContactsView';
import YourLinkView from './views/YourLinkView';
import DayQuestionView from './views/day-questions/DayQuestionView';
import ComentsView from './views/ComentsView';
import CalendarView from './views/CalendarView';
import YourOpinionView from './views/YourOpinionView';
import SocialMediaView from './views/SocialMediaView';
import RemindersView from './views/RemindersView';
import LoginView from './views/LoginView';
import AskMusic from './views/ask-music/AskMusic';
import CustomPlayer from './components/player-components/CustomPlayer';


mapStateToProps = (state)=>{
  return{
    mostrar: state.mostrarBarra
  }
}

const TRACKS = [
  {
    title: 'Maroon 5',
    artist: 'Twenty One Pilots',
    albumArtUrl: "http://36.media.tumblr.com/14e9a12cd4dca7a3c3c4fe178b607d27/tumblr_nlott6SmIh1ta3rfmo1_1280.jpg",
    audioUrl: "https://firebasestorage.googleapis.com/v0/b/radio-hit.appspot.com/o/ringTones%2FMaroon%205%20-%20Girls%20Like%20You%20ft.%20Cardi%20B.mp3?alt=media&token=a1d730fe-3524-411d-96ea-420b1262bd9f",
  },
  {
    title: 'Love Yourself',
    artist: 'Justin Bieber',
    albumArtUrl: "http://arrestedmotion.com/wp-content/uploads/2015/10/JB_Purpose-digital-deluxe-album-cover_lr.jpg",
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/radio-hit.appspot.com/o/ringTones%2FMaroon%205%20-%20Girls%20Like%20You%20ft.%20Cardi%20B.mp3?alt=media&token=a1d730fe-3524-411d-96ea-420b1262bd9f',
  },
  {
    title: 'Hotline Bling',
    artist: 'Drake',
    albumArtUrl: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Drake_-_Hotline_Bling.png',
    audioUrl: 'https://firebasestorage.googleapis.com/v0/b/radio-hit.appspot.com/o/ringTones%2FMaroon%205%20-%20Girls%20Like%20You%20ft.%20Cardi%20B.mp3?alt=media&token=a1d730fe-3524-411d-96ea-420b1262bd9f',
  },
];

class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
      mostrarSide: false
    }
  }


  render() {
    const menu = <View><Text>Hola mundo</Text></View>;
    return (
      <Router>
        <Modal hideNavBar>
            <Stack key="root">
              <Scene 
                key="otroPerfil" 
                component={HomeView}
                navTransparent={true}
                hideNavBar={true}
              />
              <Scene 
                key="multimedia" 
                component={MultimediaView}
                navTransparent={true}
                title="Multimedia"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
              />
              <Scene 
                key="noticias" 
                component={NewsView}
                navTransparent={true}
                title="Noticias"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
              />
              <Scene 
                key="detalleArticulo" 
                component={NewsDetailView}
                navTransparent={true}
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
              />
              <Scene 
                key="temaDelDia" 
                component={DayQuestionView}
                navTransparent={true}
                title="Tema del dia"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
              />
              <Scene 
                key="comentarios" 
                component={ComentsView}
                title="Comentarios"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
                navigationBarStyle={COLOR_PALLETE.headerTabs}
              />
              <Scene 
                key="tuEnlace" 
                component={YourLinkView}
                title="Tu enlace"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
                navigationBarStyle={COLOR_PALLETE.headerTabs}
                navTransparent={true}
              />
              <Scene 
                key="programacion" 
                component={CalendarView}
                title="Programación"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
                navigationBarStyle={COLOR_PALLETE.headerTabs}
                navTransparent={true}
              />
              <Scene 
                key="suOpinion" 
                component={YourOpinionView}
                title="Su opinión cuenta"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
                navigationBarStyle={COLOR_PALLETE.headerTabs}
                navTransparent={true}
              />
              <Scene 
                key="redesSociales" 
                component={SocialMediaView}
                title="Nuestras redes sociales"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
                navigationBarStyle={COLOR_PALLETE.headerTabs}
                navTransparent={true}
              />
              <Scene 
                key="solicitaCancion" 
                component={AskMusic}
                title="Pide tu canción"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
                navigationBarStyle={COLOR_PALLETE.headerTabs}
                navTransparent={true}
              />
            </Stack>
            <Scene key="loginModal" component={LoginView} hideNavBar />
            <Scene key="player" component={CustomPlayer} hideNavBar />
          </Modal>
        </Router>
    );
  }
}

const styles = StyleSheet.create({
  whiteColor: {
    color: '#FFF'
  },
  icon: {
    fontSize: 35,
    marginLeft: 15,
  }
});

export default connect(mapStateToProps)(Config);