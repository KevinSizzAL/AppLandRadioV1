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
import { Container, Header, Content, Tab, Tabs, TabHeading, ScrollableTab } from 'native-base';
import {COLOR_PALLETE} from './../commons/Color';
import ImageViewer from 'react-native-image-zoom-viewer';
import ItemCalendar from './../components/ItemCalendar';
import PopupDialog, { SlideAnimation } from 'react-native-popup-dialog';
import Journalist from './../components/Journalist';
import Button from 'apsl-react-native-button';
import {db, firebaseAuth} from './../commons/FirebaseConection';
import TabProgramming from './../components/TabProgramming';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Actions } from 'react-native-router-flux';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

const slideAnimation = new SlideAnimation({
  slideFrom: 'bottom',
});

//Iconos utilizados
class CalendarView extends Component{
  constructor(){
    super();
    this.state = {
      popupDialog: undefined,
      openPopupDialog: () =>{
        this.state.popupDialog.show();
      },
      radioProgramming: [],
      transmissionSelected: {
        startTime: '',
        endTime: '',
        broadcasters:[]
      }
    }
  }

  selectTransmissionSelected = (transmission) => {
    Actions.detalleDeTransmision({transmission})
  }

  componentDidMount(){
    //Brayan: Obtenemos la lista de categorias
    db
    .collection("radioProgrammingMaps/").
    get()
    .then(async(querySnapshot) => {
      let list = []
      querySnapshot.forEach(async(doc) => {
        list.push({selected: false, ...doc.data()});
      });
      this.setState({radioProgramming: list})
    })
    .catch(function(error) {
      console.log('Error', error);
      alert('Ha ocurrido un error, intentelo mas tarde')
    });
  }

  transmissionRender= (index=0) =>{
    let response = [];
    if(this.state.radioProgramming){
      if(this.state.radioProgramming && this.state.radioProgramming.length >= (index + 1)){
        const radio_programming = this.state.radioProgramming[index]
        if(radio_programming.transmissions1 && radio_programming.transmissions1.length > 0){
          radio_programming.transmissions1.forEach((value, index) => {
            response.push(<ItemCalendar event={this.selectTransmissionSelected} key={index.toString()} data={value} />)
          });
        }
      }
    }
    return response.length > 0 ? response : <ActivityIndicator color={'blue'} size={60} style={{alignSelf:'center', marginTop:60}} />;
  }

  journalistRender = () => {
    let response = [];
    //return
    if(this.state.radioProgramming && this.state.transmissionSelected.broadcasters){
      /*for(let i = 0; i<this.state.transmissionSelected.broadcasters.length; i++){
        response.push(<Journalist data={this.state.transmissionSelected.broadcasters[i]}/>);
      }*/
    }
    return response;
  }

  render() {
    return (
        <Container>
          <StatusBar barStyle="light-content"/>
          <Header style={COLOR_PALLETE.headerTabs} hasTabs />
          <Tabs renderTabBar={()=> <ScrollableTab />} tabBarUnderlineStyle={COLOR_PALLETE.tabBarUnderlineStyle}>
            <Tab  heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Lunes</Text></TabHeading>}>
              <Content style={styles.content}>
                <Text style={styles.title}>Lista de programas (Lunes)</Text>
                <ScrollView>
                  {this.transmissionRender(0)}
                </ScrollView>
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Martes</Text></TabHeading>}>
              <Content style={styles.content}>
                <Text style={styles.title}>Lista de programas (Martes)</Text>
                {this.transmissionRender(1)}
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Miércoles</Text></TabHeading>}>
              <Content style={styles.content}>
                <Text style={styles.title}>Lista de programas (Miércoles)</Text>
                {this.transmissionRender(2)}
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Jueves</Text></TabHeading>}>
              <Content style={styles.content}>
                <Text style={styles.title}>Lista de programas (Jueves)</Text>
                {this.transmissionRender(3)}
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Viernes</Text></TabHeading>}>
              <Content style={styles.content}>
                <Text style={styles.title}>Lista de programas (Viernes)</Text>
                {this.transmissionRender(4)}
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Sábado</Text></TabHeading>}>
              <Content style={styles.content}>
                <Text style={styles.title}>Lista de programas (Sábado)</Text>
                {this.transmissionRender(5)}
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Text style={styles.text}>Domingo</Text></TabHeading>}>
              <Content style={styles.content}>
                <Text style={styles.title}>Lista de programas (Domingo)</Text>
                {this.transmissionRender(6)}
              </Content>
            </Tab>
          </Tabs>
          <PopupDialog
            width={0.75}
            height={520}
            ref={(popupDialog) => { this.state.popupDialog = popupDialog; }}
            dialogAnimation={slideAnimation}
          >
            <TouchableOpacity style={{height: 40}} onPress={()=> {this.state.popupDialog.dismiss()}}><Ionicons name="md-close" style={styles.closeIcon} /></TouchableOpacity>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.popup}>
                <View style={styles.closePopup}>
                </View>
                  <View style={styles.headerPopup}>
                    <Image style={[styles.circle]} source={{uri: this.state.transmissionSelected.image}} />
                    <View style={styles.informationPopup}>
                      <Text style={styles.titlePopup}>{this.state.transmissionSelected.title}</Text>
                      <Text>{this.state.transmissionSelected.startTime} - {this.state.transmissionSelected.endTime}</Text>
                    </View>
                    <View style={styles.presenterPopup}>
                      <Text style={[styles.label1, {marginLeft: 15}]}>Presentadores</Text>
                      <View style={styles.journalists}>
                        <ScrollView contentContainerStyle={{padding: 10}} horizontal={true} showsHorizontalScrollIndicator={false}>
                          {this.journalistRender()}
                        </ScrollView>
                      </View>
                    </View>
                    <View style={styles.descriptionPopup}>
                      <Text style={styles.label1}>Descripción</Text>
                      <Text style={styles.descriptionProgram}>{this.state.transmissionSelected.description}</Text>
                    </View>
                  </View>
              </View>
            </ScrollView>
          </PopupDialog>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  descriptionProgram: {
    color: '#505050'
  },
  alarmaIcon: {
    fontSize: 15
  },
  reminderBtn: {
    width: 120,
    height: 30,
    borderRadius: 15,
    alignSelf: 'center',
    marginTop: 10,
  },
  journalists: {
    flexDirection: 'row',
  },
  presenterPopup: {
    paddingTop: 15,
  },
  closeIcon: {
    fontSize: 25,
    top: 10,
    alignSelf: 'flex-end',
    right: 15
  },
  closePopup: {
    alignItems: 'flex-end',
    paddingRight: 15,
    paddingTop: 15
  },
  label1: {
    fontWeight: '500',
    fontSize: 15
  },
  descriptionPopup: {
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 20
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
    fontSize: 30
  },
  circle: {
    height: 80,
    width: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  headerPopup: {
    flex: 1
  },
  content: {
    height: 1, 
    padding: 15, 
    paddingTop: 30,
    paddingBottom: 30,
    backgroundColor: '#f4f4f4'
  },
  title: {
    fontWeight: '500',
    fontSize: Platform.OS === 'ios' ? 16:14,
    marginBottom: 10
  },
  text: {
    color: '#FFF'
  }, 
});

export default connect(mapStateToProps)(CalendarView);

