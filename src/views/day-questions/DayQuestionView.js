/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @floww
 */

import React, { Component } from 'react';
import SideMenu from 'react-native-side-menu';
import {connect} from 'react-redux';
import store from './../../redux/store';
import { Ionicons } from '@expo/vector-icons';
import SideMenuCustomised from './../../components/SideMenuCustomised';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import {COLOR_PALLETE} from './../../commons/Color';
import Question from './components/Question';
import {db, firebaseAuth} from './../../commons/FirebaseConection';
import CustomButton from './../../components/CustomButton';
import ProposedQuestion from './../../components/ProposedQuestion';
import { LinearGradient } from 'expo';
import PopupDialog, { SlideAnimation, DialogButton } from 'react-native-popup-dialog';
import Button from 'apsl-react-native-button';
import {showAlert} from './../../commons/Commons';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Platform,
  ActivityIndicator,
  TextInput,
  Keyboard
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

class DayQuestionView extends Component{
  constructor(){
    super();
    this.state = {
      listQuestions: [],
      proposedQuestions: [],
      myLikes: [],
      lastVisible: null,
      mostrarSpinner: true,
      showSpinner: true,
      items: {},
      popupDialog: undefined,
      dialogStyle: {borderRadius: 20,},
      newQuestion: undefined,
      spinner: false
    }
  }

  likeEvent = (codeQuestion, like, likes) => {
    if(like){//Se ejecuta cuando se da like
      let myLikes = this.state.myLikes;
      myLikes.push({nickName: 'Fernando', uid: 'dxlInmBBNhT86OtDyjmhjS3UB072', question: codeQuestion});
      this.setState({myLikes: myLikes});
      const comentariesRef = db.collection("likesQuestions")
        .add({nickName: 'Fernando', uid: 'dxlInmBBNhT86OtDyjmhjS3UB072', question: codeQuestion})
        .then((data) => {
          myLikes[myLikes.length - 1].code = data.id;
          this.setState({myLikes: myLikes});
          db.collection("likesQuestions").doc(data.id).update({code: data.id});
          db.collection("proposedQuestions").doc(codeQuestion).update({likes: likes});
        })
        .catch(function(error) {
            showAlert('Error', 'Ha ocurrido un error, intentelo mas tarde');
        });
    } else {//Se ejecuta cuando se quita like
      let myLikes = this.state.myLikes;
      let likeQuestion = {};
      for(let i = 0; i<myLikes.length; i++){
        if(myLikes[i].question == codeQuestion){
          likeQuestion = myLikes[i];
          myLikes.splice(i, 1);
        }
      }
      this.setState({myLikes: myLikes});

      //ELiminamos las referencias
      const comentariesRef = db.collection("likesQuestions").doc(likeQuestion.code)
        .delete()
        .then((data) => {
          db.collection("proposedQuestions").doc(codeQuestion).update({likes: likes});
        })
        .catch(function(error) {
            showAlert('Error', 'Ha ocurrido un error, intentelo mas tarde');
        });
    }
  }

  openPopupDialog = () => {
    this.setState({newQuestion: undefined})
    this.state.popupDialog.show();
  }

  componentWillMount = () =>{
    this.getQuestions(false);
  }

  addNewQuestion = () => {
    if(this.state.newQuestion){
      this.setState({spinner: true});
      const newQuestion = {
        auth: 'anonymous',
        date: (new Date()).getTime(),
        likes: 0,
        nickName: 'Fernando',
        question: this.state.newQuestion,
        uid: 'dxlInmBBNhT86OtDyjmhjS3UB072'
      }
      const comentariesRef = db.collection("proposedQuestions")
        .add(newQuestion)
        .then((data) => {
          db.collection("proposedQuestions").doc(data.id).update({code: data.id});
          this.state.popupDialog.dismiss();
          this.setState({spinner: false});
        })
        .catch(function(error) {
            this.setState({spinner: false});
            showAlert('Error', 'Ha ocurrido un error, intentelo mas tarde');
        });
    } else {
      showAlert('Atención', 'Debe de agregar un tema');
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

  validateLikes = () => {
    if(this.state.proposedQuestions.length != 0 && this.state.myLikes.length != 0){
      let questions = this.state.proposedQuestions;
      for(let i = 0; i<this.state.myLikes.length; i++){
        for(let j = 0; j<questions.length; j++){
          if(this.state.myLikes[i].question == questions[j].code){
            questions[j].like = true;
          }
        }
      }
      this.setState({proposedQuestions: questions})
    }
  }

  getQuestions = (concat) => {
    let that = this;
    //Brayan: Obtenemos la lista de categorias
    db.collection("dayQuestions/").orderBy('date', 'desc').limit(100).get()
      .then(function(querySnapshot) {
        let list1 = [];
        querySnapshot.forEach(function(doc) {
          list1.push(doc.data());
        });
        that.setState({listQuestions: list1, showSpinner: false});
      })
      .catch(function(error) {
          showAlert('Error', 'Ha ocurrido un error, intentelo mas tarde');
          that.setState({showSpinner: false});
      });

    //Brayan: Obtenemos la lista de categorias
    db.collection("likesQuestions/").where('uid', '==', 'dxlInmBBNhT86OtDyjmhjS3UB072').get()
      .then(function(querySnapshot) {
        let list2 = [];
        querySnapshot.forEach(function(doc) {
          list2.push(doc.data());
        });
        that.setState({myLikes: list2, showSpinner: false});
        that.validateLikes();
      })

    //Brayan: Obtenemos la lista de categorias
    db.collection("proposedQuestions/").orderBy('likes', 'desc').limit(100)
      .onSnapshot(function(querySnapshot) {
        let list3 = [];
        querySnapshot.forEach(function(doc) {
          list3.push({like: false, ...doc.data()});
        });
        that.setState({proposedQuestions: list3, showSpinner: false});
        that.validateLikes();
      })
  }

  renderQuestions = () => {
    let content = [];
    for(let i = 0; i<this.state.listQuestions.length; i++){
      content.push(<Question config={this.state.listQuestions[i]}/>);
    }
    return content;
  }

  renderProposedQuestion = () => {
    let content = [];
    for(let i = 0; i<this.state.proposedQuestions.length; i++){
      content.push(<ProposedQuestion config={{show: true}} likeEvent={this.likeEvent} data={this.state.proposedQuestions[i]}/>);
    }
    return content;
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
          <Tabs tabBarUnderlineStyle={COLOR_PALLETE.tabBarUnderlineStyle}>
            <Tab  heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Tema del día</Text></TabHeading>}>
              <Content style={{padding: 10}}>
                <View style={styles.header}>
                  <ScrollView style={{flex: 1}}>
                  {this.state.showSpinner ? <ActivityIndicator size={Platform.OS === 'ios' ? "small":"large"} color="#00c0c6" />: null}
                  {this.renderQuestions()}
                  </ScrollView>
                </View>
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Ionicons style={styles.icon} name="md-contacts" /><Text style={styles.text}>Temas propuestos</Text></TabHeading>}>
              <Content style={{height: 1}}>
                {this.renderProposedQuestion()}
              </Content>
            </Tab>
          </Tabs>
          <CustomButton title={"Proponer un tema"} action={this.openPopupDialog}/>
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
                      <Ionicons style={styles.iconPopup} name="md-help" />
                    </View>
                    <View style={styles.informationPopup}>
                      <Text style={styles.titlePopup}>Proponer un tema</Text>
                      <Text style={styles.description}>¿Quieres que en la siguiente transmisión hablemos sobre un tema en específico? Proponlo</Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholder="Ingresar tema..."
                      multiline={true}
                      numberOfLines={4}
                      value={this.state.newQuestion}
                      underlineColorAndroid='#FFF'
                      onChangeText={(value) => {
                        this.setState({newQuestion: value})
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
                    <Button onPress={this.addNewQuestion} style={styles.btnPopup} textStyle={styles.lblButtonPopup}>
                      Proponer tema
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

export default connect(mapStateToProps)(DayQuestionView);

