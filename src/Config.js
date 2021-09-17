/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {Router, Scene, Stack, Actions, Modal, ActionConst} from 'react-native-router-flux';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Alert
} from 'react-native';
import {connect} from 'react-redux';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';

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
import TransmissionDetails from './views/TransmissionDetails'
import PopupDialog, { SlideAnimation, DialogButton } from 'react-native-popup-dialog';
import { firebaseAuth, db } from './commons/FirebaseConection';


mapStateToProps = (state)=>{
  return{
    mostrar: state.mostrarBarra
  }
}


const QuestionDialog = ({open=true, onCloseDialog=()=>{}, options={}, question, correct_answer}) => {
  const slideAnimation = new SlideAnimation({
    slideFrom: 'bottom',
  });
  const [selected, setSelected] = React.useState(null)
  // const [count, setCount] = React.useState(40)
  // const [trigger, setTrigger] = React.useState(false)
  // let interval = setInterval(()=>{setTrigger(!trigger)}, 3500)
  // React.useEffect(()=>{
  //   if(count!==0) setCount(count-1)
  //   else {clearInterval(interval) ;onCloseDialog()}
  // },[trigger])
  // if(count === 0) onCloseDialog()
  const onSendAnswer = (answered_well=false) => {
    setSelected(null)
    const registerAnswerError = () => {Alert.alert('Error', 'Parece que hubo un error al registrar tu respuesta'); onCloseDialog()}
    firebaseAuth.onAuthStateChanged(({isAnonymous, uid})=>{
      if(uid){
        db
        .collection('/questionComments/DailyQuestions/usersAnswered')
        .add({
          uid,
          answered_well,
          isAnonymous,
          date: +new Date()
        })
        .then(()=>{onCloseDialog()})
        .catch(()=>{registerAnswerError()})
        onCloseDialog()
      }else{
        registerAnswerError()
      }
    })
  }
  const onSendPress = () => {
    if(!selected) return Alert.alert('Encuenta diaria', 'Debes seleccionar una opción')
    if(selected === correct_answer){
      onSendAnswer(true)
      Alert.alert('Bien', 'Has acertado correctamente, eres uno de los participantes del sorteo')
    }else{
      onSendAnswer(false)
      Alert.alert('Oh oh', 'Parece que no has acertado la respuesta correcta, sigue intentando con los programas diarios')
    }
  }
  return(
    <PopupDialog 
      visible={open}
      width={0.75}
      height={355}
      overlayOpacity={0.5}
      dialogAnimation={slideAnimation}
      onPress={()=> {alert('Hola mundo')}} >
        <View>
          <Text style={{textAlign:'center', fontSize:20, fontWeight:'bold', marginTop:'4%', marginHorizontal:10}} >{question}</Text>
          <View style={{justifyContent:'space-between'}} >
            <View>
              {options.map((value, index)=>{
                return(
                  <TouchableOpacity onPress={()=>setSelected(value.option)} key={index.toString()} style={{flexDirection:'row', marginTop:8,justifyContent:'space-between', alignSelf:'flex-start', marginHorizontal:6}} >
                    <View style={{...styles.root,backgroundColor:selected === value.option ? '#f48a1f' : '#dfdfdf'}} ><Text style={styles.name} >{value.option}</Text></View>
                    <Text style={styles.text} >{value.text}</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
            <View style={{ width:'85%', alignSelf:'center', height:50, marginTop:20}} >
              <View style={{flexDirection:'row', justifyContent:'space-between',flex:1}} >
                <TouchableOpacity onPress={()=>onCloseDialog()} style={styles.optionButton} >
                  <Text style={{fontSize:15, color:'red', alignSelf:'center'}} >Cerrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>onSendPress()} style={styles.optionButton} >
                <Text style={{fontSize:15, color:'green', alignSelf:'center'}} >Enviar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* <Text style={{alignSelf:'center'}} >Tempo restante: {count} segundos</Text> */}
        </View>
    </PopupDialog>
  )
}

class Config extends Component {

  constructor(props){
    super(props);
    this.state = {
      mostrarSide: false,
      dailiQuestionPopup: false,
      dailyQuestionData:{
        options:[],
        correct_answer:'',
        question:'',
      }
    }
  }

  componentDidMount(){
    // Obtener la pregunta diaria
    db
    .collection('/questionComments')
    .doc('DailyQuestions')
    .onSnapshot(snapshot => {
      firebaseAuth.onAuthStateChanged(({isAnonymous, uid}) => {
        if(uid){
          db
          .collection('/questionComments/DailyQuestions/usersAnswered')
          .where('uid', '==', `${uid}`)
          .get()
          .then(data => {
            // se verifica que el usuario no haya respondido antes para abrir el popup de pregunta diaria
            if(data.docs.length === 0){
              this.setState({dailyQuestionData: snapshot.data(), dailiQuestionPopup:true})
            }
          })
          .catch(err => {console.log('in Catch', err);})
        }
      })
    })
    // Setear la conexión del usuario, para saber su iuntervalo de conexión
    // db
    // .collection()
  }

  render() {
    const {correct_answer, options, question} = this.state.dailyQuestionData
    return (
      <>
      <QuestionDialog 
        onCloseDialog={()=>this.setState({dailiQuestionPopup:false})}
        correct_answer={correct_answer}
        options={options}
        question={question}
        open={this.state.dailiQuestionPopup} />
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
                key="detalleDeTransmision" 
                component={TransmissionDetails}
                title="Detalle de transmisión"
                titleStyle={styles.whiteColor}
                headerTintColor="#FFF"
                navigationBarStyle={COLOR_PALLETE.headerTabs}
                navTransparent={true}
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
      </>
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
  },
  name: {
    fontSize: Platform.OS === 'ios' ? 24:20,
    alignSelf: 'center'
  },
  root: {
    height: Platform.OS === 'ios' ? 48:42,
    width: Platform.OS === 'ios' ? 48:42,
    borderRadius: Platform.OS === 'ios' ? 24:21,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },
  text:{
    fontSize: Platform.OS === 'ios' ? 22:18,
    textAlignVertical:'center',
    marginLeft:7
  },
  optionButton:{
    width:'45%', 
    height:'70%', 
    borderWidth:1, 
    borderColor:'#aaa', 
    borderRadius:4,
    justifyContent:'center'
  }
});

export default connect(mapStateToProps)(Config);