/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @floww
 */

import React, { Component } from 'react';
import {connect} from 'react-redux';
import store from './../redux/store';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import * as Facebook from 'expo-facebook';

import {COLOR_PALLETE} from './../commons/Color';
import {Actions} from 'react-native-router-flux';
import firebase from 'firebase';
import PopupDialog, { SlideAnimation, DialogButton } from 'react-native-popup-dialog';
import {firebaseAuth, provider, db} from './../commons/FirebaseConection';
import Button from 'apsl-react-native-button';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TextInput,
  Alert
} from 'react-native';

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

let elementCode = null;//Constante que almacenarà el codigo del elemento que fue presionado anteriormente
let previousKey = null;//Constante que guarda la ruta anterior de navegación

const setShowSpinner = (value) => {
  this.setState({showSpinner:  value});
}

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}


class LoginView extends Component{
  constructor(){
    super();
    this.state = {
      popupDialog: false,
      showSpinner: false,
      nickName: undefined
    }
    console.warn(provider)
  }

  closeModal = () => {
    Actions.pop();
  }

  componentWillMount = () =>{
    elementCode = this.props.navigation.state.params.code;
    previousKey = this.props.prevKey;
    console.log('Element code', elementCode);
  }

  addUserToDataBase = (userId, name, photo, auth) => {
    //Brayan: Guardamos el registro en la base de datos
    db.collection("users").doc(userId).set({
      name: name,
      photo: photo,
      date: (new Date()).getTime(),
      auth: auth,
      uid: userId
    })
    .then(() => {
      this.setState({showSpinner: false});
      //Actions.pop();
      if(userId && elementCode) Actions.comentarios({code: elementCode, userId: userId});
      if(previousKey) Actions.popTo(previousKey)
    })
    .catch(function(error) {
      Alert.alert(
        'Error',
        'Ha ocurrido un error, inténtalo nuevamente'
      )
    });
  }

  //Brayan: Funcion que nos permite autenticarnos con Facebook
  facebookAuth = async () => {
    const { type, token } = await Facebook.logInWithReadPermissionsAsync('1938036172948601', {
      permissions: ['public_profile'], /* behavior: 'native' */
    });
    if (type === 'success') {
      this.setState({showSpinner: true});
      const credential = firebase.auth.FacebookAuthProvider.credential(token);
      firebaseAuth.signInAndRetrieveDataWithCredential(credential).then((resp) => {
        this.addUserToDataBase(resp.user.uid, resp.user.displayName, resp.user.photoURL, 'facebook');
      }).catch((error) => {
        alert(JSON.stringify(error))
      })
    }
  }

  anonymousAuth = () => {
    console.log(this.state.nickName);
    if(this.state.nickName){
      firebaseAuth.signInAnonymously()
      .then((resp) => {
        //alert(JSON.stringify(user))
        this.setState({popupDialog:false})
        this.addUserToDataBase(resp.user.uid, this.state.nickName, null, 'anonymous');
      })
      .catch((error) => {
        this.setState({popupDialog:false})
        Alert.alert('Error', 'Parece que hubo un error al registrar el usuario')
      });
    } else {
      Alert.alert(
        'Alerta',
        'EL Nickname es requerido'
      )
    }
  }

  /*facebookAuth = () => {
    firebaseAuth.currentUser.linkWithRedirect(provider).then(function(result) {
      // Accounts successfully linked.
      var credential = result.credential;
      var user = result.user;
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      // ...
    });
  }*/

  render() {
    return (
    	<View style={[styles.root, COLOR_PALLETE.secondary]}>
         <Spinner visible={this.state.showSpinner} />
        <View style={styles.col1}>
          <TouchableOpacity onPress={this.closeModal}>
            <Text style={styles.btnCancelar}>Cancelar</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.col2}>
          <Image style={styles.logo} source={{uri: 'https://firebasestorage.googleapis.com/v0/b/appland-8885b.appspot.com/o/appland.png?alt=media&token=214a36af-f0a9-4d2b-ae10-0c828f433884'}}/>
          <View style={styles.layoutBtns}>
            <Text style={styles.title}>Crear cuenta</Text>
            <Text style={styles.subtitle}>Crea una cuenta y podrás usar funciones increibles dentro de la aplicación</Text>
            <TouchableOpacity onPress={this.facebookAuth}>
              <View style={[styles.socialBtn, styles.facebookBtn]}>
                <View style={styles.layoutBtn}>
                  <Ionicons style={styles.iconBtn} name="logo-facebook" />
                  <Text style={styles.lblBtn}>Registrarse con Facebook</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.setState({popupDialog:true})}}>
              <View style={[styles.socialBtn, styles.twitterBtn]}>
                <View style={styles.layoutBtn}>
                  <FontAwesome5 style={styles.iconBtn} name="users" />
                  <Text style={styles.lblBtn}>Anónimo</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.col3}></View>
        <PopupDialog
            width={0.75}
            height={340}
            visible={this.state.popupDialog}
            dialogAnimation={slideAnimation}
            onPress={()=> {alert('Hola mundo')}}
          >
                <View style={styles.popup}>
                  <View style={styles.closePopup}><TouchableOpacity onPress={()=> {this.setState({popupDialog:false})}}><Ionicons name="md-close" style={styles.closeIcon} /></TouchableOpacity></View>
                  <ScrollView>
                    <View style={styles.headerPopup}>
                      <View style={[styles.circle, COLOR_PALLETE.sideMenu]}>
                        <FontAwesome5 style={styles.iconPopup} name="user" />
                      </View>
                      <View style={styles.informationPopup}>
                        <Text style={styles.titlePopup}>Anónimo</Text>
                        <Text style={styles.subtitlePopup}>Registrarse de forma anónima mediante un Nickname</Text>
                      </View>
                      <TextInput
                        style={styles.input}
                        placeholder="Ingresar Nickname"
                        underlineColorAndroid='#FFF'
                        onChangeText={(nickName)=>this.setState({nickName})}
                        value={this.state.nickName}
                      />
                    </View>
                  </ScrollView>
                  <View style={styles.layoutButtons}>
                    <View style={styles.colButton}>
                      <Button onPress={()=>this.setState({popupDialog:false})} style={styles.btnPopup} textStyle={styles.lblButtonPopup}>
                        Cancelar
                      </Button>
                    </View>
                    <View style={styles.colButton}>
                      <Button onPress={this.anonymousAuth} style={styles.btnPopup} textStyle={styles.lblButtonPopup}>
                        Registrar
                      </Button>
                    </View>
                  </View>
                </View>
          </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {

  },
  subtitlePopup: {
    marginLeft: 20,
    marginRight: 20,
    textAlign: 'center',
    color: '#606060'
  },
  facebookBtn: {
    backgroundColor: '#465991'
  },
  twitterBtn: {
    backgroundColor: '#00acee'
  },
  googleBtn: {
    backgroundColor: '#da4c36'
  },
  layoutBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  iconBtn: {
    color: '#FFF',
    fontSize: 25
  },
  lblBtn: {
    color: '#FFF',
    fontSize: Platform.OS === 'ios' ? 16:14,
    marginLeft: 8
  },
  backgroundBtn1: {

  },
  background2: {

  },
  background3: {

  },
  subtitle: {
    width: Dimensions.get('window').width/1.3,
    textAlign: 'center',
    marginBottom: 20,
    marginTop: 10,
    color: '#FFF'
  },
  title: {
    fontSize: 22,
    marginTop: 20,
    color: '#FFF'
  },
  col3: {
    flex: 2
  },
  layoutBtns: {
    alignItems: 'center'
  },
  socialBtn: {
    height: 44,
    width: Dimensions.get('window').width/1.4,
    backgroundColor: '#000',
    borderRadius: 22,
    marginTop: 10,
    justifyContent: 'center'
  },
  logo: {
    height: Platform.OS === 'ios' ? 150:120,
    width: Platform.OS === 'ios' ? 230:195,
    justifyContent: 'center',
    alignSelf: 'center'
  },
  root: {
    flex: 1,
  },
  col1: {
    flex: 1,
    paddingTop: 35,
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  col2: {
    flex: 12,
    justifyContent: 'center'
  },
  btnCancelar: {
    fontSize: 16,
    color: '#FFF'
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
  layoutButtons: {
    height: 50,
    flexDirection: 'row',
    padding: 5
  },
  input: {
    height: 40,
    margin: 10,
    paddingTop: Platform.OS === 'ios' ? 10:0,
    paddingLeft: 10,
    borderColor: '#DDD', 
    borderWidth: 1,
  },
  presenterPopup: {
    padding: 15,
  },
  closeIcon: {
    fontSize: 25,
    color: '#000'
  },
  closePopup: {
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingTop: 15,
    color: '#000',
    fontSize: 20
  },
  label1: {
    fontWeight: '500',
    fontSize: 15
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
  popup: {

  },
  iconPopup: {
    color: '#FFF',
    fontSize: 35,
  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default connect(mapStateToProps)(LoginView);

