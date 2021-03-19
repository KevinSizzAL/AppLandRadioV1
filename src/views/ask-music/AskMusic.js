/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @floww
 */

import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import {connect} from 'react-redux';
import store from './../../redux/store';
import Button from 'apsl-react-native-button';

import SideMenuCustomised from './../../components/SideMenuCustomised';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import {COLOR_PALLETE} from './../../commons/Color';
import CustomButton from './../../components/CustomButton';
import {db, firebaseAuth} from './../../commons/FirebaseConection';
import ProposedQuestion from './../../components/ProposedQuestion';
import PopupDialog, { SlideAnimation, DialogButton } from 'react-native-popup-dialog';
import { Ionicons } from '@expo/vector-icons';
import Spinner from 'react-native-loading-spinner-overlay';



import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  Keyboard,
  ActivityIndicator,
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

class AskMusic extends Component{
  constructor(){
    super();
    this.state = {
      requestedSongs: [],
      newRequest: null,
      dialogStyle: {borderRadius: 20,},
      spinner: false,
      showSpinner: true,
      mostrarSpinner: true,
    }
  }

  getSongs = () =>{
    that = this;
    //Brayan: Obtenemos la lista de categorias
    db.collection("requestedSongs/").orderBy('date', 'desc').limit(200)
      .onSnapshot(function(querySnapshot) {
        let list = [];
        querySnapshot.forEach(function(doc) {
          list.push({like: false, ...doc.data()});
        });
        that.setState({requestedSongs: list, showSpinner: false});
    });

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

  componentWillMount = () =>{
    this.getSongs();
  }

  openPopupDialog = () => {
    this.setState({newQuestion: undefined})
    this.state.popupDialog.show();
  }

  renderRequestedSongs = () => {
    let content = [];
    for(let i = 0; i<this.state.requestedSongs.length; i++){
      content.push(<ProposedQuestion config={{show: false}} likeEvent={this.likeEvent} data={this.state.requestedSongs[i]}/>);
    }
    return content;
  }

  addNewRequest = () => {
    if(this.state.newRequest){
      this.setState({spinner: true});
      const newRequest = {
        date: (new Date()).getTime(),
        nickName: 'Fernando',
        question: this.state.newRequest,
        state: '0',
      }
      const comentariesRef = db.collection("requestedSongs")
        .add(newRequest)
        .then((data) => {
          db.collection("requestedSongs").doc(data.id).update({code: data.id});
          this.state.popupDialog.dismiss();
          this.setState({spinner: false, newRequest: ''});
        })
        .catch(function(error) {
            this.setState({spinner: false});
            showAlert('Error', 'Ha ocurrido un error, intentelo mas tarde');
        });
    } else {
      showAlert('Atención', 'Debe de agregar una petición');
    }
  }

  render() {
    const menu = <SideMenuCustomised/>;
    return (
    	<Container>
          <Spinner
            visible={this.state.spinner}
            textContent={'Registrando...'}
            textStyle={styles.spinnerTextStyle}
          />
          <StatusBar barStyle="light-content"/>
          <Header style={[COLOR_PALLETE.headerTabs, {height: Platform.OS === 'ios' ? 70:80}]} hasTabs />
          <Content style={styles.body}>
          {this.state.showSpinner ? <ActivityIndicator size={Platform.OS === 'ios' ? "small":"large"} color="#00c0c6" />: null} 
            {this.renderRequestedSongs()}
          </Content>
          <CustomButton title={"Solicitar canción"} action={this.openPopupDialog} />
          <PopupDialog
              width={0.75}
              height={400}
              ref={(popupDialog) => { this.state.popupDialog = popupDialog; }}
              dialogAnimation={slideAnimation}
              dialogStyle={this.state.dialogStyle}
            >
              <View style={styles.popup}>
                <View style={styles.closePopup}><TouchableOpacity onPress={()=> {this.state.popupDialog.dismiss()}}><Ionicons name="md-close" style={styles.closeIcon} /></TouchableOpacity></View>
                <ScrollView>
                  <View style={styles.headerPopup}>
                    <View style={[styles.circle, COLOR_PALLETE.colorItemCalendar]}>
                      <Ionicons style={styles.iconPopup} name="md-musical-notes" />
                    </View>
                    <View style={styles.informationPopup}>
                      <Text style={styles.titlePopup}>Pedir una canción</Text>
                      <Text style={styles.description}>¿Quieres que tu radio favorita haga sonar una canción que quieres escuchar o dedicársela a alguien? ¡Pídela!</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Escribir petición..."
                      multiline={true}
                      numberOfLines={4}
                      value={this.state.newRequest}
                      underlineColorAndroid='#FFF'
                      onChangeText={(value) => {
                        this.setState({newRequest: value})
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
                    <Button onPress={this.addNewRequest} style={styles.btnPopup} textStyle={styles.lblButtonPopup}>
                      Hacer petición
                    </Button>
                  </View>
                </View>
              </View>
        </PopupDialog>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF',
    fontSize: 15,
  },
  description: {
    textAlign: 'center'
  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  layoutButtons: {
    height: 50,
    flexDirection: 'row',
    padding: 5
  },
  colButton: {
    flex: 1,
    padding: 5
  },
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
    height: 80,
    margin: 10,
    paddingTop: 10,
    paddingLeft: 10,
    borderColor: '#DDD', 
    borderWidth: 1,
  },
  presenterPopup: {
    padding: 15,
  },
  text: {
    color: '#FFF'
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
    color: '#FFF'
  },
});
export default connect(mapStateToProps)(AskMusic);

