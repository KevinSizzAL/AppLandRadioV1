import React, { Component } from 'react';
import {
  View,
  Text,
  StatusBar,
} from 'react-native';
import Header from './Header';
import AlbumArt from './AlbumArt';
import TrackDetails from './TrackDetails';
import SeekBar from './SeekBar';
import Controls from './Controls';
import { Video } from 'expo-av';
// import VideoPlayer from '@expo/videoplayer';

export default class CustomPlayer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      paused: false,
      totalLength: 1,
      currentPosition: 0,
      selectedTrack: 0,
      repeatOn: true,
      shuffleOn: true,
    };
  }

  componentWillMount = () => {
    // console.warn(this.props.navigation.state.params);
    // this.setState({paused: true, selectedTrack: this.props.navigation.state.params.index})
    this.setState({paused: true, selectedTrack: this.props.index})
  }

  setDuration(data) {
    // console.log(totalLength);
    this.setState({totalLength: Math.floor(data.duration)});
  }

  setTime(data) {
    //console.log(data);
    this.setState({currentPosition: Math.floor(data.currentTime)});
  }

  seek(time) {
    time = Math.round(time);
    //this.refs.audioElement && this.refs.audioElement.seek(time);
    this.setState({
      currentPosition: time,
      paused: false,
    });
  }

  onBack() {
    if (this.state.currentPosition < 10 && this.state.selectedTrack > 0) {
      //this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true });
      setTimeout(() => this.setState({
        currentPosition: 0,
        paused: false,
        totalLength: 1,
        isChanging: false,
        selectedTrack: this.state.selectedTrack - 1,
      }), 0);
    } else {
      this.refs.audioElement.seek(0);
      this.setState({
        currentPosition: 0,
      });
    }
  }

  onForward() {
    // this.props.navigation.state.params.ringTones.length - 1
    if (this.state.selectedTrack < this.props.ringTones.length - 1) {
      //this.refs.audioElement && this.refs.audioElement.seek(0);
      this.setState({ isChanging: true});
      setTimeout(() => this.setState({
        currentPosition: 0,
        totalLength: 1,
        paused: true,
        isChanging: false,
        selectedTrack: this.state.selectedTrack + 1
      }), 0);
    }
  }

  render() {
    // const track = this.props.navigation.state.params.ringTones[this.state.selectedTrack];
    const track = this.props.ringTones[this.state.selectedTrack];
    const video = this.state.isChanging ? null : (
      <Video source={{uri: track.audioUrl}} // Can be a URL or a local file.
        ref="audioElement"
        shouldPlay={this.state.paused}               // Pauses playback entirely.
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
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <Header message="Playing From Charts" />
        <AlbumArt url={track.albumArtUrl} />
        <TrackDetails title={track.title} artist={track.artist} />
        <Controls
          onPressRepeat={() => this.setState({repeatOn : !this.state.repeatOn})}
          repeatOn={this.state.repeatOn}
          shuffleOn={this.state.shuffleOn}
          forwardDisabled={this.state.selectedTrack === this.props.ringTones.length - 1 /* this.props.navigation.state.params.ringTones.length - 1 */}
          onPressShuffle={() => this.setState({shuffleOn: !this.state.shuffleOn})}
          onPressPlay={() => this.setState({paused: false})}
          onPressPause={() => this.setState({paused: true})}
          onBack={this.onBack.bind(this)}
          onForward={this.onForward.bind(this)}
          paused={this.state.paused}/>
        {video}
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: 'rgb(4,4,4)',
  },
  audioElement: {
    height: 0,
    width: 0,
  }
};
