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

import SideMenuCustomised from './../components/SideMenuCustomised';
import {Actions} from 'react-native-router-flux';
import { Container, Header, Content, Tab, Tabs, TabHeading, Card, CardItem, Body } from 'native-base';
import {COLOR_PALLETE} from './../commons/Color';
import Commentary from './../components/Commentary';
import {db, firebaseAuth} from './../commons/FirebaseConection';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform,
  ActivityIndicator
} from 'react-native';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

class ComentsView extends Component{
  constructor(){
    super();
    this.state = {
      commentsList: [],
      comentary: null,
      listHeight: 0,
      scrollViewHeight: 0,
      user: {},
      showSpinner: true
    }
  }

  componentWillMount = () =>{
    //console.warn(this.props.navigation.state.params.code);
    if(this.props.navigation.state.params.code){
      db.collection("questionComments").doc(this.props.navigation.state.params.code).collection('comentaries').orderBy("date", 'asc')
      .onSnapshot((querySnapshot) => {
          let list = [];
          querySnapshot.forEach((doc) => {
            list.push(doc.data());
          });
          //alert(JSON.stringify(list))
          this.setState({commentsList: list, showSpinner: false});
        });
    }

    if(this.props.navigation.state.params.userId){
      //Obtenemos la informacion del usuario logueado
      db.collection("users/").where('uid', '==', this.props.navigation.state.params.userId).get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          //alert(JSON.stringify(doc.data()))
          this.setState({user: doc.data()})
        });
      })
      .catch(function(error) {
          alert('Ha ocurrido un error, intentelo mas tarde')
      });
    }
  }

  renderCommentary = () => {
    let content = [];
    for(let i = 0; i<this.state.commentsList.length; i++)
      content.push(<Commentary config={this.state.commentsList[i]}/>);
    return content;
  }

  changePosition = () => {        
      this.scrollView.scrollToEnd({animated: false});
  }

  addComentary = (codeQuestion, content) => {
    if(this.state.comentary != null){
      const comentariesRef = db.collection("questionComments").doc(this.props.navigation.state.params.code).collection('comentaries')
      .add({
        codeQuestion: this.props.navigation.state.params.code,
        content: this.state.comentary,
        nickName: this.state.user.name,
        date: (new Date()).getTime(),
        photo: this.state.user.photo,
        auth: this.state.user.auth,
        uid: this.props.navigation.state.params.userId
      })
      .then((data) => {
        const ref1 = db.collection("dayQuestions").doc(this.props.navigation.state.params.code);
        ref1.update({answersNumber: this.state.commentsList.length});

        //Brayan: Agregamos la referencia del usuario que ha comentado sobre este tema
        db.collection("dayQuestions/").where('code', '==', this.props.navigation.state.params.code).get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            let isAdd = false;
            let question = doc.data();
            for(let i = 0; i<question.listUsers.length; i++){
              if(question.listUsers[i].uid == this.props.navigation.state.params.userId)
                isAdd = true;
            }

            if(!isAdd && question.listUsers.length < 5){
              question.listUsers.push({nickName: this.state.user.name, photo: this.state.user.photo, auth: this.state.user.auth, uid: this.props.navigation.state.params.userId});
              const ref2 = db.collection("dayQuestions").doc(this.props.navigation.state.params.code);
              ref2.update(question);
            }
          });
        })
        .catch(function(error) {
            alert('Ha ocurrido un error, intentelo mas tarde')
        });
      })
      this.setState({comentary: null});
    }
  }

  render() {
    const menu = <SideMenuCustomised/>;
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? 70:78} style={styles.container} behavior="padding" enabled={true}>
              <ScrollView
                style={{flex: 1, backgroundColor: '#FFF'}}
                ref={ref => this.scrollView = ref}
                onContentSizeChange={this.changePosition}
               >
                {this.state.showSpinner ? <ActivityIndicator size={Platform.OS === 'ios' ? "small":"large"} color="#00c0c6" />: null}
                {this.renderCommentary()}
              </ScrollView>
              <View style={styles.inputLayout}>
                  <View style={styles.col1}>
                    <TextInput
                      style={styles.input}
                      placeholder="Opinar sobre este tema..."
                      value={this.state.comentary}
                      underlineColorAndroid='#FFF'
                      onChangeText={(value) => {
                        this.setState({comentary: value})
                      }}
                    />
                  </View>
                  <View style={styles.col2}>
                    <TouchableOpacity onPress={this.addComentary}>
                      <Ionicons name="md-send" style={styles.sendIcon}/>
                    </TouchableOpacity>
                  </View>
              </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  sendIcon: {
    fontSize: Platform.OS === 'ios' ? 30:26,
    color: '#404040',
    alignSelf: 'center',
  },
  input: {
    height: Platform.OS === 'ios' ? 40:34, 
    borderColor: '#CCC', 
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
  },
  col1: {
    flex: 5,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  col2: {
    flex: 1,
    justifyContent: 'center'
  },
  comentsLayout: {
    flex: 11
  },
  inputLayout: {
    flexDirection: 'row',
    height: 50,
    borderColor: '#CCC', 
    borderWidth: 1,
  }
});

export default connect(mapStateToProps)(ComentsView);

