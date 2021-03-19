import {StyleSheet} from 'react-native';

const LOGOS = {
  //primary: require('./../img/hitRadioLogo.png'),
  //secondary: require('./../img/hitRadioLogo.png'),
  //samll: require('./../img/hitRadioLogo.png')
  primary: require('./../img/logoApplandPrimary.png'),
  secondary: require('./../img/logoApplandSecondary.png'),
  samll: require('./../img/smallLogoAppland.png')
}

const CONFIG = {
  name: 'Appland',
  subName: 'The land of apps'
}

const COLOR_PALLETE = StyleSheet.create({
  sideMenu: {
    /*backgroundColor: '#ec1b23'*/
    backgroundColor: '#00c0c6'
  },
  primary: {
    backgroundColor: '#000'
  },
  primary1: {
  	//backgroundColor: '#f16523',
    backgroundColor: '#00c0c6'
  },
  secondary: {
    backgroundColor: '#000',
  },
  headerTabs: {
  	backgroundColor: '#f16523'
  },
  customButton: {
    backgroundColor: '#f16523'
  },
  tabBarUnderlineStyle: {
  	backgroundColor: '#fdbe07'
  },
  txtPrimary: {
  	color: '#f16523'
  },
  borderPrimary: {
    borderColor: '#f16523'
  },
  colorItemCalendar: {
    backgroundColor: '#f16523'
  },
  //View: Home
  backgroundHome: {
    //backgroundColor: '#ffcc0e',
    backgroundColor: '#000'
  },
  colorIconSideMenu: {
    //color: '#000',
    color: '#FFF'
  },
  colorTitleMenu: {
    //color: '#000',
    color: '#FFF'
  }
});

export {COLOR_PALLETE, LOGOS, CONFIG};
