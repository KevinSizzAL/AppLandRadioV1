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
import ItemGalery from './../components/ItemGalery';
import ItemRingTone from './../components/ItemRingTone';
import ItemVideo from './../components/ItemVideo';
import { Container, Header, Content, Tab, Tabs, TabHeading } from 'native-base';
import {COLOR_PALLETE} from './../commons/Color';
import ImageViewer from 'react-native-image-zoom-viewer';
import {db, firebaseAuth} from './../commons/FirebaseConection';
import { Video } from 'expo';
import VideoPlayer from '@expo/videoplayer';
import {Actions} from 'react-native-router-flux';

import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StatusBar,
  Modal,
  Dimensions
} from 'react-native';

mapStateToProps = (state)=>{
  return{
    mostrarSide: state.mostrarSide
  }
}

class MultimediaView extends Component{
  constructor(){
    super();
    this.state = {
      showImageModal: false,
      showVideoModal: false,
      urlVideoSelected: '',
      shouldPlay: false,
      mute: false,
      showGalery: (index) => {
        this.setState({showImageModal: true})
      },
      imagesGalery: [],
      ringTones: [],
      indexImagesGalery: 0,
    }
  }

  selectedItemGalery = (type, index, urlVideo) => {
    if(type == 'image')
      this.setState({showImageModal: true, indexImagesGalery: index});
    else
      this.setState({urlVideoSelected: urlVideo, showVideoModal: true, shouldPlay: true});
  }

  handlePlayAndPause = () => {  
    this.setState((prevState) => ({
       shouldPlay: !prevState.shouldPlay  
    }));
  }

  handleVolume = () => {
    this.setState(prevState => ({
      mute: !prevState.mute,  
    }));
  }

  showGalery = (index) => {
    this.setState({showImageModal: true, indexImagesGalery: index});
  }

  showVideo = (urlVideo) => {
    this.setState({urlVideoSelected: urlVideo, showVideoModal: true});
  }
  
  renderImageGalery = () => {
    let content = [];
    for(let i = 0; i<this.state.imagesGalery.length; i++)
      content.push(<ItemGalery config={{index: i, ...this.state.imagesGalery[i]}} event={this.selectedItemGalery} />);
    return content;
  }

  showAudioPlayer = (index) => {
    Actions.player({ringTones: this.state.ringTones, index: index});
  }

  renderRingTones = () => {
    let content = [];
    for(let i = 0; i<this.state.ringTones.length; i++)
      content.push(<ItemRingTone event={() => this.showAudioPlayer(i)} config={{index: i, ...this.state.ringTones[i]}} />);
    return content;
  }

  componentWillMount = () =>{
    let that = this;
    //Brayan: Obtenemos la lista de categorias
    db.collection("imagesGalery/").get()
      .then(function(querySnapshot) {
        let list = [];
        let i = 0;
        let item1 = null;
        let item2 = null;
        let n = 0;
        querySnapshot.forEach(function(doc) {
          item1 = doc.data();
          if(item1.type == 'video')
            item2 = item1;
          
          //Verificamos que hay un video disponible
          if(((list.length + n*2) - 1)%3 == 2){
            if(item2 != null){
              list.push({selected: false, ...item2});
              item2 = null;
              n++;
            } else {
              list.push({selected: false, ...item1});
            }
          } else {
            if(item1.type != 'video'){
              list.push({selected: false, ...item1});
            }
          }
        });
        //alert(JSON.stringify(list))
        that.setState({imagesGalery: list});
      })
      .catch(function(error) {
          alert('Ha ocurrido un error, intentelo mas tarde')
      });

    //Brayan: Obtenemos la lista de categorias
    db.collection("ringTones/").get()
      .then(function(querySnapshot) {
        let list = [];
        querySnapshot.forEach(function(doc) {
          list.push({selected: false, ...doc.data()});
        });
        //alert(JSON.stringify(list))
        that.setState({ringTones: list});
      })
      .catch(function(error) {
          alert('Ha ocurrido un error, intentelo mas tarde')
      });
  }

  render() {
    const { width } = Dimensions.get('window');
    return (
        <Container>
          <StatusBar barStyle="light-content"/>
          <Header style={COLOR_PALLETE.headerTabs} hasTabs />
          <Tabs tabBarUnderlineStyle={COLOR_PALLETE.tabBarUnderlineStyle}>
            <Tab  heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Ionicons style={styles.icon} name="md-photos" /><Text style={styles.text}>Galería</Text></TabHeading>}>
              <Content style={{height: 1}}>
                <ScrollView contentContainerStyle={styles.rootImagenes}>
                  {this.renderImageGalery()}
                </ScrollView>
              </Content>
            </Tab>
            <Tab heading={ <TabHeading style={COLOR_PALLETE.headerTabs}><Ionicons style={styles.icon} name="md-mic" /><Text style={styles.text}>Podcasts</Text></TabHeading>}>
              <Content style={{height: 1}}>
                <ScrollView contentContainerStyle={styles.rootVideo}>
                  <Text style={styles.labelVideo}>Lista de Podcasts publicados</Text>
                  {this.renderRingTones()}
                </ScrollView>
              </Content>
            </Tab>
          </Tabs>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showImageModal}>
            <ImageViewer
              imageUrls={this.state.imagesGalery}
              enableSwipeDown={true}
              index={this.state.indexImagesGalery}
              onSwipeDown={()=>{this.setState({showImageModal: false})}}
            />
          </Modal>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.showVideoModal}
            onRequestClose={() => {
              alert('Modal has been closed.');
            }}>
            <View style={{flex: 1, backgroundColor: '#000'}}>
                <View style={styles.videoContainer}>
                  
                  <VideoPlayer
                    videoProps={{
                      shouldPlay: true,
                      resizeMode: Video.RESIZE_MODE_CONTAIN,
                      source: {uri: this.state.urlVideoSelected}
                    }}
                    isPortrait={true}
                    playFromPositionMillis={0}
                  />

                </View>
                <View style={styles.closeContent}>
                  <TouchableOpacity onPress={() => {this.setState({showVideoModal: false})}}>
                    <Ionicons style={styles.closeIcon} name="md-close"/>
                  </TouchableOpacity>
                </View>
            </View>
          </Modal>
        </Container>
    );
  }
}

const styles = StyleSheet.create({
  closeContent: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingTop: 0,
    position: 'absolute',
  },
  closeIcon: {
    color: '#FFF',
    fontSize: 30,
    position: 'absolute',
    marginTop: -10
  },
  videoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelVideo: {
    fontSize: 15,
    marginBottom: 5
  },
  closeIcon: {
    color: '#FFF',
    fontSize: 30,
    marginLeft: 20,
    marginTop: 30
  },
  text: {
    color: '#FFF'
  },
  icon: {
    fontSize: 20,
    marginRight: 5,
    color: '#FFF'
  },
  root: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3,
    justifyContent: 'space-around',
    paddingTop: 20
  },
  rootImagenes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 3,
    justifyContent: 'space-around',
  },
  rootVideo: {
    paddingLeft: 15,
    paddingTop: 25
  }
});

export default connect(mapStateToProps)(MultimediaView);

