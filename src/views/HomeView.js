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
import { Ionicons } from '@expo/vector-icons';

import {db, firebaseAuth} from './../commons/FirebaseConection';

import SideMenuCustomised from './../components/SideMenuCustomised';
import {Actions} from 'react-native-router-flux';
import PopupDialog, { SlideAnimation, DialogButton } from 'react-native-popup-dialog';
import {COLOR_PALLETE, LOGOS} from './../commons/Color';
import Button from 'apsl-react-native-button';
import ControlPlayer from './../components/ControlPlayer';
import Player from 'react-native-streaming-audio-player';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import Spinner from 'react-native-loading-spinner-overlay';


import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
  Platform,
  Dimensions
} from 'react-native';
const { width, height } = Dimensions.get('window')
const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

//Iconos utilizados
/*
  Icono1: https://www.flaticon.com/free-icon/play-button-inside-a-circle_60734#term=play&page=1&position=68
  Icono2: https://www.flaticon.com/free-icon/file-sharing_287699
  Icono7: https://www.flaticon.com/free-icon/conversation_129672
  Icon10: https://www.flaticon.com/free-icon/music-player_149646
*/
class HomeView extends Component{
  constructor(){
    super();
    this.state = {
      popupDialog: undefined,
      openPopupDialog: () =>{
        this.state.popupDialog.show();
      },
      showPlayer: false,
      showControlPlayer: false,
      mostrarSide: false,
      listaMenu: [
        {
          titulo: 'Al aire',
          icono: require('./../img/icon11.png'),
          dimension: 45,
          action: () => {
            return this.showPlayer();
          },
          havePlayIcon: true,
          selectedIconMenu: false
        },
        {
          titulo: 'Pide tu canción',
          icono: require('./../img/icon10.png'),
          dimension: 45,
          action: () => {
            Actions.solicitaCancion();
            return false;
          }
        },
        {
          titulo: 'Noticias',
          icono: require('./../img/icon33.png'),
          dimension: 45,
          action: () => {
            Actions.noticias();
            return false;
          }
        },
        {
          titulo: 'Tema del dia',
          icono: require('./../img/icon77.png'),
          dimension: 50,
          action: () => {
            Actions.temaDelDia();
            return false;
          }
        },
        {
          titulo: 'Multimedia',
          icono: require('./../img/icon22.png'),
          dimension: 55,
          action: () => {
            Actions.multimedia();
            return false;
          }
        },
        {
          titulo: 'Programación',
          icono: require('./../img/icon88.png'),
          dimension: 45,
          action: () => {
            Actions.programacion();
            return false;
          }
        }
      ],
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: true,
      shuffleOn: true,
      pressItemSideMenu: false,
      newOpinion: null,
      spinner: false
    }
  }

  componentDidMount() {
    Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
}

  
_keyboardDidShow = () => {
  this.setState({
      dialogStyle: {
          top: -1.4 * (width / 4),
          borderRadius: 20,
          padding: 10,
          overflow: 'hidden',
      },
  })
}

_keyboardDidHide = () => {
  this.setState({
      dialogStyle: {
          borderRadius: 20,
          padding: 10,
          overflow: 'hidden',
      },
  })
}

  hideControlPlayer = () => {
    this.setState({showPlayer: true, mostrarSide: false, showControlPlayer: false});
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  showPlayer = () => {

    this.setState({showPlayer: !this.state.showPlayer, mostrarSide: false, showControlPlayer: !this.state.showPlayer});
    /*Player.play('http://pianosolo.streamguys.net/live.m3u', {
      title: 'Aaron',
      artist: 'Celine Dion',
      album_art_uri: 'https://unsplash.it/300/300'
    });*/
    return !this.state.showPlayer;
  }

  showPopupYourOpinion = () => {
    this.setState({pressItemSideMenu: true})
    setTimeout(() => {this.state.popupDialog.show() }, 150);
  }

  changeStateSideMenu = () => {
    this.setState({mostrarSide: true})
  }

  closeSideMenu = () => {
    this.setState({mostrarSide: false})
  }

  addNewOpinion = () => {
    if(this.state.newOpinion){
      this.setState({spinner: true});
      const newOpinion = {
        date: (new Date()).getTime(),
        contentOpinion: this.state.newOpinion,
      }
      const comentariesRef = db.collection("opinions")
        .add(newOpinion)
        .then((data) => {
          this.setState({spinner: false, newOpinion: null});
          this.state.popupDialog.dismiss();
        })
        .catch(function(error) {
            this.setState({spinner: false});
            showAlert('Error', 'Ha ocurrido un error, intentelo mas tarde');
        });
    } else {
      showAlert('Atención', 'Debe de agregar una opinión');
    }
  }



  render() {
    const menu = <SideMenuCustomised config={{openPopupDialog: () => {this.showPopupYourOpinion(), this.closeSideMenu()}}}/>;
    const video = !this.state.showPlayer ? null : (
      <Video source={{uri: 'https://firebasestorage.googleapis.com/v0/b/radio-hit.appspot.com/o/radio.mp4?alt=media&token=f4edc205-7f47-4f07-b289-8fadbe3372f9'}} // Can be a URL or a local file.
        ref="audioElement"
        shouldPlay={this.state.showPlayer}               // Pauses playback entirely.
        resizeMode="cover"           // Fill the whole screen at aspect ratio.
        repeat={true}                // Repeat forever.
        onLoadStart={this.loadStart} // Callback when video starts to load
        onLoad={this.setDuration.bind(this)}    // Callback when video loads
        onProgress={this.setTime.bind(this)}    // Callback every ~250ms with currentTime
        onEnd={this.onEnd}           // Callback when playback finishes
        onError={this.videoError}    // Callback when video cannot be loaded
        style={styles.audioElement} />
    );
    return (
        <SideMenu onChange={()=>{
          // if(!this.state.mostrarSide)
          //   this.setState({mostrarSide: !this.state.mostrarSide})
        }} 
          menu={menu} menuPosition={'left'} isOpen={this.state.mostrarSide}>
          <View style={[styles.background, COLOR_PALLETE.backgroundHome]}>
          <Spinner
            visible={this.state.spinner}
            textContent={'Enviando opinión...'}
            textStyle={styles.spinnerTextStyle}
          />
            <View>
              <TouchableOpacity onPress={this.changeStateSideMenu}>
                <Ionicons style={[styles.icon, COLOR_PALLETE.colorIconSideMenu]} name="md-menu"/>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={styles.row1}>
                <Image style={styles.logo} source={LOGOS.primary}/>
              </View>
              <View style={styles.grid}>
                <View style={styles.row}>
                  <View style={styles.item}>
                    <ItemMenu config={this.state.listaMenu[0]}/>
                  </View>
                  <View style={styles.item}>
                    <ItemMenu config={this.state.listaMenu[1]}/>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.item}>
                    <ItemMenu config={this.state.listaMenu[2]}/>
                  </View>
                  <View style={styles.item}>
                    <ItemMenu config={this.state.listaMenu[3]}/>
                  </View>
                </View>
                <View style={styles.row}>
                  <View style={styles.item}>
                    <ItemMenu config={this.state.listaMenu[4]}/>
                  </View>
                  <View style={styles.item}>
                    <ItemMenu config={this.state.listaMenu[5]}/>
                  </View>
                </View>
              </View>
            </ScrollView>
            { this.state.showControlPlayer ? <ControlPlayer event={this.hideControlPlayer}/> : null}
            <PopupDialog
              width={0.75}
              height={390}
              ref={(popupDialog) => { this.state.popupDialog = popupDialog; }}
              dialogAnimation={slideAnimation}
              onPress={()=> {alert('Hola mundo')}}
            >
                  <View style={styles.popup}>
                    <View style={styles.closePopup}><TouchableOpacity onPress={()=> {this.state.popupDialog.dismiss()}}><Ionicons name="md-close" style={styles.closeIcon} /></TouchableOpacity></View>
                    <ScrollView>
                      <View style={styles.headerPopup}>
                        <View style={[styles.circle, COLOR_PALLETE.colorItemCalendar]}>
                          <Ionicons style={styles.iconPopup} name="md-checkbox" />
                        </View>
                        <View style={styles.informationPopup}>
                          <Text style={styles.titlePopup}>Su opinión cuenta</Text>
                          <Text>Envíenos sus sugerencias u observaciones</Text>
                        </View>
                        <TextInput
                          style={styles.input}
                          placeholder="Escribir opinión..."
                          multiline={true}
                          numberOfLines={4}
                          value={this.state.newOpinion}
                          onChangeText={(value) => {
                            this.setState({newOpinion: value})
                          }}
                        />
                      </View>
                    </ScrollView>
                    <View style={styles.layoutButtons}>
                      <View style={styles.colButton}>
                        <Button onPress={()=> {this.state.popupDialog.dismiss()}} style={styles.btnPopup} textStyle={styles.lblButtonPopup}>
                          Cancelar
                        </Button>
                      </View>
                      <View style={styles.colButton}>
                        <Button onPress={this.addNewOpinion} style={styles.btnPopup} textStyle={styles.lblButtonPopup}>
                          Enviar opinión
                        </Button>
                      </View>
                    </View>
                  </View>
            </PopupDialog>
            {video}
          </View>
        </SideMenu>
    );
  }
}

const styles = StyleSheet.create({
  closePopup: {
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingTop: 15
  },
  iconPopup: {
    color: '#FFF',
    fontSize: 35
  },
  closeIcon: {
    fontSize: 25,
    color: '#000'
  },
  lblButtonPopup: {
    fontSize: 14
  },
  btnPopup: {
    borderColor: '#CCC'
  },
  colButton: {
    flex: 1,
    padding: 5
  },
  descriptionPopup: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  titlePopup: {
    fontSize: 18
  },
  informationPopup: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingBottom: 15
  },
  input: {
    height: 120,
    margin: 10,
    paddingTop: 10,
    paddingLeft: 10,
    borderColor: '#DDD', 
    borderWidth: 1,
  },
  presenterPopup: {
    padding: 15,
  },
  layoutButtons: {
    height: 50,
    flexDirection: 'row',
    padding: 5
  },
  audioElement: {
    height: 0,
    width: 0,
  },
  label1: {
    fontWeight: '500',
    fontSize: 15
  },
  popup: {

  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  icon: {
    fontSize: 35,
    marginLeft: 15,
  },
  row: {
    flexDirection: 'row',
    flex: 1
  },
  item: {
    flex: 1,
    margin: 1,
    justifyContent: 'center'
  },
  row1: {
    flex: 1.2,
  },
  grid: {
    flex: 3,
    padding: 25,
  },
  logo: {
    //height: Platform.OS === 'ios' ? 190:155,
    //width: Platform.OS === 'ios' ? 190:190,
    height: Platform.OS === 'ios' ? 220:180,
    width: Platform.OS === 'ios' ? 190:140,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  background: {
    flex: 1,
    paddingTop: 30
  }
});

export default connect(mapStateToProps)(HomeView);